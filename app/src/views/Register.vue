<template>
  <div class="card gimme_space">
    <div class="c">
      <form @submit.prevent="register">
        <label for="username">Username</label><br />
        <input
          class="full"
          type="text"
          id="username"
          placeholder="Username"
          v-model="username"
          autocomplete="none"
        /><br />
        <label for="email">Email</label><br />
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
          autocomplete="new-password"
        /><br />
        <label for="passwordConf">Confirm Password</label><br />
        <input
          class="full"
          type="password"
          id="passwordConf"
          placeholder="Confirm Password"
          v-model="confirmPassword"
          autocomplete="new-password"
        /><br />
        <button type="submit" class="b primary">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    register() {
      axios
        .post("/api/register", this.$data, { withCredentials: true })
        .then((response) => {
          console.log("Registered");
          this.$globals.setLoggedIn(true);
          router.push("/");
        })
        .catch((errors) => {
          console.log(errors.response.data);
        });
    },
  },
};
</script>