<template>
	<div>
    <b-navbar toggleable="lg" type="light" variant="light">
		
    	<b-navbar-brand to="/" class="headerFont">Dolce Vita</b-navbar-brand>
		
		<b-navbar-nav v-if="LARGE">
			
			<b-nav-item v-for="category in categories" v-bind:key="category.id"
						v-bind:href="'/#' + category.cat"> {{ category.cat }} </b-nav-item>
			
		</b-navbar-nav>
		
		<b-navbar-nav align="center" v-if="LARGE">
			<b-nav-item :href="'/#' + 'menu'">
				<b-button variant="danger"> Просмотр меню</b-button>
			</b-nav-item>
		</b-navbar-nav>
		
		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			
			<b-navbar-nav class="ml-auto">
				
				<b-nav-item>
					<img src="https://img.icons8.com/bubbles/50/000000/red-shopping-basket.png"/>
					<a  @click="showCart" > Корзина ({{ cartLen  }}) </a>
					<b-modal ref="kart" size="md" hide-footer>
						 <cart @exitmd="hideCart"></cart>
  					</b-modal>
					<b-modal ref="lid" size="md" title="Оформление заказа" hide-footer>
						 <lead></lead>
  					</b-modal>
				</b-nav-item>
				
				<b-nav-item v-if="LARGE">
					<b-button variant="danger" to="#menu">8 (800) 200-30-00</b-button>
				</b-nav-item>
				
				<b-collapse id="nav-collapse" is-nav>	
    				<b-nav-item-dropdown text="Администратор" right>
						
          				<b-dropdown-item @click="showLog">Вход</b-dropdown-item>
						<b-modal ref="login" size="md" title="Вход в кабинет" hide-footer>
							<log></log>
  						</b-modal>
						
						<b-dropdown-item @click="showReg">Регистрация</b-dropdown-item>
						<b-modal ref="registr" size="md" title="Регистрация" hide-footer>
							<reg></reg>
  						</b-modal>
          				
          				<b-dropdown-item @click="showRestore">Восстановление</b-dropdown-item>
						<b-modal ref="restore" size="md" title="Восстановление аккаунта" hide-footer>
							<restore></restore>
  						</b-modal>
						
    				</b-nav-item-dropdown>
					
				</b-collapse>	
    		</b-navbar-nav>
		
  	</b-navbar>
	</div>
</template>

<script>
	
import cart from '../components/Cart.vue'
import lead from '../components/Lead.vue';
import reg from '../components/Reg.vue';
import log from '../components/Login.vue';
import restore from '../components/Restore.vue';
	
import { mapGetters, mapState } from 'vuex'

import { bus } from '../main'

export default {
	
	data() {
      return {

      }
    },
	
	components: {
        cart,
		lead,
		reg,
		log,
		restore
    },
	
	methods: {
	
      	showCart() { this.$refs['kart'].show(); },
		showReg() { this.$refs['registr'].show(); },
		showLog() { this.$refs['login'].show(); },
		showRestore() { this.$refs['restore'].show(); },
	
		hideCart ()  {
	
        	this.$refs.kart.hide();
			this.$refs.lid.show();
      	},
	
		
	
	},
	
    computed: {
	
		...mapGetters([
      		'SMALL', 'LARGE'
    	]),
	
		...mapState([
      		'categories',
    	]),

		categories () {
    		return this.$store.state.categories; 
  		}, 
	
		cartLen () {
    		return this.$store.state.cart.length; 
  		},
  	},
	
	mounted () {
	
		bus.$on('exitLead', () => {

			this.$refs['lid'].hide();

	        var status = this.$store.state.orderStatus;	
			var msg = this.$store.state.orderMsg;
			var type = status ? "success" : "warning";
	
			this.$fire ({

				text: msg,
  				type: type,
				confirmButtonColor: "#dc3545",
			});

		}); 
		
		bus.$on('exitLogin', () => {
	
        	this.$refs['login'].hide();
      	});
	
	}
}
</script>

<style scoped>
	
.headerFont { 
	font-family: Michroma; 
}
	
</style>
