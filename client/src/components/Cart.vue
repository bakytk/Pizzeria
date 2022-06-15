
<template>
  <div >
  	<b-table v-if="NONEMPTY_CART" ref="table" striped small hover 
			 :items="GET_CART" :fields="fields" foot-clone
			 >
		
		<template v-slot:cell(id)="row">
			 {{row.index + 1}}
		</template>
	  
		<template v-slot:cell(edit)="row">
		
			<b-btn variant="success" size="md" class="btn-circle" @click="incr (row.index)">
				<b>+</b></b-btn>
			<b-btn variant="warning" size="md" class="btn-circle" @click="decr (row.index)">
				<b style="color: white">–</b></b-btn>
			<b-btn variant="danger" size="md" class="btn-circle" @click="rm (row.index)">
				<b>X</b></b-btn>
       </template>  
		
		
		<template v-slot:foot(id)="row"> <p></p></template>
		<template v-slot:foot(title)="row"> <p></p></template>
		<template v-slot:foot(cat)="row"> <p></p></template> 
		<template v-slot:foot(qty)="row"> <b>ИТОГО:</b></template>
		<template v-slot:foot(price)="row"><p>{{ SUBTOTAL }}</p> </template>
		<template v-slot:foot(edit)="row"> <p></p></template>
		
	</b-table>
	  
	<div class="button" v-if="NONEMPTY_CART">
		<b-button variant="danger" size="md" @click="toCheckout"> Оформить заказ </b-button>
		<b-button variant="info" size="md" @click="emptyCart"> Очистить корзину </b-button>
	</div>
	  
	<!--<div v-else> 
 			<div style="text-align: center"><p>Ваша корзина пуста</p></div >		
		</div>-->
	  
  </div>
</template>

<script>
	
import { mapGetters } from 'vuex';
import { sumDue } from '../mixins/utils'
	
import { bus } from '../main'
	
export default {
	
  name: 'shoppingCart',
	
  data() {
      return {
	
		cost: 0,

		fields: [{ key: 'id', label: '№' }, 
				//{ key: 'productid', thClass: 'd-none', tdClass: 'd-none' }, 
				{ key: 'title', label: 'Товар' },
				{ key: 'cat', label: 'Катег' },
				{ key: 'qty', label: 'Кол.' },
				{ key: 'price', label: 'Цена (ед.)' },
				{ key: 'edit', label: 'Редакт.' }], 
      }
    },
	
  computed: {
	
		... mapGetters (['GET_CART', 'SUBTOTAL', 'SMALL', 'NONEMPTY_CART']),
  },
	
  created () {

		this.$store.dispatch('getCart');
  },
	
  mounted () {
	
		bus.$on('cartUpdated', () => {
	
		});
  },

  methods: {
	
		incr (i) {
	
			var cartItems = this.$store.getters.GET_CART;
			var item = cartItems[i];

			this.$store.dispatch('increment', item.productid);
			
		},
	
		decr (i) {
	
			var cartItems = this.$store.getters.GET_CART;
			var item = cartItems[i];

			this.$store.dispatch('decrement', item.productid);
		},
	
    	rm (i) { 
	
			var cartItems = this.$store.getters.GET_CART;
			var item = cartItems[i];

			this.$store.dispatch('rm', item.productid);
		},
	
		emptyCart () { 
			
			this.$store.dispatch('emptyCart');
		},
	
		toCheckout () {

			this.$emit ('exitmd'); 
			this.$store.dispatch('checkout');
		},
  },

	
};
</script>

<style scoped>
	
.button {
	
  backround-color: grey;
  margin: auto;
  /* max-width: 25%; */
}
	
.myclass { 
	font-family: Michroma; 
}
	
	
.btn-circle {
    width: 30px;
    height: 30px;
    padding: 6px 0px;
    border-radius: 50%; /*15px*/
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
}
	
</style>