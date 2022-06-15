import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
})

export const bus = new Vue();

import VueSimpleAlert from "vue-simple-alert";
Vue.use (VueSimpleAlert);

import Vuelidate from 'vuelidate'
Vue.use (Vuelidate)

import VueTelInput from 'vue-tel-input'
Vue.use (VueTelInput)

import VueCookies from 'vue-cookies';
Vue.use (VueCookies);

import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue);
Vue.config.productionTip = true;

import axios from 'axios';
import vuex from 'vuex';
import Vueaxios from 'vue-axios';
Vue.use(Vueaxios, axios);

const axiosConfig = {

	baseURL: 'https://test-bot.club',
	timeout: 30000,
};
Vue.prototype.$axios = axios.create(axiosConfig)

new Vue({
  router,
  store,
  axios,
  render: function (h) { return h(App) }
}).$mount('#app')