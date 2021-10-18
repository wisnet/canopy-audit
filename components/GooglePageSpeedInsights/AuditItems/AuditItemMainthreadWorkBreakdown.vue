<template>
  <section class="audit-item-custom">
    <v-expansion-panel-header>
      <v-row cols="12">
        <v-col cols="9">{{ item.title }} <br />(<small>{{ auditKey }}</small>)</v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-timeline
        dense
        clipped
      >
        <v-timeline-item
          v-for="detail in item.details.items"
          :key="detail.group"
          class="align-center"
        >
          <v-row>
            <v-col
              cols="7"
              md='4'
            >
              {{ detail.groupLabel }}
            </v-col>
            <v-col
              class="text-right"
              cols="5"
            >
              {{ detail.duration }}
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-expansion-panel-content>
  </section>
</template>

<script>
import auditItem from '~/mixins/audit-item';

export default {
  name: 'AuditItemMainthreadWorkBreakdown',
  mixins: [
    auditItem
  ]
};
</script>

<style scoped>

</style>
