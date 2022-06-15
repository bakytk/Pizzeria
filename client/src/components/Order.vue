
<template>
  <div >
  	<b-table :items="GET_ORDER_ID" :fields="fields">
		
		<template v-slot:cell(id)="row">
			 {{row.index + 1}}
		</template>
		
	</b-table>

  </div>
</template>

<script>
	
import { mapGetters } from 'vuex';	
	
export default {

  data() {
      return {

		items: [], 
		fields: [{ key: 'id', label: '№' }, 
				//{ key: 'productid', thClass: 'd-none', tdClass: 'd-none' }, 
				{ key: 'title', label: 'Товар' },
				{ key: 'cat', label: 'Катег' },
				{ key: 'price', label: 'Цена (ед.)' },
				{ key: 'qty', label: 'Кол.' }], 
		  }
		},
	
	  computed: {

			... mapGetters (['GET_ORDER_ID']),
	  },
};
</script>

<style scoped>
	
</style>