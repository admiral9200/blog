<template>
  <div class="card gimme_space">
    <div class="c">
      <form @submit.prevent="login">
        <label for="email">E-Mail</label><br />
        <input
          class="full"
          type="email"
          id="email"
          placeholder="Email"
          v-model="email"
          autocomplete="email"
        /><br />
        <label for="password">Password</label><br />
        <input
          class="full"
          type="password"
          id="password"
          placeholder="Password"
          v-model="password"
          autocomplete="current-password"
        /><br />
        <button type="submit" class="b primary">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post("/api/login", this.$data, { withCredentials: true })
        .then((response) => {
          this.$globals.addNotification("Signed in!", "success", 5000);
          this.$globals.setLoggedIn(true);
          router.replace("/");
        })
        .catch((errors) => {
          this.$globals.addNotification(`We couldn't sign you in. Check your login data and try again! Error: ${errors.response.data.message}`, "error", 5000);
        });
    },
  },
};
</script>