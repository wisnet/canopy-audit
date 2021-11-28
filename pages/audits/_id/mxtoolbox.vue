<template>
  <section class="domain-audit mxtoolbox">
    <h1>{{ audit.domain }}</h1>

    <client-only>
      <template v-if="audit">
        <AuditReports tab="lighthouse" />
        <v-card>
          <v-card-text>
            <template
              v-if="mxToolbox"
            >
              <template v-for="(item) in mxToolbox">
                <component :is="mxComponentName(item)" :data="item" />
              </template>
            </template>
          </v-card-text>
        </v-card>
      </template>
    </client-only>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import AuditReports from '~/components/AuditReports';
import MxToolboxDNSLookup from '~/components/MxToolbox/MxToolboxDNSLookup';
import MxToolboxALookup from '~/components/MxToolbox/MxToolboxALookup';

export default {
  components: {
    AuditReports,
    MxToolboxALookup,
    MxToolboxDNSLookup
  },
  head() {
    return {
      title: 'Audit - Lighthouse'
    };
  },
  data() {
    return {
      mxToolbox: []
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
  mounted() {
    this.mxToolbox = this.audit.audits.mxToolbox;
  },
  methods: {
    mxComponentName(item) {
      return 'MxToolbox' + item.Command.toUpperCase() + 'Lookup';
    }
  }
};
</script>

<style scoped>

</style>
