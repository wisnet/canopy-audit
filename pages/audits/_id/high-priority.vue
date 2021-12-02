<template>
  <section class="domain-audit high-priority">
    <h1>{{ audit.domain }}</h1>

    <client-only>
      <template v-if="audit">
        <AuditReports tab="high-priority" />
        <AuditHighPriority :high-priority-items="highPriority" />
      </template>
    </client-only>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import AuditReports from '~/components/AuditReports';
import AuditHighPriority from '~/components/AuditHighPriority';

export default {
  components: {
    AuditReports,
    AuditHighPriority
  },
  head() {
    return {
      title: 'Audit - High Priority'
    };
  },
  computed: {
    ...mapState({
      audits: state => state.audits.audits
    }),
    audit() {
      return this.audits.find(e => e.uuid === this.$route.params.id) || false;
    },
    highPriority() {
      return this.audit.audits.pageSpeed.lighthouseResult.audits;
    }
  },
};
</script>

<style scoped>

</style>
