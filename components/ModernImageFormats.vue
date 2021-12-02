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
          <image-optimization-opportunities-image-list :images="opportunities.details.items" title="High Priority" />
        </v-card-text>
      </template>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'ModernImageFormats',
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
    };
  },
}
</script>

<style scoped>

</style>
