<template>
  <v-data-table :items="attendances" :headers="getHeaders()" />
</template>

<script>

export default {
  props: ['attendances'],

  mounted () {
    this.fetchContacts()
  },

  methods: {
    getHeaders () {
      return [
        {
          text: 'شروع',
          value: 'start_at'
        },
        {
          text: 'پایان',
          value: 'end_at'
        },
        {
          text: 'مدت',
          value: 'duration'
        },
        {
          text: 'تایید شده',
          value: 'approved'
        }
      ]
    }
  }
}
</script>
<style scoped>
.table-hover tbody tr {
  cursor: pointer;
}
</style>
