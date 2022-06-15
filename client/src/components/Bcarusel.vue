<template>
  	<b-container>
		
			<b-carousel controls :interval="0">	
				<b-row>
					
					<b-col>
            			<div class="carousel-control-prev-icon"
							 v-on:click="left"
							 v-if="slices.length>1"> < </div>
					</b-col>
					
					<b-col cols="10">
					<b-carousel-slide v-for="(slice, idx) in slices" :key="idx"
									  v-bind:id="itemlistCategory">
						
						<template v-slot:img>
					
						<b-card-group deck style='padding-bottom: 3%; padding-top: 3%'> 
							
							<bcard
								v-for="(unit, indx) in slice" v-bind:key="indx" 
								:title="unit.title" :des="unit.des" 
								:price="unit.price" :img="unit.img" 
								:productId="unit.productid" :catId="itemlistIndx" 
								:catTitle="itemlistCategory"
							></bcard>
			
						</b-card-group> 
						</template>	
					</b-carousel-slide>
    				</b-col>

					<b-col>
            			<div class="carousel-control-next-icon" 
							 v-on:click="right"
							 v-if="slices.length>1"> > </div>
					</b-col>
					
			</b-row>
		</b-carousel>
		
	 </b-container>
</template>

<script>
	
import bcard from '../components/Bcard.vue';
	
export default {

    components: {
        bcard,
    },
	
	data() {
	
      return {
	
		batchSize: 3,
		noBatches: 1,
	
		itemlistIndx: 0,
		itemlistLength: 0,
		itemlistCategory: '',
	
      }
    },
	
	computed: {
									  							  
		slices () {

			this.itemlistIndx = this.$attrs.idx;
			var list = this.$store.state.itemLists [this.$attrs.idx];

			this.itemlistCategory = list[0].cat;
			this.itemlistLength= list.length;
	
			// THIS PART CHUNKS SLICE OF ITEM_ARRAY OF SIZE=this.batchSize
			// NEED ADJUSTMENTS IF EG LEN (ITEM_ARRAY) = 5
	
			var i, rem, q, lowB, upB;
			q = Math.floor(this.itemlistLength/Number (this.batchSize));
			rem = this.itemlistLength % Number (this.batchSize);
	
			if ( rem !=0 ) { this.noBatches = q +1; }
			else { this.noBatches = q; }
	
			var slices = [];
	
			for (i = 0; i < this.noBatches; i++) {
										   
				lowB = i * this.batchSize;
				upB = (i+1) * this.batchSize;

				if (i ==this.noBatches-1 && rem !=0 ) { upB= i *this.batchSize + rem;}						   
										   
				var subslice = list.slice (lowB, upB); 
				slices.push(subslice);						   
			}
										   
        	return slices;
      	},
	},
										   
	methods: {
	
		left () { prev(); },				   
		right () { next(); }
	},

}
</script>
	


<style scoped>
	
.carousel-control-prev-icon,
.carousel-control-next-icon {
	
  outline: black;
  color: red;
  font-size: 55px;
  margin-top: 250%;
}

</style>