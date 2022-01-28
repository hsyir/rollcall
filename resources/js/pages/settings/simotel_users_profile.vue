<template>
  <div>
    <v-card v-if="step==='list'" :loading="busy">
      <v-card-title>{{ $t('Simotel Users Profile') }}</v-card-title>
      <v-card-text>
        <v-row v-for="(user,key) in users" :key="user.id">
          <v-col cols="3">
            <v-text-field label="Name" :value="user.name" readonly />
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="user.simotel_exten" label="Exten" />
          </v-col>
          <v-col cols="3">
            <v-select
              :items="profiles"
              label="profile"
              v-model="user.simotel_profile"
              item-text="profile_name"
              item-value="profile_name"
            ></v-select>
          </v-col>
        </v-row>

      <v-btn :loading="busy" color="primary" @click.prevent="update">{{ $t('Submit') }}</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  scrollToTop: false,

  metaInfo() {
    return { title: this.$t("settings") };
  },

  data: () => ({
    step: "list",
    busy: false
  }),

  computed: mapGetters({
    users: "simotel/usersProfile",
    profiles: "simotel/profiles"
  }),

  async created() {
    if (this.users.length === 0) {
      await this.$store.dispatch("simotel/fetchUsersProfile");
      await this.$store.dispatch("simotel/fetchProfiles");
    }
  },

  methods: {
    createNew() {
      this.itemId = this.profiles.length + 1;
      this.step = "form";
      console.log(this.profiles.length, this.itemId);
    },
    editProfile(itemId) {
      this.itemId = itemId;
      this.step = "form";
    },
    async update() {
      this.busy = true;
      await this.$store.dispatch("simotel/updateUsersProfile", this.users);
      this.busy = false;
    }
  }
};
</script>
