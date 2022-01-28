<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-text>
      {{ $t("you_are_logged_in") }}
    </v-card-text>
  </v-card>
</template>

<script>
// import axios from 'axios'
export default {
  middleware: "auth",

  // async asyncData () {
  //   const { data: projects } = await axios.get('/api/projects')

  //   return {
  //     projects
  //   }
  // },

  metaInfo() {
    return { title: this.$t("home") };
  },
};
</script>
