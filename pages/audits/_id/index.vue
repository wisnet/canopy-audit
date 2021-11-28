<template>
  <section class="domain-audit">
    <h1>{{ audit.domain }}</h1>
    <client-only>
      <template v-if="audit">
        <img
          :src="finalScreenshot"
        />

        <AuditReports
          :audit="audit.audits"
        />

        <AuditSummaryTable :audit="audit.audits" />
        <ImageOptimizationOpportunities :opportunities="imageOpportunities" />
      </template>
    </client-only>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import AuditReports from '~/components/AuditReports';
import AuditSummaryTable from '~/components/AuditSummaryTable';
import ImageOptimizationOpportunities from "@/components/ImageOptimizationOpportunities";

export default {
  components: {
    AuditReports,
    AuditSummaryTable,
    ImageOptimizationOpportunities
  },
  head() {
    return {
      title: 'Audit'
    };
  },
  computed: {
    ...mapState({
      audits: state => state.audits.audits
    }),
    audit() {
      return this.audits.find(e => e.uuid === this.$route.params.id) || false;
    },
    finalScreenshot() {
      if (this.audit) {
        return this.audit
          .audits
          .pageSpeed
          .lighthouseResult
          .audits['final-screenshot']
          .details.data;
      }
    },
    imageOpportunities() {
        return this.audit
          .audits
          .pageSpeed
          .lighthouseResult
          .audits['uses-optimized-images'];
    }
  },
  created() {
    console.log(this.$route.params);
  }
};
</script>

<style scoped lang="scss">

.audit-summary {
  &::v-deep {
    .v-card--reveal {
      bottom: 0;
      opacity: 1 !important;
      position: absolute;
      width: 100%;
    }
  }
}
</style>
