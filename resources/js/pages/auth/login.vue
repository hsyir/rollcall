<template>
  <v-layout fill-height>
    <v-container class="d-flex" fluid>
      <v-row class="align-self-stretch blue lighten-4">
        <v-col class="align-self-center pa-16" cols="12" sm="8" md="6">
          <v-card :loading="form.busy">
            <v-card-title>ورود کاربر</v-card-title>
            <v-card-text>
              <form @submit.prevent="login" @keydown="form.onKeydown($event)">
                <v-text-field
                  v-model="form.email"
                  :error="form.errors.has('name')"
                  :error-messages="form.errors.get('email')"
                  label="ایمیل"
                />
                <v-text-field
                  v-model="form.password"
                  type="password"
                  :error="form.errors.has('password')"
                  :error-messages="form.errors.get('password')"
                  label="رمز عبور"
                />
              </form>
            </v-card-text>

            <v-card-actions>
              <v-btn
                depressed
                color="primary"
                :loading="form.busy"
                @click="login"
              >
                {{ $t("Login") }}
              </v-btn>
              <v-btn
                text
                depressed
                color="primary"
                :loading="form.busy"
                :to="{ name: 'register' }"
              >
                {{ $t("Register") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="blue darken-4" />
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import Form from 'vform'
import Cookies from 'js-cookie'

export default {
  components: {},
  layout: 'basic',

  middleware: 'guest',

  metaInfo() {
    return { title: this.$t('login') }
  },

  data: () => ({
    form: new Form({
      email: '',
      password: '',
    }),
    remember: false,
  }),

  methods: {
    async login() {
      // Submit the form.
      const { data } = await this.form.post('/api/login')

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember,
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')

      // Redirect home.
      this.redirect()
    },

    redirect() {
      const intendedUrl = Cookies.get('intended_url')

      if (intendedUrl) {
        Cookies.remove('intended_url')
        this.$router.push({ path: intendedUrl })
      } else {
        this.$router.push({ name: 'home' })
      }
    },
  },
}
</script>
