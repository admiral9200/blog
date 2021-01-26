import Vue from 'vue';
export var globalStore = new Vue({
    data() {
        return {
            loggedIn: false
        }
    },
    created() {
        this.loggedIn = JSON.parse(window.localStorage.getItem('loggedIn'));
    },
    methods: {
        setLoggedIn(state) {
            window.localStorage.setItem('loggedIn', JSON.stringify(state))
            this.loggedIn = state;
        }
    },
});