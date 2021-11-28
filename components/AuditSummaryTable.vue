<template>
  <section class="audit-summary">
    <v-row>
      <v-col
        cols="6"
        sm="6"
        md="3"
      >
        <AuditSummaryCard
          title="Cumulative Shift Layout"
          :icon="audit
                .pageSpeed
                .lighthouseResult
                .audits['cumulative-layout-shift'].score < 1 ? 'mdi-thumb-down' : 'mdi-thumb-up'"
          :content="audit
              .pageSpeed
              .lighthouseResult
              .audits['cumulative-layout-shift']
              .displayValue"
          more-title="Description"
          :more-content="$micromark(audit
                  .pageSpeed
                  .lighthouseResult
                  .audits['cumulative-layout-shift']
                  .description)"
        />
      </v-col>

      <v-col
        cols="6"
        sm="6"
        md="3"
      >
        <AuditSummaryCard
          title="Interactive"
          :icon="audit
                .pageSpeed
                .lighthouseResult
                .audits['interactive'].score < 1 ? 'mdi-thumb-down' : 'mdi-thumb-up'"
          :content="audit
              .pageSpeed
              .lighthouseResult
              .audits['interactive']
              .displayValue"
          more-title="Description"
          :more-content="$micromark(audit
                  .pageSpeed
                  .lighthouseResult
                  .audits['interactive']
                  .description)"
        />
      </v-col>

      <v-col
        cols="6"
        sm="6"
        md="3"
      >
        <AuditSummaryCard
          title="Server Response Time (TTFB)"
          :icon="audit
                .pageSpeed
                .lighthouseResult
                .audits['server-response-time'].numericValue >= 600 ? 'mdi-thumb-down' : 'mdi-thumb-up'"
          :content="audit
              .pageSpeed
              .lighthouseResult
              .audits['server-response-time']
              .numericValue + 'ms'"
          more-title="Description"
          :more-content="$micromark(audit
                  .pageSpeed
                  .lighthouseResult
                  .audits['server-response-time']
                  .description)"
        />
      </v-col>

      <v-col
        cols="6"
        sm="6"
        md="3"
      >
        <AuditSummaryCard
          title="Speed Index"
          :icon="audit
                .pageSpeed
                .lighthouseResult
                .audits['speed-index'].score > 3.4 ? 'mdi-thumb-down' : 'mdi-thumb-up'"
          :content="audit
              .pageSpeed
              .lighthouseResult
              .audits['speed-index']
              .displayValue"
          more-title="Description"
          :more-content="$micromark(audit
                  .pageSpeed
                  .lighthouseResult
                  .audits['speed-index']
                  .description)"
        />
      </v-col>
    </v-row>
  </section>

</template>

<script>
import AuditSummaryCard from "@/components/AuditSummaryCard";

export default {
  name: 'AuditSummaryTable',
  components: {
    AuditSummaryCard
  },
  props: {
    audit: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      revealCLS: false
    }
  },
}
</script>

<style scoped lang="scss">

.audit-summary {
  margin: 3em 0;

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
