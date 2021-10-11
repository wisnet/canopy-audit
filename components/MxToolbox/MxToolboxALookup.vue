<template>
  <section class="mxtoolbox-a-lookup">
    <h1>MxToolbox A Lookup</h1>
    <template v-for="info in information">
      <mx-toolbox-information :data="info" />
    </template>
  </section>

</template>

<script>
import MxToolboxInformation from './MxToolboxInformation';

export default {
  name: 'MxToolboxALookup',
  components: {
    MxToolboxInformation
  },
  data() {
    return {
      information: []
    };
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  created() {
    this.normalizeData();
  },
  methods: {
    normalizeData() {
      const info = this.data.Information;
      this.data.information.each((info) => {
        this.information.push({
          ipAddress: info['IP Address'],
          isIpV6: info['IsIPV6'] ? 'Yes' : 'No',
          domainName: info['Domain Name'],
          ttl: info['TTL'],
          type: info['Type'],
          canonicalName: info['Canonical Name'],
          serviceProvider: this.data.DnsServiceProvider,
          reportingNameserver: this.data.ReportingNameServer
        });
      });

      try {
        const asn = JSON.parse(info.Asn);

        this.asn = {
          name: asn[0].asname,
          asn: asn[0].asn
        };
      } catch (e) {
      }
    }
  }
};
</script>

<style scoped>

</style>
