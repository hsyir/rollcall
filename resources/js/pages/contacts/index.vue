<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
export default {
  middleware: "auth",
  computed: {
    tabs() {
      return [
        {
          icon: "user",
          name: this.$t("Persons"),
          route: "persons.list"
        },
        {
          icon: "user",
          name: this.$t("Create Person"),
          route: "persons.create"
        },
        {
          icon: "user",
          name: this.$t("Companies"),
          route: "companies.list"
        },
        {
          icon: "user",
          name: this.$t("Create Company"),
          route: "companies.create"
        }
      ];
    }
  }
};
</script>

<style>
.settings-card .card-body {
  padding: 0;
}
</style>
