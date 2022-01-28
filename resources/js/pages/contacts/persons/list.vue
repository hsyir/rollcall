<template>
  <v-card>
    <v-card-title>
      {{ $t("Contacts") }}
      <v-spacer></v-spacer>
      <v-btn class="mx-3" fab small color="primary" @click="create">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ dialogMode=="create" ? 'مخاطب جدید' : 'ویرایش مخاطب'}} </span>
          </v-card-title>
          <v-card-text>
            <person-form :mode="dialogMode" :person="person" @saved="saved" />
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-data-table :items="persons" :headers="getHeaders()">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="edit(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
      <v-snackbar v-model="snackbar" timeout="1500" color="success">
        انجام شد
        <template v-slot:action="{ attrs }">
          <v-btn dark v-bind="attrs" text @click="snackbar = false"> X </v-btn>
        </template>
      </v-snackbar>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import PersonForm from "./PersonForm";

export default {
  components: { PersonForm },
  scrollToTop: false,

  metaInfo() {
    return { title: this.$t("users") };
  },

  data: function () {
    return {
      dialog: false,
      dialogMode: "create",
      persons: [],
      step: "list",
      person: {},
      personIndex: -1,
      snackbar: false,
    };
  },
  computed: mapGetters({
    // user: 'auth/user'
  }),

  mounted() {
    this.fetchContacts();
  },

  methods: {
    async fetchContacts() {
      this.persons = (await axios.get("/api/persons")).data.data;
      console.log(this.persons);
    },
    create() {
      this.dialogMode = "create";
      this.person = {};
      this.personIndex = -1;
      this.dialog = true;
    },
    edit(person) {
      this.editedIndex = this.persons.indexOf(person);
      this.person = person;
      this.dialog = true;
      this.dialogMode = "edit";
    },
    saved(person, mode) {
      console.log("saved", person);
      this.snackbar = true;
      if (this.editedIndex > -1) {
        Object.assign(this.persons[this.editedIndex], person);
      } else {
        this.persons.push(person);
      }
      this.close();
    },
    close() {
      this.dialog = false;
    },
    getHeaders() {
      return [
        {
          text: this.$t("Name"),
          align: "start",
          value: "firstname",
        },
        {
          text: this.$t("Mobile"),
          value: "mobile",
        },
        {
          text: this.$t("Id"),
          value: "id",
        },
        {
          text: this.$t("Address"),
          value: "address",
        },
        {
          text: this.$t("Actions"),
          value: "actions",
        },
      ];
    },
  },
};
</script>
<style scoped>
.table-hover tbody tr {
  cursor: pointer;
}
</style>