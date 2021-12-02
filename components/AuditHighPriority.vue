<template>
  <section class="audit-high-priority">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Efficiently Encode Images <small class="pl-2">- {{ imageOpportunities.displayValue }}</small>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <ImageOptimizationOpportunities :opportunities="imageOpportunities" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="offscreenImages.details.items.length">
        <v-expansion-panel-header>
          Format Images <small class="pl-2">- {{ offscreenImages.displayValue }}</small>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <OffscreenImages :opportunities="offscreenImages" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="modernImageFormats.details.items.length">
        <v-expansion-panel-header>
          Modern Image Formats <small class="pl-2">- {{ modernImageFormats.displayValue }}</small>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <OffscreenImages :opportunities="modernImageFormats" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </section>
</template>

<script>
import ImageOptimizationOpportunities from '@/components/ImageOptimizationOpportunities';

export default {
  name: 'AuditHighPriority',
  components: {
    ImageOptimizationOpportunities
  },
  props: {
    highPriorityItems: {
      type: Object,
      required: true,
    }
  },
  computed: {
    imageOpportunities() {
      return this.highPriorityItems['uses-optimized-images'];
    },
    offscreenImages() {
      return this.highPriorityItems['offscreen-images'];
    },
    modernImageFormats() {
      return this.highPriorityItems['modern-image-formats'];
    }
  }
}
</script>

<style scoped>

</style>
