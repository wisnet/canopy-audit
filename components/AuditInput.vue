<template>
  <section>
    <form @submit.prevent="doAudit">
      <v-row>
        <v-text-field
          v-model="domain"
          outlined
          @change="doAudit"
        />

        <v-btn
          x-large
          dark
          type="submit"
          :disabled="working"
        >
          Run
        </v-btn>
      </v-row>
    </form>

    <template v-if="didRun">
      <v-tabs
        v-model="tab"
        align-with-title
      >
        <v-tabs-slider color="yellow" />

        <v-tab
          v-for="(label, key) in tabs"
          :key="key"
        >
          {{ label }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item key="loading">
          <v-card>
            <v-card-text>
              <template v-if="auditWorkingPageSpeed">
                <v-skeleton-loader type="text@5"></v-skeleton-loader>
              </template>
              <loading-experience v-if="googlePageSpeed.loadingExperience" :data="googlePageSpeed.loadingExperience" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="lighthouse">
          <v-card>
            <v-card-text>
              <template v-if="auditWorkingPageSpeed">
                <v-skeleton-loader type="text@5"></v-skeleton-loader>
              </template>
              <lighthouse-results v-if="googlePageSpeed.lighthouseResult" :data="googlePageSpeed.lighthouseResult" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="mxtoolbox">
          <v-card>
            <v-card-text>
              <template v-if="auditWokringMxToolbox">
                <v-skeleton-loader type="text@5"></v-skeleton-loader>
              </template>
              <div
                v-if="mxToolbox"
              >
                <template v-for="(item) in mxToolbox">
                  <component :is="mxComponentName(item)" :data="item" />
                </template>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </template>
  </section>
</template>

<script>
import MxToolboxALookup from './MxToolbox/MxToolboxALookup';
import MxToolboxDNSLookup from './MxToolbox/MxToolboxDNSLookup';
import LoadingExperience from './GooglePageSpeedInsights/LoadingExperience';
import LighthouseResults from './GooglePageSpeedInsights/LighthouseResults';

export default {
  name: 'AuditInput',
  components: {
    LighthouseResults,
    LoadingExperience,
    MxToolboxALookup,
    MxToolboxDNSLookup
  },
  data() {
    return {
      domain: 'https://www.wisnet.com/',
      googlePageSpeed: {},
      mxToolbox: [],
      didRun: false,
      working: false,
      tab: '',
      tabs: {
        loading: 'Loading Experience',
        lighthouse: 'Lighthouse',
        mxtoolbox: 'MX Toolbox'
      },
      auditWorkingPageSpeed: false,
      auditWokringMxToolbox: false
    };
  },
  methods: {
    mxComponentName(item) {
      return 'MxToolbox' + item.Command.toUpperCase() + 'Lookup';
    },
    doAudit() {
      this.didRun = true;
      this.working = true;
      this.googlePageSpeed = [];
      this.mxToolbox = [];
      const url = this.makeUrl(this.domain);
      const audits = [
        this.googlePageSpeedAudit(url),
        this.mxToolboxAudit(url, 'dns')
      ];

      Promise.all(audits).then(_ => this.working = false);
    },
    makeUrl(domain) {
      let url;
      try {
        url = new URL(domain);
      } catch (e) {
        url = new URL('https://' + domain);
      }
      return url;
    },
    async googlePageSpeedAudit(domain) {
      this.auditWorkingPageSpeed = true;
      const url = this.setUpPageSpeedQuery(domain);
      try {
        const response = await fetch(url);
        const json = await response.json();

        this.googlePageSpeed = json;
      } catch (e) {
        console.error({e});
      }
      this.auditWorkingPageSpeed = false;
    },
    setUpPageSpeedQuery(domain) {
      const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed/';
      const parameters = {
        url: encodeURIComponent(domain),
        key: this.$config.googlePageSpeedInsightsApiKey
      };
      let query = `${api}?`;
      let key;
      for (key in parameters) {
        query += `${key}=${parameters[key]}&`;
      }
      return query;
    },
    async mxToolboxAudit(domain, type = 'dns', doRelated = true) {
      this.auditWokringMxToolbox = true;
      const url = new URL(domain);
      const apiUrl = 'https://api.mxtoolbox.com/api/v1/Lookup/' + type + '/?port=80&argument=' + url.hostname + '&Authorization=96b3c08b-6ce2-4e9f-a703-0d2ef86d5a91';
      const data = await this.mxToolboxRequest(apiUrl);
      const allowedMxLookups = [
        'dns lookup'
        // 'http test', - PAID PLAN
        // 'dns propagation', - PAID PLAN
        // 'smtp diag', - PAID PLAN
        // 'blacklist', - PAID PLAN
      ];
      const relatedLookups = data.RelatedLookups.filter(e => allowedMxLookups.includes(e.Name));
      const relatedPromises = relatedLookups.map(async e => await this.mxToolboxRequest(e.URL));
      const related = await Promise.all(relatedPromises);

      related.forEach(r => (this.mxToolbox.push(r)));

      this.mxToolbox.push(data);
      this.auditWokringMxToolbox = false;
    },
    async mxToolboxRequest(url) {
      const apiKey = '96b3c08b-6ce2-4e9f-a703-0d2ef86d5a91';
      const init = {
        headers: new Headers({
          Authorization: apiKey
        })
      };
      const response = await fetch(url, init);
      return await response.json();
    }
  }
};
</script>

<style scoped>

</style>
