import Vue from 'vue';
export var globalStore = new Vue({
    name: 'store',
    data() {
        return {
            loggedIn: false,
            notificationStorage: []
        }
    },
    created() {
        this.loggedIn = JSON.parse(window.localStorage.getItem('loggedIn'));
    },
    computed: {
        activeNotifications() {
            return this.notificationStorage.filter(notification => notification.active);
        }
    },
    methods: {
        setLoggedIn(state) {
            window.localStorage.setItem('loggedIn', JSON.stringify(state))
            this.loggedIn = state;
        },
        addNotification(message, status, timeout) {
            var notificationObj = { message, status, active: true, id: Math.random() };
            this.notificationStorage.push(notificationObj);
            if (timeout) {
                setTimeout(() => {
                    notificationObj.active = false;
                }, timeout);
            }
        }
    },
});