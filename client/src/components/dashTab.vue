
<template>
  	<b-table  striped hover :items="GET_ORDERS" :fields="fields">
		
		<template v-slot:cell(id)="row">
			 {{row.index + 1}}
		</template>
	  
		<template v-slot:cell(order)="row">
		
			<b-btn variant="danger" size="md" @click="row.toggleDetails"> <!-- btnClick(row)-->
				<b> {{ row.detailsShowing ? 'Скрыть' : 'Просмотр' }} </b>
			</b-btn>
       </template>  
		
	   <template v-slot:row-details="row">
        <b-table :items="get_order_id (row.index)" :fields="orderFields"> 
			<template v-slot:cell(id)="row">
			 	{{row.index + 1}}
		    </template>   
		</b-table>
      </template>
		
	</b-table>
</template>

<script>
	
import { mapGetters } from 'vuex';
import { bus } from '../main'
	
//import Order from '../components/Order.vue'
	
export default {
	
	
  data() {
      return {
 
		fields: [{ key: 'id', label: '№' }, 
				{ key: 'phone', label: 'Телефон' },
				{ key: 'order', label: 'Заказ', _showDetails: true  },
				{ key: 'platform', label: 'Платформа' },
				{ key: 'time', label: 'Время' },
				{ key: 'name', label: 'Имя' },
				{ key: 'address', label: 'Адрес' },
				{ key: 'payment', label: 'Способ оплаты' },
			], 
	
		orderFields: [{ key: 'id', label: '№' }, 
				//{ key: 'productid', thClass: 'd-none', tdClass: 'd-none' }, 
				{ key: 'title', label: 'Товар' },
				{ key: 'cat', label: 'Катег' },
				{ key: 'price', label: 'Цена (ед.)' },
				{ key: 'qty', label: 'Кол.' }]
      }
    },
	
  computed: {
	
		... mapGetters (['GET_ORDERS']),
  },

  methods: {
	
		get_order_id (id) {
	
			var items = this.$store.state.orderQueue;		
			var elem = items[id];  
			//console.log ('cart \n', elem.cart);
			return elem.cart;
		} ,
  },

	
};
</script>

<style scoped>
	
</style>