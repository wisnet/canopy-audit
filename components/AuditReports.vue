<template>
  <section class="audit-reports">
      <v-tabs
        v-model="tab"
        align-with-title
      >
        <v-tabs-slider color="yellow" />

        <v-tab
          v-for="(label, key) in tabs"
          :key="key"
        >
          {{ label }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item key="loading">
          <v-card>
            <v-card-text>
              <loading-experience v-if="googlePageSpeed.loadingExperience" :data="googlePageSpeed.loadingExperience" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="lighthouse">
          <v-card>
            <v-card-text>
              <lighthouse-results v-if="googlePageSpeed.lighthouseResult" :data="googlePageSpeed.lighthouseResult" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="mxtoolbox">
          <v-card>
            <v-card-text>
              <div
                v-if="mxToolbox"
              >
                <template v-for="(item) in mxToolbox">
                  <component :is="mxComponentName(item)" :data="item" />
                </template>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
  </section>
</template>

<script>
import MxToolboxALookup from '~/components/MxToolbox/MxToolboxALookup';
import MxToolboxDNSLookup from '~/components/MxToolbox/MxToolboxDNSLookup';
import LoadingExperience from '~/components/GooglePageSpeedInsights/LoadingExperience';
import LighthouseResults from '~/components/GooglePageSpeedInsights/LighthouseResults';

export default {
  name: 'AuditReports',
  components: {
    LighthouseResults,
    LoadingExperience,
    MxToolboxALookup,
    MxToolboxDNSLookup
  },
  props: {
    audit: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tab: '',
      tabs: {
        loading: 'Loading Experience',
        lighthouse: 'Lighthouse',
        mxtoolbox: 'MX Toolbox'
      },
      googlePageSpeed: {},
      mxToolbox: []
    };
  },
  created() {
    this.googlePageSpeed = this.audit.pageSpeed;
    this.mxToolbox = this.audit.mxToolbox;
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
