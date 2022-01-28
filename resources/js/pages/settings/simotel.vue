<template>
  <div>
    <v-card v-if="step === 'list'">
      <v-card-title>
        {{ $t("simotel connect") }}
        <v-spacer />
        <v-btn
          class="mx-3"
          fab
          small
          color="primary"
          @click.prevent="createNew"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="getHeaders()" :items="profiles">
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editProfile(item)"
              >mdi-pencil</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-card v-if="step === 'form'">
      <v-card-title>{{ $t("simotel connect") }}</v-card-title>
      <v-card-text>
        <simotel-profile :item-id="itemId" @close="step = 'list'" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SimotelProfile from "./simotel-profile";

export default {
  components: { SimotelProfile },
  scrollToTop: false,

  metaInfo() {
    return { title: this.$t("settings") };
  },

  data: () => ({
    step: "list",
    itemId: null,
    headers: "",
  }),

  computed: mapGetters({
    profiles: "simotel/profiles",
  }),

  async created() {
    if (this.profiles.length === 0) {
      await this.$store.dispatch("simotel/fetchProfiles");
    }
  },

  methods: {
    createNew() {
      this.itemId = this.profiles.length + 1;
      this.step = "form";
      console.log(this.profiles.length, this.itemId);
    },
    editProfile(item) {
      this.itemId = this.profiles.indexOf(item);
      this.step = "form";
    },
    getHeaders(){
      return [
      {
        text: this.$t("Profile Name"),
        align: "start",
        sortable: false,
        value: "profile_name",
      },
      {
        text: this.$t("Server"),
        value: "server",
      },
      {
        text: this.$t("Username"),
        value: "user",
      },
      {
        text: this.$t("Context"),
        value: "context",
      },
      {
        text: this.$t("Actions"),
        value: "actions",
        sortable: false,
      },
    ]
    }
  },
};
</script>
