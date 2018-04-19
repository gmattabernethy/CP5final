<template>
<div>   
<div class="container">
      <div class="card-deck mb-3 text-center">
        <div class="card mb-3 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Vostok Amphibia Classic</h4>
          </div>
          <div class="card-body">
            <img src="../../public/img/vostokAmphibiacrop.jpg">
            <br />
            <p style="color:green">$55.00 USD</p>
            <p>Comes on Stainless steel band</p>
	    <router-link to="/purchase/vostokAmphibia">Purchase</router-link>
          </div>
        </div>
        <div class="card mb-3 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Poljot Okean Final Edition</h4>
          </div>
          <div class="card-body">
            <img src="../../public/img/poljotOkean.jpg">
            <br />
            <p style="color:green">$625.00 USD</p>
                <p>Comes on blue NATO strap</p>
            <router-link to="/purchase/poljotOkean">Purchase</router-link>
          </div>
        </div>
        <div class="card mb-3 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Vostok Europe N-1 Rocket</h4>
          </div>
          <div class="card-body">
            <img src="../../public/img/vostokN1crop.jpg">
            <br />
            <p style="color:green">$600.00 USD</p>
            <p>Comes on black leather strap</p>
	    <router-link to="/purchase/vostokN1">Purchase</router-link>
          </div>
        </div>

      </div>

	<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#adminModal" style="float:right">
        Admins Only
      </button>
    </div>

    <footer class="footer">
      <div class="container">
        <span class="text-muted"><a href="https://github.com/gmattabernethy/cp5" target=_blank>github</a></span>
      </div>
    </footer>

    <div id="adminModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Purchase History</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-striped">
              <tr>
                <td>Name</td>
                <td>Purchase</td>
                <td>Date</td>
                <td>Price</td>
              </tr>
              <tr v-for="p in allPurchases">
                <td>
                  <span class="input-group mb-3">
                    <input type="text" class="form-control input-sm" v-model="p.name" style="width:100px">
                    <div class="input-group-append">
                      <button class="btn btn-sm btn-info" type="button" v-on:click="editPurchase(p)">Save</button>
                    </div>
                  </span>
                </td>
                <td>{{p.watchName}}</td>
                <td>{{p.date}}</td>
                <td class="text-right">${{p.price}}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align:right"><b>Grand Total : ${{grandTotal}}.00</b></td>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div> 


</div>
</template>

<style>
img{
    width: 100%
}
</style>

<script>

export default {
  name: 'WatchHome',
  data() {
    return{
    curWatch: {},
    loading:true,
    watchname : '',
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
    this.getPurchases();
  },
  computed:{
      allPurchases: function(){ 
        return this.purchases;
      },
      grandTotal: function(){
        var t = 0;
        this.purchases.forEach(function(e){
          t += parseFloat(e.price);
        });
        return t;
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
    editPurchase: function(purchase) {
      axios.put("/api/purchases/" + purchase.id, {
        name: purchase.name,
      }).then(response => {
	      return true;
      }).catch(err => {
      });
    },

  }
}
</script>
