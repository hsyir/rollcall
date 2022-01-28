<template>
  <div>
    <card v-if="step==='list'" :title="$t('test caller id')">
      <input type="text" v-model="exten" placeholder="exten">
      <input type="text" v-model="number" placeholder="number">
      <button class="btn btn-primary" :class='{"btn-loading":busy}' @click="send">Send Test Call</button>
    </card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  scrollToTop: false,

  metaInfo () {
    return { title: this.$t('settings') }
  },

  data: () => ({
    step: 'list',
    busy: false,
    exten: '',
    number: ''
  }),

  computed: mapGetters({
    users: 'simotel/usersProfile',
    profiles: 'simotel/profiles'
  }),

  async created () {
    if (this.users.length === 0) {
      await this.$store.dispatch('simotel/fetchUsersProfile')
      await this.$store.dispatch('simotel/fetchProfiles')
    }
  },

  methods: {
    async send () {
      this.busy = true
      await axios.get('/api/sea/NewState', {
        params: {
          exten: this.exten,
          number: this.number
        }
      })
      this.busy = false
    }
  }
}
</script>
