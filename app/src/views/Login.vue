<template>
  <div class="card gimme_space">
    <div class="c">
      <form @submit.prevent="login">
        <input
          class="full"
          type="email"
          name="email"
          placeholder="Email"
          v-model="email"
        /><br />
        <input
          class="full"
          type="password"
          name="password"
          placeholder="Password"
          v-model="password"
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
          console.log("Signed In");
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