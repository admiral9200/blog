<template>
    <span v-if="loggedIn" class="acc"><a href="/account">Account</a>/<a href="/logout">Logout</a></span>
    <span v-else class="acc"><a href="/login">Login</a>/<a href="/register">Register</a></span>
</template>

<script>
export default {
    computed: {
        loggedIn: function() {
            return this.$root.$data.state.uid != null;
        }
    },
    created() {
        
    },
}
</script>