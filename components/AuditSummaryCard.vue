<template>
  <v-card
    class="d-flex flex-column justify-space-between"
    min-height="230"
  >
    <v-card-text>
      <div>{{ title }}
        <v-icon>{{ icon }}</v-icon>
      </div>
      <div class="text-h4 text--primary">
        {{ content }}
      </div>
    </v-card-text>
    <v-card-actions class="align-self-end">
      <v-btn
        text
        color="teal accent-4"
        @click="reveal = true"
        class="justify-self-end"
      >
        Learn More
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal d-flex flex-column justify-space-between"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h6 text--primary">
            {{ moreTitle }}
          </p>
          <p v-html="moreContent"></p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            text
            color="teal accent-4"
            @click="reveal = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'AuditSummaryCard',
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    content: {
      type: String,
    },
    moreTitle: {
      type: String,
    },
    moreContent: {
      type: String,
    },
  },
  data() {
    return {
      reveal: false
    }
  },
}
</script>

<style scoped>

</style>
