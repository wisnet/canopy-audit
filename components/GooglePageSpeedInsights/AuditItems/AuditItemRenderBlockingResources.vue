<template>
  <section class="audit-item-custom">
    <v-expansion-panel-header>
      <v-row cols="12">
        <v-col cols="9">{{ item.title }} <br />(<small>{{ auditKey }}</small>)</v-col>
        <v-col cols="3">{{ item.displayValue }}</v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-card-text>{{ item.description }}</v-card-text>
      <v-card-text>Score: {{ item.score }}</v-card-text>
      <v-data-table
        :headers="headers"
        :items="item.details.items"
        calculate-widths
        dense
        hide-default-footer
      />
    </v-expansion-panel-content>
  </section>
</template>

<script>
import auditItem from '~/mixins/audit-item';

export default {
  name: 'AuditItemRenderBlockingResources',
  mixins: [
    auditItem
  ],
  data() {
    return {
      headers: [{
        text: 'URL',
        align: 'start',
        sortable: false,
        value: 'url',
        width: '75%'
      }, {
        text: 'Transfer Size (bytes)',
        align: 'start',
        sortable: true,
        value: 'totalBytes'
      }, {
        text: 'Potential Savings (ms)',
        sortable: true,
        value: 'wastedMs'
      }]
    };
  }
};
</script>

<style scoped lang="scss">
.audit-item-custom ::v-deep {
  .v-data-table__wrapper {
    tbody td {
      word-break: break-all;
    }
  }
}

</style>
