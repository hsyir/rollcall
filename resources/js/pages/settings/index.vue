<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
export default {
  middleware: 'auth',

  computed: {
    tabs () {
      return [
        {
          icon: 'user',
          name: this.$t('pusher'),
          route: 'settings.pusher'
        },
        {
          icon: 'user',
          name: this.$t('simotel'),
          route: 'settings.simotelProfiles'
        },
        {
          icon: 'user',
          name: this.$t('simotel users profile'),
          route: 'settings.simotelUserProfiles'
        },
        {
          icon: 'user',
          name: this.$t('caller-id test'),
          route: 'settings.callerIdTest'
        }
      ]
    }
  }
}
</script>

<style>
.settings-card .card-body {
  padding: 0;
}
</style>
