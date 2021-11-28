<template>
  <section class="audit-expansion-panel">
    <template v-if="customAuditItemExists(auditKey)">
      <component :is="customAuditItemExists(auditKey)" :item="item" :audit-key="auditKey" />
    </template>
    <template v-else>
      <v-expansion-panel-header>
        <v-row cols="12">
          <v-col cols="9">{{ item.title }} <br />(<small>{{ auditKey }}</small>)</v-col>
          <v-col cols="3">{{ item.displayValue }}</v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <span v-html="$micromark(item.description)"></span>
      </v-expansion-panel-content>
    </template>
  </section>
</template>

<script>
import customAuditItems from '~/mixins/custom-audit-items';

export default {
  name: 'AuditItemExpansionPanel',
  mixins: [customAuditItems],
  props: {
    item: {
      type: Object,
      required: false
    },
    auditKey: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    customAuditItemExists(auditKey) {
      return this.customExpansions[auditKey] || false;
    }
  }
};
</script>

<style scoped>

</style>
