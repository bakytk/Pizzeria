<template>
  <div id="app">
	<br/>
		<!-- <div class="text-uppercase"> <b class="text-danger">МАГАЗИН</b>: {{ shop }} </div> -->
		<div class="text-center" size="XL"> <b class="text-danger">СТАТУСЫ ЗАКАЗОВ</b></div>
	<br/>
	<b-row>
		<b-col cols="10">
			<b-button @click.prevent="edit" 
					  variant="info" size="lg" align="right" class="btn-right"> Редактировать ассортимент
			</b-button>
		</b-col>
		<b-col cols="2">
			<b-button @click.prevent="exit" 
					  variant="danger" size="lg" align="left" class="btn-right"> Выйти
			</b-button>
		</b-col>
	</b-row>
	  <p/><p/>
	<dashTab></dashTab>
  </div> 
</template>

<script>
	
import dashTab from '../components/dashTab.vue'
	
export default {
	
    data() {
      return {
        items: [], 
		fields: [], 
		shop: ''
      }
    },
	
	components: {
        dashTab,
    },
	
	methods: {
	
		exit() {
	
			//RE-WRITE --this.$store.dispatch('logout'); 
			this.$router.push('/'); 
		},
	
		edit() {
	
			//RE-WRITE --this.$store.dispatch('logout'); 
			this.$router.push('/Edit'); 
		},
	},

	created () {
	
			this.$axios.get('/dash', { 'headers': { 'Authorization': this.$cookies.get('bothubco') }})

				.then(resp => { 

					//if resp.data.success else {}
					//this.shop = resp.data.shop_name;

					var data = resp.data.payload;
					var keys = Object.keys(data[0]['user']);

					var newlist = []
					data.forEach(( elem, idx ) => {

						var jsn = {} 

						keys.forEach(key => { 
							var value = elem['user'][key];
							jsn[key] = value; 
						});

						var time = new Date(elem.timestamp).toLocaleString("ru-KZ")
						jsn['time'] = time;
						jsn['cart'] = elem.cart;
						//console.log('values \n', Object.values (elem.cart[0]) );

						newlist.push(jsn);
						if ( idx == data.length-1 ) {

							//console.log('newlist.length \n', newlist.length);
							this.$store.dispatch('setOrder', newlist);
						}
					})	
				})
	    
    }
	
} 
</script>