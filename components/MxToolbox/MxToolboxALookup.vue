<template>
  <section class="mxtoolbox-a-lookup">
    <h1>MxToolbox A Lookup</h1>
    <mx-toolbox-information
      v-for="(info, key) in data.Information"
      :key="key"
      :data="info"
    />
  </section>

</template>

<script>
import MxToolboxInformation from './MxToolboxInformation';

export default {
  name: 'MxToolboxALookup',
  components: {
    MxToolboxInformation
  },
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
