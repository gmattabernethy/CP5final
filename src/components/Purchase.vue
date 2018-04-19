<template>
<div id='app' class="container-fluid">
  <div class="row">
            <div class="col col-md-6">
                <div class="display" style="text-align: center">
                  <h2>{{curWatch.name}}</h2>
                    <img v-bind:src="curWatch.img" style="max-width: 100%" class="img-responsive" />
                    <div class="row" style="margin-left:5px">
                        <p class="col-md-9" style="text-align: left">{{curWatch.desc}}</p>
                        <h2 class="col-md-2"><span class="badge badge-secondary">${{curWatch.price}}.00</span></h2>

                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <fieldset>
                  <legend>Purchase this watch</legend>
                <form v-on:submit.prevent="addPurchase">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="name">Full Name</label>
                      <input v-model="buyer" type="text" class="form-control" id="name"  placeholder="Name" required>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="email">Email</label>
                      <input v-model="email" type="email" class="form-control" id="email"  placeholder="Email">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="address">Address</label>
                    <input v-model="address" type="text" class="form-control" id="address" placeholder="1234 Main St">
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCity">City</label>
                      <input v-model="city" type="text" class="form-control" id="inputCity" placeholder="Provo">
                    </div>
                    <div class="form-group col-md-4">
                      <label for="inputState">State</label>
                      <input v-model="st" id="inputState" type="text" class="form-control" placeholder="Utah">
                    </div>
                    <div class="form-group col-md-2">
                      <label for="inputZip">Zip</label>
                      <input v-model="zip" type="text" class="form-control" id="inputZip">
                    </div>
                  </div>
                  <div class="form-row">
                      <div class="form-group col-md-8">
                        <label for="creditCard">Credit Card</label>
                        <input v-model="creditCard" type="text" class="form-control" id="creditCard" placeholder="XXXX-XXXX-XXXX-XXXX" required>
                      </div>
                      <div class="form-group col-md-2">
                        <label for="MoYr">Mo/Yr</label>
                        <input type="text" class="form-control" id="MoYr" placeholder="XX/XX">
                      </div>
                      <div class="form-group col-md-2">
                        <label for="CCV">CCV</label>
                        <input type="text" class="form-control" id="CCV" placeholder="XXX">
                      </div>
                  </div>

                  <button type="submit" class="btn btn-success">Purchase</button>
                  <span><a href="/" class="btn btn-primary" role="button" style="float:right" aria-disabled="true">Cancel / Return Home</a></span>
                </form>
                </fieldset>
                <br>
                <div class="alert alert-dark"><b>Our Happy Customers</b></div>
                <ul v-for="p in filteredPurchases" class="list-group">
                    <li class="list-group-item">{{p.text}}
                      <button v-on:click="cancelPurchase(p)" class="btn btn-danger btn-sm" style="float:right">Refund</button>
                    </li>
</ul>
            </div>
      </div>
    </div>
</template>

<script>
/*
var validWatches = ["vostokN1","vostokAmphibia","poljotOkean"];

var url = new URL(window.location);
var myWatch = url.href.substr(url.href.lastIndexOf('/') + 1);
console.log(url);
console.log(myWatch);
if (validWatches.indexOf(myWatch)<0){
  myWatch="vostokAmphibia";
}
console.log("Someone is looking at : " + myWatch);
*/

export default {
  name: 'Purchase',
  data() {
    return{
    curWatch: {},
    loading:true,
    watchname : this.$route.params.watch,
    purchases: [],
    buyer: '',
    email: '',
    address: '',
    city: '',
    st: '',
    zip: '',
    creditCard: ''
    }
  },
  created: function() {
    this.buyWatch();
    this.getPurchases();
  },
  computed:{
      watch:function(){
          var watch = this.$route.params.watch;
          return watch;
      },
      filteredPurchases: function() {
        return this.purchases.filter(purchase=> purchase.watch===this.$route.params.watch);
      },
      user: function() {
       return this.$store.getters.user;
     }

  },
  methods: {
    getPurchases: function() {
      axios.get("/api/purchases").then(response => {
        this.purchases = response.data;
        return true;
      }).catch(err => {
      });
    },
    buyWatch: function() {
      this.loading = true;
console.log(this.watchname);	
      // Get the Watch information from the NodeJS Api
      $.getJSON('/api/watch/' + this.watchname , function(json){
        }).then(json=>{
            this.curWatch = json;
            this.loading = false;
            //console.log("Loaded");
        });
      $.getJSON('/api/purchases/' , function(json){
      }).then(json=>{
        this.purchases = json;
      });

    },
    addPurchase: function() {
      var options = {year: 'numeric', month: 'long', day: 'numeric'};
      var smallDateOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
      var date = new Date();
      var smallDate = date.toLocaleDateString('en-US', smallDateOptions);
      var dateString = date.toLocaleDateString('en-US', options);
      axios.post("/api/purchases", {watch:this.$route.params.watch, date:smallDate,name:this.buyer, email:this.email, address:this.address, city:this.city, st:this.st, zip:this.zip, text: dateString +': '+ this.buyer + ' bought a ' + this.curWatch.name ,
      }).then(response => {
        this.buyer = "";
 	this.email = "";
	this.address = "";
	this.city = "";
	this.st = "";
	this.zip = "";
        this.creditCard = "";
        this.getPurchases();
        console.log("Just sold a " + this.$route.params.watch);
        return true;
      }).catch(err => {
      });
    },
    cancelPurchase: function(purchase) {
      axios.delete("/api/purchases/" + purchase.id).then(response => {
        this.getPurchases();
        console.log("Refunding purchase #" + purchase.id);
        return true;
      }).catch(err => {
      });
    },

  }
}
</script>

<style>
</style>
