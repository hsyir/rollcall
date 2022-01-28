<template>
  <v-layout fill-height>
    <v-container class="d-flex" fluid>
      <v-row class="align-self-stretch blue lighten-4">
        <v-col class="align-self-center pa-6" cols="12" sm="8" md="6">
          <v-card v-if="mustVerifyEmail" :title="$t('register')">
            <div class="alert alert-success" role="alert">
              {{ $t("verify_email_address") }}
            </div>
          </v-card>
          <v-card v-else :loading="form.busy">
            <v-card-title>ثبت نام</v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <form
                    @submit.prevent="register"
                    @keydown="form.onKeydown($event)"
                  >
                    <!-- Name -->

                    <v-text-field
                      v-model="form.name"
                      :error="form.errors.has('name')"
                      :error-messages="form.errors.get('name')"
                      label="نام"
                    />

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
                    <v-text-field
                      v-model="form.password_confirmation"
                      type="password"
                      :error="form.errors.has('password_confirmation')"
                      :error-messages="form.errors.get('password_confirmation')"
                      label="تکرار رمز عبور"
                    />
                  </form>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-btn
                depressed
                color="primary"
                :loading="form.busy"
                @click="register"
              >
                {{ $t("Register") }}
              </v-btn>
              <v-btn
                text
                depressed
                color="primary"
                :loading="form.busy"
                :to="{ name: 'login' }"
              >
                {{ $t("login") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="blue darken-4"></v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import Form from "vform";
import LoginWithGithub from "~/components/LoginWithGithub";

export default {
  layout: "basic",
  components: {
    LoginWithGithub,
  },

  middleware: "guest",

  metaInfo() {
    return { title: this.$t("register") };
  },

  data: () => ({
    form: new Form({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    }),
    mustVerifyEmail: false,
  }),

  methods: {
    async register() {
      // Register the user.
      const { data } = await this.form.post("/api/register");

      // Must verify email fist.
      if (data.status) {
        this.mustVerifyEmail = true;
      } else {
        // Log in the user.
        const {
          data: { token },
        } = await this.form.post("/api/login");

        // Save the token.
        this.$store.dispatch("auth/saveToken", { token });

        // Update the user.
        await this.$store.dispatch("auth/updateUser", { user: data });

        // Redirect home.
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
