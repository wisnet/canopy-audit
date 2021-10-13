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

    <template>
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
        <v-tab-item key="lighthouse">
          <loading-experience v-if="googlePageSpeed.loadingExperience" :data="googlePageSpeed.loadingExperience" />
        </v-tab-item>
        <v-tab-item key="loading">
          <lighthouse-results v-if="googlePageSpeed.lighthouseResult" :data="googlePageSpeed.lighthouseResult" />
        </v-tab-item>
        <v-tab-item key="mxtoolbox">
          <div
            v-if="mxToolbox"
          >
            <template v-for="(item) in mxToolbox">
              <component :is="mxComponentName(item)" :data="item" />
            </template>
          </div>
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
      working: false,
      tab: '',
      tabs: {
        lighthouse: 'Lighthouse',
        loading: 'Loading Experience',
        mxtoolbox: 'MX Toolbox'
      }
    };
  },
  created() {
    console.log(process.env.GOOGLE_PAGESPEED_INSIGHTS_API_KEY);
  },
  methods: {
    mxComponentName(item) {
      return 'MxToolbox' + item.Command.toUpperCase() + 'Lookup';
    },
    doAudit() {
      this.working = true;
      this.googlePageSpeed = [];
      this.mxToolbox = [];
      const audits = [
        this.googlePageSpeedAudit(this.domain),
        this.mxToolboxAudit(this.domain, 'dns')
      ];

      Promise.all(audits).then(_ => this.working = false);
    },
    async googlePageSpeedAudit(domain) {
      const url = this.setUpPageSpeedQuery(domain);
      try {
        const response = await fetch(url);
        const json = await response.json();

        this.googlePageSpeed = json;
      } catch (e) {
        console.error({ e });
      }
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
      console.log({ relatedLookups });
      const relatedPromises = relatedLookups.map(async e => await this.mxToolboxRequest(e.URL));
      const related = await Promise.all(relatedPromises);

      console.log({ related });

      related.forEach(r => (this.mxToolbox.push(r)));

      this.mxToolbox.push(data);
      console.log(this.mxToolbox);
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
