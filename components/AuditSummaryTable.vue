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
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>{{ resourceSummary.title }}</v-card-title>
          <v-card-subtitle>{{ resourceSummary.displayValue }}</v-card-subtitle>
          <v-card-text>
            <p>{{ resourceSummary.description }}</p>
          </v-card-text>

          <v-data-table
            :headers="resourceSummaryHeaders"
            :items="resourceSummaryItems"
            :items-per-page="15"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </section>

</template>

<script>
import { cloneDeep as _cloneDeep } from 'lodash';
import AuditSummaryCard from '@/components/AuditSummaryCard';

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
      revealCLS: false,
      resourceSummaryHeaders: [
        {
          text: 'Label',
          align: 'start',
          sortable: false,
          value: 'label',
        },
        {
          text: 'Count',
          value: 'requestCount'
        },
        {
          text: 'Size (KB)',
          value: 'transferSize'
        },
      ],
    };
  },
  computed: {
    resourceSummary() {
      return this.audit
        .pageSpeed
        .lighthouseResult
        .audits['resource-summary'];
    },
    resourceSummaryItems() {
      const items = _cloneDeep(this.resourceSummary.details.items);
      const fixedItems = [];
      let item;

      for (item in items) {
        items[item].transferSize = (items[item].transferSize / 1000).toFixed(0);
        fixedItems.push(items[item]);
      }

      return fixedItems;
    }
  }
};
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
