<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          Enter your domain name in the box below to get started:
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="8">
      <AuditInput />
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';
import AuditInput from '~/components/AuditInput.vue';

export default {
  components: {
    Logo,
    VuetifyLogo,
    AuditInput
  },
  head() {
    return {
      title: 'Home'
    };
  }
};
</script>
