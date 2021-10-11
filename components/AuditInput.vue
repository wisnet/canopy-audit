<template>
  <section>
    <form @submit.prevent="doAudit">

      <v-row>

        <v-text-field
          v-model="domain"
          @change="doAudit"
          outlined
        />

        <v-btn
          x-large
          dark
          type="submit"
        >Run
        </v-btn>
      </v-row>
    </form>

    <template v-if="working">
      <v-skeleton-loader type="card@3"></v-skeleton-loader>
    </template>
    <template v-else>
      <loading-experience v-if="googlePageSpeed.loadingExperience" :data="googlePageSpeed.loadingExperience" />
      <lighthouse-results v-if="googlePageSpeed.lighthouseResult" :data="googlePageSpeed.lighthouseResult" />
      <div
        v-if="mxToolbox"
      >
        <template v-for="(item) in mxToolbox">
          <component :is="mxComponentName(item)" :data="item"></component>
        </template>
      </div>
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
      working: false
    };
  },
  created() {
    console.log(process.env.GOOGLE_PAGESPEED_INSIGHTS_API_KEY);
  },
  methods: {
    mxComponentName(item) {
      return 'MxToolbox' + item.Command.toUpperCase() + 'Lookup';
    },
    async doAudit() {
      this.working = true;
      this.googlePageSpeed = [];
      this.mxToolbox = [];
      await this.googlePageSpeedAudit(this.domain);
      await this.mxToolboxAudit(this.domain, 'dns');

      this.working = false;
    },
    async googlePageSpeedAudit(domain) {
      const url = this.setUpPageSpeedQuery(domain);
      try {
        const response = await fetch(url);
        const json = await response.json();

        this.googlePageSpeed = json;
      } catch (e) {
        console.error({e});
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
      console.log({relatedLookups});
      const relatedPromises = relatedLookups.map(async (e) => await this.mxToolboxRequest(e.URL));
      const related = await Promise.all(relatedPromises);

      console.log({related});

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
