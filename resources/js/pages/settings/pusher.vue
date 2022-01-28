<template>
  <v-card :loading="busy">
    <v-card-title>{{ $t('pusher_app_options') }}</v-card-title>
    <v-card-text>

      <form @submit.prevent="update" @keydown="form.onKeydown($event)">
        <alert-success :form="form" :message="$t('info_updated')"/>

        <v-text-field
          v-model="form.host"
          :error="form.errors.has('host')"
          :error-messages="form.errors.get('host')"
          :label="$t('host')"
        />

        <v-text-field
          v-model="form.port"
          :error="form.errors.has('port')"
          :error-messages="form.errors.get('port')"
          :label="$t('port')"
        />

        <v-text-field
          v-model="form.app_key"
          :error="form.errors.has('app_key')"
          :error-messages="form.errors.get('app_key')"
          :label="$t('app key')"
        />

        <v-text-field
          v-model="form.app_id"
          :error="form.errors.has('app_id')"
          :error-messages="form.errors.get('app_id')"
          :label="$t('app id')"
        />

        <v-text-field
          v-model="form.app_secret"
          :error="form.errors.has('app_secret')"
          :error-messages="form.errors.get('app_secret')"
          :label="$t('app secret')"
          type="password"
        />
      </form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        depressed
        color="primary"
        :loading="form.busy"
        @click="update"
      >
        {{ $t('update') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Form from 'vform'
import { mapGetters } from 'vuex'

export default {
  scrollToTop: false,

  metaInfo () {
    return { title: this.$t('settings') }
  },

  data: () => ({
    form: new Form({
      host: '',
      port: '',
      cluster: '',
      app_key: '',
      app_id: '',
      app_secret: ''
    }),
    loadingPusherSetting: false

  }),

  computed: {
    ...mapGetters({
      pusherSettings: 'pusher/settings'
    }),
    busy: function () {
      return this.loadingPusherSetting || this.form.busy
    }
  },
  watch: {
    pusherSettings: function (newSettings) {
      // Fill the form with user data.
      this.form.keys().forEach(key => {
        this.form[key] = newSettings[key]
      })
    }
  },

  created () {
    if (this.pusherSettings === null) {
      this.$store.dispatch('pusher/fetchSettings')
    } else {
      // Fill the form with user data.
      this.form.keys().forEach(key => {
        this.form[key] = this.pusherSettings[key]
      })
    }
  },
  methods: {
    async update () {
      const { data } = await this.form.patch('/api/settings/pusher')
      this.$store.dispatch('pusher/updateSettings', { settings: data.settings })
    }
  }
}
</script>
