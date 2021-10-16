<template>
  <section class="google-psi-loading-experience">
    <h1>Loading Experience</h1>
    <v-simple-table>
      <tbody>
      <tr>
        <td>Cumulative Layout Shift</td>
        <td>
          {{ metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100 }} ({{ metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category }})
        </td>
      </tr>
      <tr>
        <td>First Contentful Paint</td>
        <td>
          {{ metrics.FIRST_CONTENTFUL_PAINT_MS.percentile / 1000 }}s ({{ metrics.FIRST_CONTENTFUL_PAINT_MS.category }})
        </td>
      </tr>
      <tr>
        <td>Largest Contentful Paint</td>
        <td>
          {{ metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000 }}s ({{ metrics.LARGEST_CONTENTFUL_PAINT_MS.category }})
        </td>
      </tr>
      </tbody>
    </v-simple-table>
  </section>
</template>

<script>
export default {
  name: 'LoadingExperience',
  data() {
    return {
      metrics: {
        CUMULATIVE_LAYOUT_SHIFT_SCORE: {
          percentile: 0,
          category: ''
        },
        FIRST_CONTENTFUL_PAINT_MS: {
          percentile: 0,
          category: ''
        },
        LARGEST_CONTENTFUL_PAINT_MS: {
          percentile: 0,
          category: ''
        }
      }
    };
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  created() {
    this.metrics = {...this.metrics, ...this.data.metrics};
  }
};
</script>

<style scoped>

</style>
