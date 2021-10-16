<template>
  <section class="domain-audit">
    <h1>{{ audit.domain }}</h1>

    <no-ssr>
    <template v-if="audit">
      <AuditReports
        :audit="audit.audits"
      />
    </template>
    </no-ssr>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import AuditReports from '~/components/AuditReports';

export default {
  components: {
    AuditReports
  },
  head() {
    return {
      title: 'Audit'
    };
  },
  computed: {
    ...mapState({
      audits: state => state.audits.audits
    }),
    audit() {
      return this.audits.find(e => e.uuid === this.$route.params.id) || false;
    }
  },
  created() {
    console.log(this.$route.params);
  }
};
</script>

<style scoped>

</style>
