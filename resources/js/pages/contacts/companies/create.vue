<template>
  <card :title="$t('Create Company')">
    <form @submit.prevent="create" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('company_created')"/>

      <!-- Company name -->
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label text-md-end">{{ $t('Company Name') }}</label>
        <div class="col-md-7">
          <input v-model="form.name" :class="{ 'is-invalid': form.errors.has('name') }" class="form-control"
                 type="text" name="name"
          >
          <has-error :form="form" field="name"/>
        </div>
      </div>

      <!-- Phone Number -->
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label text-md-end">{{ $t('Phone Number') }}</label>
        <div class="col-md-7">
          <input v-model="form.phone_number" :class="{ 'is-invalid': form.errors.has('phone_number') }" class="form-control"
                 type="text" name="phone_number"
          >
          <has-error :form="form" field="phone_number" />
        </div>
      </div>

      <!-- Address -->
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label text-md-end">{{ $t('Address') }}</label>
        <div class="col-md-7">
          <input v-model="form.address" :class="{ 'is-invalid': form.errors.has('address') }" class="form-control"
                 type="text" name="address"
          >
          <has-error :form="form" field="address" />
        </div>
      </div>

      <!-- Fax -->
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label text-md-end">{{ $t('Fax') }}</label>
        <div class="col-md-7">
          <input v-model="form.fax" :class="{ 'is-invalid': form.errors.has('fax') }" class="form-control"
                 type="text" name="fax"
          >
          <has-error :form="form" field="fax" />
        </div>
      </div>

      <!-- Email -->
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label text-md-end">{{ $t('email') }}</label>
        <div class="col-md-7">
          <input v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }" class="form-control"
                 type="email" name="email"
          >
          <has-error :form="form" field="email"/>
        </div>
      </div>

      <!-- Postal Code -->
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label text-md-end">{{ $t('Postal Code') }}</label>
        <div class="col-md-7">
          <input v-model="form.postal_code" :class="{ 'is-invalid': form.errors.has('postal_code') }" class="form-control"
                 type="text" name="postal_code"
          >
          <has-error :form="form" field="postal_code" />
        </div>
      </div>

      <!-- Registration Number-->
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label text-md-end">{{ $t('Registration Number') }}</label>
        <div class="col-md-7">
          <input v-model="form.registration_number" :class="{ 'is-invalid': form.errors.has('registration_number') }" class="form-control"
                 type="text" name="registration_number"
          >
          <has-error :form="form" field="registration_number" />
        </div>
      </div>

      <!-- Economic Code -->
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label text-md-end">{{ $t('Economic Code') }}</label>
        <div class="col-md-7">
          <input v-model="form.economic_code" :class="{ 'is-invalid': form.errors.has('economic_code') }" class="form-control"
                 type="text" name="economic_code"
          >
          <has-error :form="form" field="economic_code" />
        </div>
      </div>

      <!-- National Id -->
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label text-md-end">{{ $t('National Id') }}</label>
        <div class="col-md-7">
          <input v-model="form.national_id" :class="{ 'is-invalid': form.errors.has('national_id') }" class="form-control"
                 type="text" name="national_id"
          >
          <has-error :form="form" field="national_id" />
        </div>
      </div>

      <!-- Registration Date -->
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label text-md-end">{{ $t('Registration Date') }}</label>
        <div class="col-md-7">
          <input v-model="form.company_registration_date" :class="{ 'is-invalid': form.errors.has('company_registration_date') }" class="form-control"
                 type="text" name="company_registration_date"
          >
          <has-error :form="form" field="company_registration_date" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mb-3 row">
        <div class="col-md-9 ms-md-auto">
          <v-button :loading="form.busy" type="success">
            {{ $t('submit') }}
          </v-button>
        </div>
      </div>
    </form>
  </card>
</template>

<script>
import Form from 'vform'
import { mapGetters } from 'vuex'

export default {
  scrollToTop: false,

  metaInfo () {
    return { title: this.$t('Companies') }
  },

  data: () => ({
    form: new Form({
      name: '',
      phone_number: '',
      address: '',
      fax: '',
      email: '',
      postal_code: '',
      registration_number: '',
      economic_code: '',
      national_id: '',
      company_registration_date: '',
    })
  }),

  computed: mapGetters({
    // user: 'auth/user'
  }),

  created () {
    // Fill the form with user data.
    this.form.keys().forEach(key => {
      this.form[key] = this.user[key]
    })
  },

  methods: {
    async create () {
      const { data } = await this.form.post('/api/companies')
      console.log(data)
      this.$router.push({ name: 'companies.list' })
    }
  }
}
</script>
