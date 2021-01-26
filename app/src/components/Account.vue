<template>
  <span v-if="loggedIn" class="acc"
    >Welcome {{ username }}!<br /><a href="/account">Account</a>/<a ref="logout"
      @click.prevent="logout"
      >Logout</a
    ></span
  >
  <span v-else class="acc"
    ><router-link to="/login">Login</router-link>/<router-link to="/register"
      >Register</router-link
    ></span
  >
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {
      username: "",
    };
  },
  watch: {
    async loggedIn() {
      await this.updateAccountDetails();
    },
  },
  async created() {
    await this.updateAccountDetails();
  },
  computed: {
    loggedIn: function () {
      return this.$globals.loggedIn
    },
  },
  methods: {
    async logout() {
      this.$globals.setLoggedIn(false);
      await axios.get("/api/logout", { withCredentials: true });
      router.push("/");
    },
    async updateAccountDetails() {
      if(this.loggedIn) {
      var result = await axios.get("/api/account", {
        withCredentials: true,
      });
      this.username = result.data.username;
      } else {
      }
    },
  },
};
</script>