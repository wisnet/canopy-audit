<template>
  <section class="audit-reports">
    <v-tabs
      v-model="activeTab"
      align-with-title
    >
      <v-tabs-slider color="yellow" />
      <v-tab
        key="summary"
        :to="`/audits/${$route.params.id}/`"
        nuxt
      >
        Summary
      </v-tab>
      <v-tab
        v-for="(label, key) in tabs"
        :key="key"
        :to="`/audits/${$route.params.id}/${key}`"
        nuxt
      >
        {{ label }}
      </v-tab>
    </v-tabs>
  </section>
</template>

<script>

export default {
  name: 'AuditReports',
  props: {
    tab: {
      type: String,
      required: false,
      default: 'loading-experience'
    }
  },
  data() {
    return {
      activeTab: '',
      tabs: {
        'high-priority': 'High Priority',
        'loading-experience': 'Loading Experience',
        lighthouse: 'Lighthouse',
        mxtoolbox: 'MX Toolbox'
      },
      googlePageSpeed: {},
      mxToolbox: []
    };
  },
  mounted() {
    this.activeTab = this.tab;
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
