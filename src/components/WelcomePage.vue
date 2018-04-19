<template>
  <div class="column">
    <h1>Welcome to Gleb's Russian Watches</h1>
    <h2>Fine purveyor of used and stolen timepieces.</h2>
    <form v-on:submit.prevent="register">
      <p>Please register before shopping.</p>
      <input  v-model="username" placeholder="User Name">
      <input  v-model="name" placeholder="First and Last Name"><br/>
      <input  v-model="email" placeholder="Email Address">
      <input  type="password" v-model="password" placeholder="Password">
      <button class="btn btn-success" type="submit">Register</button>
    </form>
    <p class="error">{{registerError}}</p>
  </div>
</template>

<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       username: '',
       email: '',
       password: '',
       name: '',
     }
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       this.$store.dispatch('register',{
	 username: this.username,
         email: this.email,
         password: this.password,
	 name: this.name,
       });
     }
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 img {
     width: 100px;
 }

 form {margin-left:10px;}

 h1 {
     margin-top: 10px;
     margin-left: 10px;
     margin-bottom: 0px;
 }
 h2 {
     margin-top: 0px;
     margin-left: 20px;
     font-size: 1.2em;
     font-weight: normal;
     margin-bottom: 50px;
 }

</style>


