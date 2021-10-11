<template>
  <section class="mxtoolbox-a-lookup">
    <h1>MxToolbox A Lookup</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Key
          </th>
          <th class="text-left">
            Value
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Type</td>
          <td>{{ type }}</td>
        </tr>
        <tr>
          <td>Provider</td>
          <td>{{ serviceProvider }}</td>
        </tr>
        <tr>
          <td>Reporting Nameserver</td>
          <td>{{ reportingNameserver }}</td>
        </tr>
        <tr>
          <td>Domain Name</td>
          <td>{{ domainName }}</td>
        </tr>
        <tr v-if="type == 'a'">
          <td>IP Address</td>
          <td>{{ ipAddress }}</td>
        </tr>
        <tr else>
          <td>Canonical</td>
          <td>{{ canonicalName }}</td>
        </tr>
        <tr>
          <td>IP V6?</td>
          <td>{{ isIpV6 }}</td>
        </tr>
        <tr>
          <td>TTL</td>
          <td>{{ ttl }}</td>
        </tr>
        <tr>
          <td>ASN Name</td>
          <td>{{ asn.name }}</td>
        </tr>
        <tr>
          <td>ASN</td>
          <td>{{ asn.asn }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>

</template>

<script>
export default {
  name: 'MxToolboxInformation',
  data() {
    return {
      ipAddress: '',
      canonicalName: '',
      asn: {},
      domainName: '',
      isIpV6: false,
      ttl: '',
      type: '',
      serviceProvider: '',
      reportingNameserver: '',
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
      const info = this.data.Information[0];
      this.ipAddress = info['IP Address'];
      this.isIpV6 = info['IsIPV6'] ? 'Yes' : 'No';
      this.domainName = info['Domain Name'];
      this.ttl = info['TTL'];
      this.type = info['Type'];
      this.canonicalName = info['Canonical Name'];
      this.serviceProvider = this.data.DnsServiceProvider;
      this.reportingNameserver = this.data.ReportingNameServer;

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
