<template>
  <section class="domain-audit lighthouse">
    <h1>{{ audit.domain }}</h1>

    <client-only>
      <template v-if="audit">
        <AuditReports tab="lighthouse" />
        <v-card>
          <v-card-text>
            <lighthouse-results
              v-if="googlePageSpeed.lighthouseResult"
              :data="googlePageSpeed.lighthouseResult"
            />
          </v-card-text>
        </v-card>
      </template>
    </client-only>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import AuditReports from '~/components/AuditReports';
import LighthouseResults from '~/components/GooglePageSpeedInsights/LighthouseResults';

export default {
  components: {
    AuditReports,
    LighthouseResults
  },
  head() {
    return {
      title: 'Audit - Lighthouse'
    };
  },
  data() {
    return {
      googlePageSpeed: {}
    };
  },
  computed: {
    ...mapState({
      audits: state => state.audits.audits
    }),
    audit() {
      return this.audits.find(e => e.uuid === this.$route.params.id) || false;
    }
  },
  mounted() {
    this.googlePageSpeed = this.audit.audits.pageSpeed;
  }
};
</script>

<style scoped>

</style>
