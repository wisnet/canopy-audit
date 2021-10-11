<template>
  <section class="google-psi-lighthouse">
    <h1>Lighthouse Results</h1>

    <v-simple-table>
      <tbody>
      <tr v-for="audit in data.audits">
        <td v-html="audit.title"></td>
        <td>{{ audit.displayValue }}</td>
      </tr>
      </tbody>
    </v-simple-table>
  </section>
</template>

<script>
export default {
  name: 'LighthouseResults',
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
