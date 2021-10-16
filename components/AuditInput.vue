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

    <template v-if="working">
      <v-card>
        <v-card-title>We are gathering some details</v-card-title>
        <v-card-text>
          <v-progress-linear
            indeterminate
            striped
            color="orange darken-2"
          ></v-progress-linear>
        </v-card-text>
        <v-card-text>Patience please</v-card-text>
      </v-card>
    </template>

  </section>
</template>

<script>

export default {
  name: 'AuditInput',
  data() {
    return {
      domain: 'https://www.wisnet.com/',
      working: false,
      auditWorkingPageSpeed: false,
      auditWokringMxToolbox: false
    };
  },
  methods: {
    doAudit() {
      this.working = true;
      this.googlePageSpeed = [];
      this.mxToolbox = [];
      const url = this.makeUrl(this.domain);
      const audits = [
        this.googlePageSpeedAudit(url),
        this.mxToolboxAudit(url, 'dns')
      ];

      Promise.all(audits).then(_ => {
        this.$store.dispatch('audits/addAudit', {
          domain: this.domain,
          audits: {
            pageSpeed: this.googlePageSpeed,
            mxToolbox: this.mxToolbox
          }
        }).then((id) => {
          this.$router.push({
            path: '/audits/' + id
          });
        });

        this.working = false;
      });
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
