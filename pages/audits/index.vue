<template>
  <v-row>
    <v-col class="text-center">
      <AuditLog />
    </v-col>
  </v-row>
</template>

<script>
import AuditLog from '~/components/AuditLog';

export default {
  components: {
    AuditLog
  },
  head() {
    return {
      title: 'Audit Log'
    };
  }
};
</script>
