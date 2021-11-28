<template>
  <section class="image-optimizations-list">
    <v-banner>{{ title }}</v-banner>

    <v-row>
      <v-col
        v-for="item in images"
        :key="item.url"
        cols="12"
        md="4"
      >
        <v-card
        >
          <v-img
            :src="item.url"
            height="300"
          />
          <v-card-title>
            {{ item.wastedBytes / 1000 }} MB wasted
          </v-card-title>

          <v-card-subtitle>
            {{ item.url }}
            <v-btn
              url="item.url"
              plain
            >
              <v-icon x-small>mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'ImageOptimizationOpportunitiesImageList',
  props: {
    images: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
