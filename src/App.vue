<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view></router-view>
     <!-- <MainLayout></MainLayout> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MainLayout from './view/layout/MainLayout.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  }
}
</script>

<style>
html,body,#app {
  width: 100%;
  height: 100%;
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
