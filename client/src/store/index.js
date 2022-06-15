
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import cookie from 'vue-cookies'

import { catSorter, itemSublister } from '../mixins/utils'

import { bus } from '../main'

Vue.use(Vuex)

export default new Vuex.Store ({
	
  state: {
	  
	  loggedIn: false,
	  shop: '',
	  
	  device: '',
	  
	  categories: [],
	  catNames: [],
	  itemNames: [],
	  itemLists: [],
	  
	  user: {},
	  cart: [],
	  cartShow: false,
	  
	  serverStatus: 0, 		//in use ?? //addItem rut
	  successStatus: false, //in use ??
	  serverMsg: '',
	  
	  orderStatus: false,
	  orderMsg: '',
	  
	  orderQueue: [],
	  orderId: 0,
  },
	
  getters: {
	  
	  NONEMPTY_CART: state => () => {
		  
			return state.cart.length > 0 ? true : false ;
      },
	
   	  GET_CATEGORIES: state => {
     	return state.categories;
      },
	  
	  GET_CART: state => {
     	return state.cart;
      },
	  
	  SUBTOTAL: state => {
		  
     		var total = 0;
			var list = state.cart;
		  
			list.forEach ( (v) => {
	
				total += v.qty * v.price;
			});
	
      		return total;
      },
	  
	  SMALL: state => {
     	var device = state.device;
		return device === 'SMALL' ? true : false; 
      },
	  
	  LARGE: state => {
     	var device = state.device;
		return device === 'LARGE' ? true : false; 
      },
	  
	  GET_ORDERS: state => {
		  
		return state.orderQueue; 
	  },
  },
	
  mutations: {
							  
	  login (state) { state.loggedIn = true; },
	  logout (state) { state.loggedIn = false; },
		  
	  SET_SHOP (state, arg) {
      	state.shop = arg
      },
	  
	  SET_DEVICE (state, arg) {
		  
		if (arg==='mobile' || arg==='tablet') {state.device = 'SMALL'}
     	else if (arg==='laptop' || arg==='desktop') {state.device = 'LARGE'}
      },
	  
	  TOGGLE_CART_SHOW (state) {
      	state.cartShow = ! state.cartShow;
      },
	  
	  SET_CATEGORIES (state, list) {
		  
      	state.categories = list;
		var newarr =[];

		list.forEach ( (c, idx) => { 
			
			var jsn = {}
			var v = c.cat
			jsn['text'] = v
			jsn['value'] = v
			
			newarr.push (jsn)
				
			if (idx === list.length-1) {

				//console.log ('newarr \n', newarr);
				state.catNames = newarr;
			}
		})
		
      },
	  
	  SET_ITEMLISTS (state, arg) {
      	state.itemLists = arg
      },
	  
	  SET_ORDER (state, arg) {
      	state.orderQueue = arg
      },
	  
	  SET_ITEMS (state, cat) {
		  
		var lists = state.itemLists;
		//console.log ('lists \n', lists);
		var itemNames = []
	
		lists.forEach( (sublist) => {
			
			var elem = sublist[0];
			if (elem.cat === cat) {
				
				sublist.forEach( (s, idx) => {
				
					itemNames.push (s.title);
					
					if (idx === itemNames.length-1) {
						state.itemNames = itemNames;
					}
				});
			}
		});
      },
  },
	
  actions: {
	  
	  login (context) { context.commit('login')},
	  logout ({ commit }) { commit('logout') },
	  
	  setDevice (ctx, device ) {

        	ctx.commit('SET_DEVICE', device );
      },
	  
	  toggleCartShow (ctx) {

        	ctx.commit('TOGGLE_CART_SHOW');
      },
	  
	  loadData ({ commit }) {
		  
      	Vue.axios
        	.get('https://test-bot.club/sample', { params:  { shopname: 'samplepizza'} })
        	.then(r => r.data)
		  	.then( datalists => {
			
				//console.log ('datalists \n', datalists);
				//console.log ('datalists[1][0] \n', datalists[1][0]);
			
				var sortedCats = catSorter (datalists[0]); 
				var sortedItems = itemSublister (datalists[1], sortedCats);

				commit('SET_CATEGORIES', sortedCats );
				commit('SET_ITEMLISTS', sortedItems );
			
		  }).catch(err => { console.error ( err); });
    	},
			
		addToCart ({ commit, state }, item) {
		  
			//console.log ('item.length ', item.length);
			
		  		Vue.axios
        		   .post('https://test-bot.club/cart/add', item ) 
  				   .then(function (resp) {
					
						state.successStatus = resp.data.success;
						state.serverMsg = resp.data.message;
					
						bus.$emit('itemAdded');						 
				})
  				.catch(function (error) { console.log(error); });
		
		},
	  
	    getCart ({ commit, state }) {
		  
		  		Vue.axios
        		   .post('https://test-bot.club/cart/get') 
  				   .then(function (resp) {
					
						//console.log ('resp.data ', resp.data);
						state.cart = resp.data;						 
				})
  				.catch(function (error) { console.log(error); });
		
		},
	  
	   increment ({ commit, state }, productid ) {
			
		  Vue.axios
        		   .post('https://test-bot.club/cart/incr', 
						 { "productid": productid, "dir": 'plus'} ) 
  				   .then(function (resp) {

						state.cart = resp.data;	
				})
  				.catch(function (error) { console.log(error); });
        	
       },
	  
	   decrement ({ commit, state }, productid ) {
			
		  	Vue.axios
        		   .post('https://test-bot.club/cart/incr', 
						 { "productid": productid, "dir": 'minus'} ) 
  				   .then(function (resp) {

						state.cart = resp.data;	
				})
  				.catch(function (error) { console.log(error); });
        	
       },
	  
	   rm ({ commit, state }, productid ) {
		  
		  	//console.log ('rm pid ', productid);
			
		  	Vue.axios
        		   .post('https://test-bot.club/cart/del', 
						 { "productid": productid } ) 
  				   .then(function (resp) {
				
						state.cart = resp.data;	
					    //bus.$emit('cartUpdated');
				})
  				.catch(function (error) { console.log(error); });
        	
       },
	  
	   emptyCart ({ commit, state } ) {
			
		  	Vue.axios
        		   .post('https://test-bot.club/cart/empty' ) 
  				   .then(function (resp) {

						state.cart = resp.data;	
				})
  				.catch(function (error) { console.log(error); });
        	
       },
	  
	   checkout ({ commit, state } ) {
			
		  	Vue.axios
        		   .post('https://test-bot.club/cart/checkout' ) 
  				   .then(function (resp) {})
  				   .catch(function (error) { console.log(error); });
        	
       },
	  
	   sendOrder ({ commit, state }, usr) {
		   	  
      		Vue.axios
        		.post('https://test-bot.club/order', usr ) 
  				.then(function (resp) {

					state.orderStatus = resp.data.success;
				    state.orderMsg = resp.data.message;
				
					if (state.orderStatus) { state.cart = [] }
				})
		   		.then(function () {
    				
					bus.$emit('exitLead');						 
				})
  				.catch(function (error) { console.log(error); });
      },
	  
	  setOrder ({ commit}, jsnList) {

        	commit('SET_ORDER', jsnList);
      },
	  
	  setItems ({ commit}, cat) {

        	commit('SET_ITEMS', cat);
      },
	  
   }
})
