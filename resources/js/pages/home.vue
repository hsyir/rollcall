<template>
  <v-card :loading="loading">
    <v-card-title>ورود و خروج</v-card-title>
    <v-snackbar v-model="snackbar" timeout="2000">
      {{ snackText }}
      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-card-text>
      <v-btn
        color="green"
        :loading="loading && !isEntered"
        :disabled="isEntered"
        @click="rollcallIn"
      >
        ورود
      </v-btn>
      <v-btn
        color="orange"
        :loading="loading && isEntered"
        :disabled="!isEntered"
        @click="rollcallOut"
      >
        خروج
      </v-btn>
      <list :attendances="attendances" />
    </v-card-text>
  </v-card>
</template>

<script>
import List from "./../pages/attendances/list.vue";
import axios from "axios";
export default {
  components: { List },
  middleware: "auth",
  data: () => {
    return {
      loading: false,
      isEntered: false,
      snackbar: false,
      snackText: "",
      attendances: [],
    };
  },
  // async asyncData () {
  //   const { data: projects } = await axios.get('/api/projects')

  //   return {
  //     projects
  //   }
  // },
  computed: {},
  mounted() {
    this.getRollcallStatus();
  },
  metaInfo() {
    return { title: this.$t("home") };
  },
  methods: {
    getRollcallStatus() {
      this.loading = true;
      axios.get("/api/rollcall/lastStatus").then((res) => {
        this.isEntered = res.data.entered;
        this.loading = false;
        this.attendances = res.data.attendances;
      });
    },
    rollcallIn() {
      this.loading = true;
      axios
        .post("/api/rollcall/in")
        .then((res) => {
          if (!res.data.success) {
            if (res.data.isEntered) {
              this.isEntered = true;
              this.snackText = "قبلا ساعت ورود ثبت شده است";
              this.snackbar = true;
            } else {
              this.snackText = "ثبت نشد";
              this.snackbar = true;
              this.getRollcallStatus();
            }
          } else {
            this.isEntered = true;
          }
          this.attendances = res.data.attendances;
        })
        .catch((res) => {
          this.loading = false;
        })
        .then(() => {
          this.loading = false;
        });
    },
    rollcallOut() {
      this.loading = true;
      axios
        .post("/api/rollcall/out")
        .then((res) => {
          if (!res.data.success) {
            if (res.data.notEntered) {
              this.isEntered = false;
              this.snackText = "ورود شما ثبت نشده است";
              this.snackbar = true;
            } else {
              this.snackText = "ثبت نشد";
              this.snackbar = true;
              this.getRollcallStatus();
            }
          } else {
            this.isEntered = false;
          }
          this.attendances = res.data.attendances;
        })
        .catch((res) => {
          this.loading = false;
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
};
</script>
