<template>
  <div class="card gimme_space">
    <div class="c">
      <form v-on:submit="register">
        <input
          class="full"
          type="text"
          name="username"
          placeholder="Username"
          v-model="username"
        /><br />
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
        <input
          class="full"
          type="password"
          name="passwordConf"
          placeholder="Confirm Password"
          v-model="confirmPassword"
        /><br />
        <button type="submit" class="b primary">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import router from '../router';
import axios from 'axios';

export default {
    name: 'Register',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        register(e) {
            e.preventDefault();
            axios.post('/api/register', this.$data, {withCredentials: true})
                .then((response) => {
                    console.log("Registered");
                    this.$root.setLoggedIn(true);
                    router.push("/");
                })
                .catch((errors) => {
                    console.log(errors.response.data);
                });
        }
    }
}
</script>