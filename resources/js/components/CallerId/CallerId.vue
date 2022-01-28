<template>
  <div>
    <notifications group="callerId" class="p-3" position="bottom right">
      <template slot="body" slot-scope="{ item, close }">
        <body-of-caller-id :item="item" @close="close"/>
      </template>
    </notifications>
  </div>
</template>

<script>
import BodyOfCallerId from './BodyOfCallerId'
// eslint-disable-next-line no-unused-vars
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import { mapGetters } from 'vuex'

export default {
  name: 'CallerId',
  components: { BodyOfCallerId },
  data: function () {
    return {
      // echo: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      pusherListenSetting: 'pusher/listenSetting'
    }),
    echoChannel: function () {
      if (this.user === null) {
        return ''
      }
      const userId = ('id' in this.user) ? this.user.id : 'null'
      return 'user-' + userId
    },
    echo: function () {
      if (this.echoChannel === '') return null

      return new Echo({
        broadcaster: 'pusher',
        key: this.pusherListenSetting.app_key,
        cluster: this.pusherListenSetting.cluster,
        forceTLS: true,
        authEndpoint: '/api/broadcast/auth'
      })
    }
  },
  watch: {
    echo: function (echo) {
      if (!echo) return null
      const vm = this
      echo.private(this.echoChannel)
        .listen('.Call', (data) => {
          vm.showCallerId(data)
        })
    }
  },
  async created () {
    await this.$store.dispatch('pusher/fetchListenSettings')
  },
  methods: {
    showCallerId (data) {
      console.log(data)
      this.$notify({
        group: 'callerId',
        duration: -1,
        data: data
      })
    }
  }
}
</script>

<style lang="scss">
</style>
