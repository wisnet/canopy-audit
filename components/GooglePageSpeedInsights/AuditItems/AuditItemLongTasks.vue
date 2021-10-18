<template>
  <section class="audit-item-custom">
    <v-expansion-panel-header>
      <v-row cols="12">
        <v-col cols="9">{{ item.title }} <br />(<small>{{ auditKey }}</small>)</v-col>
        <v-col cols="3">{{ item.displayValue }}</v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-list>
        <v-list-item
          v-for="task in item.details.items"
          :key="task.url"
        >
          {{ task.url }} ({{ task.duration }}ms)
        </v-list-item>
      </v-list>
    </v-expansion-panel-content>
  </section>
</template>

<script>
import auditItem from '~/mixins/audit-item';

export default {
  name: 'AuditItemLongTasks',
  mixins: [
    auditItem
  ]
};
</script>

<style scoped>

</style>
