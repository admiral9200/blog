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
                    minlength="8"
                /><br />
                <label for="passwordConf">Confirm Password</label><br />
                <input
                    class="full"
                    type="password"
                    id="passwordConf"
                    placeholder="Confirm Password"
                    v-model="confirmPassword"
                    autocomplete="new-password"
                    minlength="8"
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
                    this.$globals.addNotification(
                        "Successfully registered!",
                        "success",
                        5000
                    );
                    this.$globals.setLoggedIn(true);
                    router.replace("/");
                })
                .catch((errors) => {
                    this.$globals.addNotification(
                        `We couldn't sign you in. Check your login data and try again! Error: ${errors.response.data.message}`,
                        "error",
                        5000
                    );
                });
        },
    },
};
</script>