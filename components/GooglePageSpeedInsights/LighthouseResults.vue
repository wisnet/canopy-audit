<template>
  <section class="google-psi-lighthouse">
    <h3>Screenshots</h3>

    <div class="loading-screenshots">
      <div
        v-for="(image, key) in data.audits['screenshot-thumbnails'].details.items"
        :key="key"
      >
        <img :src="image.data" />
      </div>
    </div>

    <v-simple-table>
      <tbody>
      <tr
        v-for="audit in data.audits"
        :key="audit.title"
      >
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

<style scoped lang="scss">
.loading-screenshots {
  display: flex;
  overflow: auto;

  > div {
    padding: 10px 2px;
  }
}

</style>
