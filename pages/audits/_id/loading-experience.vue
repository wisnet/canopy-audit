<template>
  <section class="domain-audit loading-experience">
    <h1>{{ audit.domain }}</h1>

    <client-only>
      <template v-if="audit">
        <AuditReports tab="loading-experience">
        </AuditReports>
          <v-card>
            <v-card-text>
              <template
                v-if="googlePageSpeed.loadingExperience"
              >
                <loading-experience
                  :data="googlePageSpeed.loadingExperience"
                />
              </template>
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
import LoadingExperience from '@/components/GooglePageSpeedInsights/LoadingExperience';

export default {
  components: {
    AuditReports,
    LoadingExperience
  },
  head() {
    return {
      title: 'Audit - Loading Experience'
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
