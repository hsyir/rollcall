<template>
  <div>
    <v-card elevation="5" :loading="form.busy" >
      <v-card-title>
        <v-icon
          left
        >
          mdi-pencil
        </v-icon>
        ویرایش پروفایل کاربر
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="update" @keydown="form.onKeydown($event)">
          <alert-success :form="form" :message="$t('info_updated')"/>
          <!-- Name -->
          <v-text-field
            v-model="form.name"
            :error="form.errors.has('name')"
            :error-messages="form.errors.get('name')"
            label="نام "
          ></v-text-field>
          <!-- Email -->
          <v-text-field
            v-model="form.email"
            :error="form.errors.has('email')"
            :error-messages="form.errors.get('email')"
            label="آدرس ایمیل"
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
          <!-- Submit Button -->
          <!--          <v-button :loading="form.busy" type="success">
                      {{ $t('update') }}
                    </v-button>-->
        </form>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Form from 'vform'
import {mapGetters} from 'vuex'

export default {
  scrollToTop: false,

  metaInfo() {
    return {title: this.$t('settings')}
  },

  data: () => ({
    form: new Form({
      name: '',
      email: ''
    })
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  created() {
    // Fill the form with user data.
    this.form.keys().forEach(key => {
      this.form[key] = this.user[key]
    })
  },

  methods: {
    async update() {
      const {data} = await this.form.patch('/api/settings/profile')

      this.$store.dispatch('auth/updateUser', {user: data})
    }
  }
}
</script>
