<template>
  <card :title="$t('create_company')">
    <table class="table">
      <thead>
        <tr>
          <th>{{ $t('name') }}</th>
          <th>{{ $t('phone number') }}</th>
          <th>{{ $t('email') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies" :key="company.id">
          <td>{{ company.name }}</td>
          <td>{{ company.phone_number }}</td>
          <td>{{ company.email }}</td>
        </tr>
      </tbody>
    </table>
  </card>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  scrollToTop: false,

  metaInfo () {
    return { title: this.$t('companies') }
  },

  data: function () {
    return {
      companies: {}
    }
  },
  computed: mapGetters({
    // user: 'auth/user'
  }),

  mounted () {
    this.fetchContacts()
  },

  methods: {
    async fetchContacts () {
      this.companies = (await axios.get('/api/companies')).data.data
    }

  }
}
</script>
