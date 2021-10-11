<template>
  <section class="google-psi-loading-experience">
    <h1>Loading Experience</h1>
    <v-simple-table>
      <tbody>
      <tr>
        <td>Cumulative Layout Shift</td>
        <td>
          {{data.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100}} ({{ data.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category }})
        </td>
      </tr>
      <tr>
        <td>First Contentful Paint</td>
        <td>
          {{data.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile / 1000}}s ({{ data.metrics.FIRST_CONTENTFUL_PAINT_MS.category }})
        </td>
      </tr>
      <tr>
        <td>Largest Contentful Paint</td>
        <td>
          {{data.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000}}s ({{ data.metrics.LARGEST_CONTENTFUL_PAINT_MS.category }})
        </td>
      </tr>
      </tbody>
    </v-simple-table>
  </section>
</template>

<script>
export default {
  name: 'LoadingExperience',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
