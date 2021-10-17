<template>
  <section class="google-psi-lighthouse">
    <h3>Screenshots</h3>

    <div class="loading-screenshots">
      <div
        v-for="(image, key) in data.audits['screenshot-thumbnails'].details.items"
        :key="key"
      >
        <img :src="image.data">
      </div>
    </div>

    <v-card-title>Stack</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="item in data.stackPacks"
          :key="item.id"
        >
          <v-avatar size="56">
            <img :src="svgToWhite(item.iconDataURL)">
          </v-avatar>
          <p class="ml-3">
            {{ item.title }}
          </p>
        </v-list-item>
      </v-list>
    </v-card-text>

    <AuditItems :items="data.audits"/>
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
  },
  methods: {
    svgToWhite(icon) {
      return icon.replace('%232f3439', '%23ffffff');
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
