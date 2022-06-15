
<template>
	
  <b-card align="center" border-variant="danger" 
		  :bg-variant="color" style="bcard" ref="bkart">
	 
	  	<div class="b-card-header"> 
	  		<b-card-header header-border-variant="danger"> 
				 {{ this.$attrs.catTitle }}
			</b-card-header>
	  	</div>
	  
		<div class="b-card-txt">
			<div class="b-card-title">
				<b-card-title> {{ this.$attrs.title }} </b-card-title>
			</div>
      		<b-card-text> {{ this.$attrs.des }}  </b-card-text>
			<b-card-text> Цена: <b> {{ this.$attrs.price }}</b> </b-card-text>
		</div>
	  
		<div class="b-card-img" v-bind:style="{ backgroundImage: 'url(' + this.$attrs.img + ')' }">
		</div>
	  
      	<div>
			<b-button href="#" variant="outline-danger" size="lg" @click="addItem"> В корзину </b-button>
	    </div>
	  
	  	<div style="text-align: center; padding-top: 10%;">
			
			
	    	<b-btn variant="danger" size="lg" class="btn-circle" @click="num++">
				<b style="color: white">+</b></b-btn>
			<b-btn variant="outline-danger" size="lg" class="btn-circle" >
				<b style="color: red">{{ num }}</b></b-btn>
			<b-btn variant="danger" size="lg" class="btn-circle" @click="dec">
				<b style="color: white">–</b></b-btn>
			
		</div>
	  
    </b-card>
</template>

<script>
	
import { mapGetters, mapState } from 'vuex'
	
export default {
	
	data() {
      return {
        
		toggler: false,
		num: 1,
	    item: {}
      }
    },
	
	computed: {
	
		...mapGetters([
      		'SMALL', 'LARGE', 'ITEM_LIST', 'ITEM_LIST_LEN'
    	]),
	
		color () {
	
			var small_device = this.$store.getters.SMALL;
			if (small_device) { return "warning" }
	
			else { 
	
				var even = Number (this.$attrs.catId) % 2 === 0 ;	
				if (even) { this.toggler = true; }
	
        		return this.toggler ? '' : "warning";
			}
    	},
	},
	
	methods:  {
	
		dec () {
	
			if ( this.num == 0 || this.num < 0) { } 
			else { this.num -= 1; } 
		},
	
    	addItem () {
	
			this.item['title'] = this.$attrs.title;
			this.item['cat'] = this.$attrs.catTitle;
			this.item['price'] = this.$attrs.price;
			this.item['qty'] = this.num;
			this.item['productid'] = this.$attrs.productId;
											   
			//console.log ('item \n', Object.values( this.item ));
			this.$store.dispatch('addToCart', this.item);
    	}
	}
}
</script>
	


<style scoped>
	
.btn-circle {
	
    width: 30px;
    height: 30px;
    padding: 6px 0px;
    border-radius: 50%; /*15px*/
    text-align: center;
    font-size: 15px;
    line-height: 1.42857;
}
	
.yellow {
  
  bg-variant: warning;
}
	
.bcard {
  
  margin: auto;
  max-width: 25%;
}
	
.b-card-header {
	
  margin: auto;
  color: brown;
  padding-bottom: 5%;
}

.b-card-img {
	
  background-color: gray;
  background-size: cover;
  margin: auto;
  width: 70%;
  height: 150px; 
  margin-bottom: 10%;
}
	
.b-card-title {
  
  font-family: Michroma;
  color: brown;
  font-size: xx-small;
  font: bold;
  text-transform: uppercase;
}
	
.b-card-txt {
  
  margin: auto;
  max-width: 80%;
  padding-bottom: 5%;
}
</style>