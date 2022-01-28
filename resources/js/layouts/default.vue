<template>
  <v-app>
    <v-navigation-drawer app right v-model="drawer">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-title class="text-h6">مدیر تماس</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{
              user.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-group prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>مخاطبین</v-list-item-title>
          </template>
          <v-list-item link :to="{ name: 'persons.list' }">
            <v-list-item-title>لیست مخاطبین</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-plus-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>تنظیمات</v-list-item-title>
          </template>
          <v-list-item link :to="{ name: 'settings.pusher' }">
            <v-list-item-title>تنظیمات پوشر</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-plus-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link :to="{ name: 'settings.simotelProfiles' }">
            <v-list-item-title>تنظیمات سیموتل</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-plus-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link :to="{ name: 'settings.simotelUserProfiles' }">
            <v-list-item-title>{{
              $t("Simotel Users Profile")
            }}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-plus-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-group prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>پروفایل</v-list-item-title>
          </template>
          <v-list-item link :to="{ name: 'profile.my' }">
            <v-list-item-title>پروفایل</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-plus-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item link :to="{ name: 'profile.password' }">
            <v-list-item-title>رمز عبور</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-plus-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="deep-purple accent-4" dense dark app>
      <v-spacer></v-spacer>
      <v-btn icon @click.prevent="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-layout fill-height>
        <v-container fluid class="grey lighten-2">
          <!-- If using vue-router -->
          <child />
        </v-container>
      </v-layout>
    </v-main>
    <v-footer dark app>
      <v-card class="flex">
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Contacts and calls</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "~/components/Navbar";
import { mapGetters } from "vuex";

export default {
  name: "MainLayout",
  data: () => {
    return {
      drawer: true,
    };
  },

  computed: mapGetters({
    user: "auth/user",
  }),

  components: {
    Navbar,
  },
  methods: {
    async logout() {
      // Log out the user.
      await this.$store.dispatch("auth/logout");
      // Redirect to login.
      this.$router.push({ name: "login" });
    },
  },
};
</script>
