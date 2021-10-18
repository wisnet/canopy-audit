<template>
  <section class="audit-item-custom">
    <v-expansion-panel-header>
      <v-row cols="12">
        <v-col cols="9">
          {{ item.title }} <br>(<small>{{ auditKey }}</small>)
        </v-col>
        <v-col cols="3">
          {{ item.displayValue }}
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-simple-table>
        <thead>
          <tr>
            <th
              v-for="(label, key) in requestKeys"
              :key="key"
            >
              {{ label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="request in item.details.items"
            :key="request.url"
          >
            <td
              v-for="(label, key) in requestKeys"
              :key="`td-${key}`"
            >
              {{ request[key] }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-expansion-panel-content>
  </section>
</template>

<script>
import auditItem from '~/mixins/audit-item';

export default {
  name: 'AuditItemNetworkRequests',
  mixins: [
    auditItem
  ],
  data() {
    return {
      requestKeys: {
        url: 'URL',
        transferSize: 'Size',
        resourceSize: 'Size',
        mimeType: 'Mime Type',
        resourceType: 'Type',
        statusCode: 'Status Code',
        protocol: 'Protocol'
      }
    };
  }
};
</script>

<style scoped>

</style>
