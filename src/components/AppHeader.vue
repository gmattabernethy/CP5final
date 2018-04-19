<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Gleb's Russian Watches</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse pull-right" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <router-link to="/"><button class="btn btn-primary mr-3" v-if="loggedIn">Home</button></router-link>
<button class="btn btn-light mr-3 disabled" v-if="loggedIn">logged in as : {{user.username}}</button>      
    <button class="btn btn-danger" @click="logout" v-if="loggedIn">Logout</button>
    <form v-else class="form-inline my-2 my-lg-0" v-on:submit.prevent="login">
	<input class="form-control mr-sm-2" v-model="email" placeholder="Email Address">
	<input type="password" class="form-control mr-sm-2" v-model="password" placeholder="Password">
	<button class="btn btn-primary my-2 my-sm-0" type="submit">Login</button>
    </form>
    </ul>
    <div class="flexWrapper errorPlace">
      <p v-if="loginError" class="flexRight error">{{loginError}}</p>
    </div>
  </div>
</nav>
</template>

<script>
 export default {
   name: 'AppHeader',
   data () {
     return {
       email: '',
       password: '',
     }
   },
   computed: {
     user: function() {
       return this.$store.getters.user;
     },
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
     loginError: function() {
       return this.$store.getters.loginError;
     },
   },
   methods: {
     login: function() {
       this.$store.dispatch('login',{
         email: this.email,
         password: this.password,
       }).then(user => {
	 this.email = '';
	 this.password = '';
       });
     },
     logout: function() {
       this.$store.dispatch('logout');
     }
   }
 }
</script>

