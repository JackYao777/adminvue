<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view></router-view>
    <!-- <MainLayout></MainLayout> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import store from './store';
import MainLayout from './view/layout/MainLayout.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  methods: {
    ...mapMutations({
      initTheme: 'theme/initTheme'
    }),
  },
  created() {
    console.log('this.initTheme', store)
    this.initTheme();
  }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>

