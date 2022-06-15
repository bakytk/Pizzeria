<template>
    <b-container id="menu">
		
		<div v-if="LARGE">
			
			<!--
			<b-card-group deck style='padding-bottom: 3%; padding-top: 3%'>

				<b-card v-for="item in catIMG" :key="item.id">
					<b-img-lazy :src="this.$attrs.img" img-alt="Category image"></b-img-lazy>
				</b-card>
			-->
		
			<b-card-group deck style='padding-bottom: 3%; padding-top: 3%' >
				 <b-card border-variant="danger" v-for="item in categories" :key="item.id">
					 <div class="button-container">
						<b-button :href="'/#' + item.cat" variant="danger"> {{ item.cat }} </b-button>
					 </div>
 				 </b-card>
			</b-card-group >

			<div>
				<bcarusel v-for="(itemlist, idx) in itemLists" 
						  :key="idx" :idx="idx" >
				</bcarusel>
			</div>
		</div>
		
		
		<div v-if="SMALL">
			
			 
			 <b-list-group horizontal="md" v-for="item in categories" :key="item.id">
				 
				 <b-button variant="outline-danger" 
						   size="lg" @click="setMobileCategory (item.cat)"> {{item.cat}}
				</b-button>

  			</b-list-group>

			
			<b-card-group deck style='padding-bottom: 3%; padding-top: 3%'> 
							
				<bcard
					v-for="unit in catFromMobile" v-bind:key="unit.id" 
					:title="unit.title" :des="unit.des" :id="unit.id" 
					:price="unit.price" :img="unit.img" :productId="unit.productid"
					:catId="mobileViewCatIndex" :catTitle="unit.cat"
					:catLen="catFromMobile.length"
				></bcard>
			
			</b-card-group>
			
		</div>
	</b-container>
</template>

<script>
	
import bcarusel from '../components/Bcarusel.vue';
import bcard from '../components/Bcard.vue';
	
import { bus } from '../main'
	
import { mapGetters, mapState } from 'vuex'
	
export default {
	
	data() {
	
      return {
	
		mobileViewCatIndex: 0,
	
      }
    },
	
    components: {
	
        bcarusel,
		bcard
    },
	
	computed: {
	
		...mapGetters([
      		'SMALL', 'LARGE',
    	]),
	
		...mapState([
      		'itemLists', 'categories'
    	]),
	
		catFromMobile() {
			return this.$store.state.itemLists[this.mobileViewCatIndex];
		}
	
	},
	
	mounted () {
	
		bus.$on('itemAdded', () => {
	
			var success = this.$store.state.successStatus;
			var msg = this.$store.state.serverMsg;
			var type = success ? "success" : "warning";
	
			this.$fire ({

  				//title: 'title',
				text: msg,
  				type: type,
				confirmButtonColor: "#dc3545",
			});
	
		})
	
	},
	
	methods: {
	
		setMobileCategory: function (category) {

			var idx;
			//console.log ('itemlists.length ', this.$store.state.itemLists);
			var itemlists = this.$store.state.itemLists;
			//console.log ('itemlists[0] ', itemlists [0]);		
	
			for (var i = 0; i < itemlists.length; i++) {
					if (category === itemlists[i][0]['cat']) idx = i
				}
			this.mobileViewCatIndex = idx;
			//console.log ('this.mobileViewCatIndex ', this.mobileViewCatIndex);
    	}
		
	},
}

</script>

<style scoped>
	
.button-container {
	text-align: center;
}
	
</style>