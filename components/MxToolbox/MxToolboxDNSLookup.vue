<template>
  <section class="mxtoolbox-dns-lookup">
    <h1>MxToolbox DNS Lookup</h1>
    {{ data }}
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
