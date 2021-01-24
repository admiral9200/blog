<template>
  <div id="app">
    <div class="c">
      <account/>
      <h1 class="center"><router-link to="/">{{ $route.name }}</router-link></h1>
      <router-view/>
    </div>
    <br><br><br>
    <footer class="full footer">
      (c) 2021 Julian Blazek. <label for="toggle-theme">Change Theme:</label> <button class="b" id="toggle-theme" @click="changeTheme">🕑</button><br>
      View the sourcecode on <a href="https://github.com/nailujx86/simple-blog" target="_blank" rel="noreferrer">Github</a>.
    </footer>
  </div>
</template>

<script>
import {toggleTheme} from './assets/darkmode';
import Account from '@/components/Account.vue';
export default {
  methods: {
    changeTheme() {
      toggleTheme();
    }
  },
  components: {
    Account
  }
}
</script>