<template>
  <section class="audit-log">
    <v-list>
      <v-list-item
        v-for="audit in reverseOrder"
        :key="audit.uuid"
        class="mb-3"
      >
        <v-avatar size="90">
          <v-img
            v-if="hasScreenshot(audit)"
            :src="hasScreenshot(audit)"
          />
        </v-avatar>
        <nuxt-link :to="'/audits/' + audit.uuid">
          <p class="ml-3 white--text">
            {{ audit.domain }} <span v-if="audit.timestamp">({{ audit.timestamp }})</span>
          </p>
        </nuxt-link>
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
    reverseOrder(){
      const a = [...this.audits];
      return a.reverse();
    }
  },
  methods: {
    hasScreenshot(audit) {
      return audit.audits.pageSpeed.lighthouseResult.audits['final-screenshot'].details.data || false;
    }
  }
};
</script>

<style scoped>

</style>
