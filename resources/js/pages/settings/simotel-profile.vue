<template>
  <form @submit.prevent="update" @keydown="form.onKeydown($event)">
    <alert-success :form="form" :message="$t('info_updated')" />
    <!-- profile name -->

    <v-text-field
      v-model="form.profile_name"
      :error="form.errors.has('profile_name')"
      :error-messages="form.errors.get('profile_name')"
      :label="$t('profile name')"
    />
    <!-- server -->
    <v-text-field
      v-model="form.server"
      :error="form.errors.has('server')"
      :error-messages="form.errors.get('server')"
      :label="$t('server')"
    />
    <!-- user  -->

    <v-text-field
      v-model="form.user"
      :error="form.errors.has('user')"
      :error-messages="form.errors.get('user')"
      :label="$t('user')"
    />

    <!-- pass  -->

    <v-text-field
      v-model="form.password"
      :error="form.errors.has('password')"
      :error-messages="form.errors.get('password')"
      :label="$t('password')"
    />
    <!-- context  -->
    <v-text-field
      v-model="form.context"
      :error="form.errors.has('context')"
      :error-messages="form.errors.get('context')"
      :label="$t('context')"
    />
    <v-row>
      <v-col>

      <v-btn
        depressed
        color="primary"
        :loading="busyUpdate"
        @click="update"
      >
        {{ saveButtonText }}
      </v-btn>
      <v-btn
        depressed
        color="primary"
        :loading="busyDelete"
        @click="deleteProfile"
      >
        {{ $t("delete") }}
      </v-btn>
      <v-btn
        depressed
        color="primary"
        @click="close"
      >
        {{ $t("cancel") }}
      </v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import Form from "vform";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  scrollToTop: false,

  metaInfo() {
    return { title: this.$t("settings") };
  },

  props: {
    itemId: {
      type: Number,
      default: null,
    },
  },

  data: () => ({
    form: new Form({
      profile_name: "",
      server: "",
      user: "",
      password: "",
      context: "",
    }),
    profile: {
      profile_name: "",
      server: "",
      user: "",
      password: "",
      context: "",
    },
    busyUpdate: false,
    busyDelete: false,
  }),

  computed: {
    ...mapGetters({
      profiles: "simotel/profiles",
    }),
    editMode: function () {
      return this.profiles[this.itemId] !== undefined;
    },
    saveButtonText: function () {
      return this.editMode ? this.$t("update") : this.$t("save");
    },
  },

  created() {
    if (this.editMode) {
      this.profile = this.profiles[this.itemId];
    }
    // Fill the form with profile data.
    this.form.keys().forEach((key) => {
      this.form[key] = this.profile[key];
    });
  },
  methods: {
    async update() {
      this.busyUpdate = true;

      const profile = this.form.data();
      const profiles = this.profiles;

      if (this.editMode) {
        profiles[this.itemId] = profile;
      } else {
        profiles.push(profile);
      }
      await this.$store.dispatch("simotel/updateProfiles", profiles);

      this.busyUpdate = false;
      this.close();
    },

    async deleteProfile() {
      const profiles = this.profiles;
      this.busyDelete = true;

      profiles.splice(this.itemId, 1);
      await this.$store.dispatch("simotel/updateProfiles", profiles);

      this.busyDelete = false;
      this.close();
    },

    close() {
      this.$emit("close");
    },
  },
};
</script>
