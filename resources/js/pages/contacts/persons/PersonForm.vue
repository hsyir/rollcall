<template>
  <form @submit.prevent="submit" @keydown="form.onKeydown($event)">
    <alert-success :form="form" :message="$t('contact_created')" />
    <v-text-field
      v-model="form.firstname"
      :error="form.errors.has('firstname')"
      :error-messages="form.errors.get('firstname')"
      :label="$t('Firstname')"
    ></v-text-field>

    <v-text-field
      v-model="form.lastname"
      :error="form.errors.has('lastname')"
      :error-messages="form.errors.get('lastname')"
      :label="$t('Lastname')"
    ></v-text-field>

    <v-text-field
      v-model="form.email"
      :error="form.errors.has('email')"
      :error-messages="form.errors.get('email')"
      :label="$t('Email')"
    ></v-text-field>

    <v-text-field
      v-model="form.mobile"
      :error="form.errors.has('mobile')"
      :error-messages="form.errors.get('mobile')"
      :label="$t('Mobile')"
    ></v-text-field>

    <v-btn depressed color="primary" :loading="form.busy" @click="submit">
      {{ $t("Save") }}
    </v-btn>
  </form>
</template>

<script>
import Form from "vform";

export default {
  scrollToTop: false,
  props: {
    mode: {
      type: String,
      default: () => "create",
    },
    person: {
      type: Object,
      default: () => null,
    },
  },
  data: () => ({
    form: new Form({
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
    }),
  }),
  watch: {
    person: function (newVal) {
      if (this.person === null) return null;
      this.form.keys().forEach((key) => {
        this.form[key] = this.person[key];
      });
    },
  },
  mounted() {
    if (this.person === null) return null;
    this.form.keys().forEach((key) => {
      this.form[key] = this.person[key];
    });
  },
  methods: {
    async submit() {
      let data = {};
      console.log(this.form,"form");
      if (this.mode === "create") {
        data = await this.form.post("/api/persons");
      } else {
        data = await this.form.patch("/api/persons");
      }
      this.form.keys().forEach((key) => {
        this.person[key] = data.data.data[key];
      });

      this.$emit("saved", this.person, this.mode);
    },
  },
};
</script>
