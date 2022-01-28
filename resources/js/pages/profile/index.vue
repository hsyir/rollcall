<template>
  <div>
    <v-row>
<!--      <v-col cols="3">
        <v-card>
          <v-list>
            <v-list-item v-for="tab in tabs" :key="tab.route" :to="{ name: tab.route }">
              <v-icon></v-icon>
              {{ tab.name }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>-->
      <v-col cols="12" >
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  computed: {
    tabs() {
      return [
        {
          icon: 'user',
          name: this.$t('profile'),
          route: 'settings.profile'
        },
        {
          icon: 'lock',
          name: this.$t('password'),
          route: 'settings.password'
        }
      ]
    }
  }
}
</script>

<style>
.settings-card .card-body {
  padding: 0;
}
</style>
