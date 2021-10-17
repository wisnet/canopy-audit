<template>
  <section class="audit-items">
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="(audit, key) in items"
        :key="key"
      >
        <AuditItemExpansionPanel
          :item="audit"
          :audit-key="key"
        />
      </v-expansion-panel>
    </v-expansion-panels>
  </section>
</template>

<script>
export default {
  name: 'AuditItems',
  props: {
    items: {
      type: Object
    }
  }
};
</script>

<style scoped>

</style>
