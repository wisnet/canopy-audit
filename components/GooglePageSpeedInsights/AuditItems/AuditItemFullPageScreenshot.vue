<template>
  <section class="audit-item-custom">
    <v-expansion-panel-header>
      <v-row cols="12">
        <v-col cols="9">{{ item.title }} <br />(<small>{{ auditKey }}</small>)</v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-img>
        <img :src="item.details.data"/>
      </v-img>
    </v-expansion-panel-content>
  </section>
</template>

<script>
import auditItem from '~/mixins/audit-item';

export default {
  name: 'AuditItemFinalScreenshot',
  mixins: [
    auditItem
  ]
};
</script>

<style scoped>

</style>
