<template>
  <div>
    <v-card elevation="5" :loading="form.busy">
      <v-card-title>
        <v-icon
          left
        >
          mdi-lock
        </v-icon>
        تغییر رمز عبور
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="update" @keydown="form.onKeydown($event)">
          <alert-success :form="form" :message="$t('password_updated')"/>
          <!-- Name -->
          <v-text-field
            v-model="form.password"
            type="password"
            :error="form.errors.has('password')"
            :error-messages="form.errors.get('password')"
            label="رمز عبور"
          ></v-text-field>
          <v-text-field
            v-model="form.password_confirmation"
            type="password"
            :error="form.errors.has('password_confirmation')"
            :error-messages="form.errors.get('password_confirmation')"
            label="تکرار رمز عبور"
          ></v-text-field>
          <v-card-actions>
            <v-btn
              depressed
              color="primary"
              :loading="form.busy"
              @click="update"
            >
              {{ $t("Save")}}
            </v-btn>
          </v-card-actions>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Form from 'vform'

export default {
  scrollToTop: false,

  metaInfo () {
    return { title: this.$t('settings') }
  },

  data: () => ({
    form: new Form({
      password: '',
      password_confirmation: ''
    })
  }),

  methods: {
    async update () {
      await this.form.patch('/api/settings/password')

      this.form.reset()
    }
  }
}
</script>
