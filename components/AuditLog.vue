<template>
  <section class="audit-log">
    <v-list>
      <v-list-item
        v-for="audit in audits"
        :key="audit.uuid"
      >
        <nuxt-link :to="'/audits/' + audit.uuid">{{ audit.domain }} ({{audit.timestamp}}) </nuxt-link>
      </v-list-item>
    </v-list>
  </section>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'AuditLog',
  computed: {
    ...mapState({
      audits: state => state.audits.audits
    }),
  }
};
</script>

<style scoped>

</style>
