<template>
  <span v-if="loggedIn" class="acc"
    >Welcome {{ username }}!<br /><router-link to="account">Account</router-link>/<a ref="logout"
      @click.prevent="logout"
      >Logout</a
    ></span
  >
  <span v-else class="acc"
    ><router-link to="login">Login</router-link>/<router-link to="register"
      >Register</router-link
    ></span
  >
</template>

<script>
import router from "../router";

export default {
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
    username: function() {
      return this.$globals.username
    }
  },
  methods: {
    async logout() {
      this.$globals.setLoggedIn(false);
      await this.$http.get("/api/logout", { withCredentials: true });
      this.$globals.addNotification("Logged out!", "success", 5000);
      router.push("/");
    },
    async updateAccountDetails() {
      if(this.loggedIn) {
        try {
          var result = await this.$http.get("/api/account", {
            withCredentials: true,
          });
          this.$globals.setUsername(result.data.data.username);
        } catch(e) {
          
        }
      }
    },
  },
};
</script>