<template>
    <span v-if="loggedIn" class="acc">Welcome {{ username }}!<br><a href="/account">Account</a>/<a @click.prevent="logout">Logout</a></span>
    <span v-else class="acc"><router-link to="/login">Login</router-link>/<router-link to="/register">Register</router-link></span>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
    computed: {
        loggedIn: function() {
            return this.$root.state.loggedIn == true;
        },
        username: function() {
            if (this.$root.state.loggedIn) {
                axios.get('/api/account')
                .then((response) => {
                    return response.data.username;
                })
                .catch((errors) => {
                    console.log(errors.response.data);
                    return null;
                });
            }
            return null;
        }
    },
    created() {
        
    },
    methods: {
        logout() {
            this.$root.clearLoggedIn();
            router.push("/");
        },
    },
}
</script>