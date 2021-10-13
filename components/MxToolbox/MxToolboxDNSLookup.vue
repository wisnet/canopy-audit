<template>
  <section class="mxtoolbox-dns-lookup">
    <h1>MxToolbox DNS Lookup</h1>
    <div v-if="data.Errors">
      <v-alert
        v-for="(error, key) in data.Errors"
        :key="key"
        type="error"
      >{{error.Messages}}</v-alert>
    </div>
    <mx-toolbox-information
      v-for="(info, key) in data.Information"
      :key="key"
      :data="info"
    />
  </section>
</template>

<script>
export default {
  name: 'MxToolboxDNSLookup',
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
