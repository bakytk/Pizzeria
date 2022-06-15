<template>

		<b-container class="home-hero"
				 v-bind:style="{ background: 'url(' + imglink + ') no-repeat center' }">
		
			<div style="text-align: center;" >
				<p style="font-size: 30px; padding-top: 3%;"> Большой ассортимент пицц и суши</p>
			</div>
			<!--
			<div style="font-size: 25px; padding-left: 3%;">
				<p >Быстрая доставка, не дорого</p>
			</div>
			-->
	
    	</b-container>
	
</template>

<script>
	
import cart from '../components/Cart.vue';
	
import { mapGetters } from 'vuex'
	
export default {
	
	data: () => ({
    	urls: {}
  	}),
	
	created () {
		
		var token = '563492ad6f9170000100000180942959d8884968956c81ed519c1081'
		var imgid = 1566837
		var url = `https://api.pexels.com/v1/photos/${imgid}`
	
		this.$axios.get(url, 
			{headers: { 'Authorization': token } })
	
		.then(response => {
	
				this.urls = response.data.src;
				console.log ('URLs \n', response.data.src);
				  		
        }).catch((e) => {
          	console.error (e);
        });
    },
	
	computed: {
	
		imglink () {
		  return this.$mq === 'sm' ? this.urls.portrait : this.urls.large2x
		}
	}
};
</script>

<style scoped>
.home-hero {
	
	background-color: gray;
    background-size: cover;
    width: 100%;
    height: 700px;
	color: white;
	font-family: "Verdana", Geneva, sans-serif;
	font-weight: bold;
}
	
</style>