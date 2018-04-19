<template>
  <div>
    <div v-if="loggedIn">
      <watch-home/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import WatchHome from './WatchHome';
 export default {
   name: 'HomePage',
   components: {WelcomePage, WatchHome},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<style scoped>
</style>
