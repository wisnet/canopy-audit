<template>
  <section class="image-optimizations">
    <v-card>
      <v-card-title>
        {{ opportunities.title }}
      </v-card-title>

      <template v-if="!opportunities.details.items.length">
        <v-card-subtitle>Nothing to do here! Excellent job optimizing your images!</v-card-subtitle>
      </template>
      <template v-else>
        <v-card-subtitle>{{ opportunities.displayValue }}</v-card-subtitle>

        <v-card-text>
          <p v-html="$micromark(opportunities.description)"></p>
          <image-optimization-opportunities-image-list :images="highPriorityImages" title="High Priority" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="reveal = !reveal"
          >
            Low Priority Images
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <v-card
            v-if="reveal"
            class="v-card--reveal"
          >
            <v-card-text>
              <image-optimization-opportunities-image-list :images="lowPriorityImages" title="Low Priority" />
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </template>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'ImageOptimizationOpportunities',
  props: {
    opportunities: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      idealBytesWasted: 50000,
      reveal: false
    }
  },
  computed: {
    highPriorityImages() {
      return this.opportunities.details.items.filter(i => i.wastedBytes > this.idealBytesWasted);
    },
    lowPriorityImages() {
      return this.opportunities.details.items.filter(i => i.wastedBytes <= this.idealBytesWasted);
    }
  }
}
</script>

<style scoped>

</style>
