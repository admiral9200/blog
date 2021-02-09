<template>
  <div id="app">
    <div class="c">
      <account />
      <h1 class="center">
        <router-link to="/">{{ $route.name }}</router-link>
      </h1>
      <transition-group name="fade">
        <notification
          v-for="notification in $globals.activeNotifications"
          :key="notification.id"
          :type="notification.status"
        >
          {{ notification.message }}
        </notification>
      </transition-group>
      <transition mode="out-in" name="fade">
        <router-view />
      </transition>
    </div>
    <br /><br /><br />
    <footer class="full footer">
      (c) 2021 Julian Blazek. <label for="toggle-theme">Change Theme:</label>
      <button class="b" id="toggle-theme" @click="changeTheme">🕑</button><br />
      View the sourcecode on
      <a
        href="https://github.com/nailujx86/simple-blog"
        target="_blank"
        rel="noreferrer"
        >Github</a
      >.
    </footer>
  </div>
</template>

<script>
import { toggleTheme } from "./assets/darkmode";
import Account from "@/components/Account.vue";
import Notification from "@/components/Notification.vue";
import router from './router';

export default {
  methods: {
    changeTheme() {
      toggleTheme();
    },
  },
  components: {
    Account,
    Notification
  },
  created() {
    this.$http.interceptors.response.use(
      null,
      err => {
        if (err.response.status === 401) {
          this.$globals.setLoggedIn(false);
          this.$globals.addNotification("There was an authentication error. We logged you out and redirected you to the login page. :)", "error", 10000);
          router.push('/login')
        }
        throw err;
      }
    );
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: .2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.notification-enter-active, .notification-leave-active {
  transition: all .2s;
}
.notification-enter, .notification-leave-to{
  opacity: 0;
}
.notification-enter-active {
  transition-delay: .4s;
}

</style>