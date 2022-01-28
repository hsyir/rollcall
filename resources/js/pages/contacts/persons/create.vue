<template>
  <v-card :title="$t('Create Contact')">
    <v-card-title>{{ $t("Create Contact") }}</v-card-title>
    <v-card-text>
      <person-form mode="create" @saved="created" />
    </v-card-text>
  </v-card>
</template>

<script>
import PersonForm from "./PersonForm";

export default {
  components: { PersonForm },
  scrollToTop: false,

  metaInfo() {
    return { title: this.$t("create person") };
  },

  methods: {
    async created() {
      this.$router.push({ name: "persons.list" });
    },
  },
};
</script>
