<template>
  <div >
	  
	<p/>
	  	<!-- style="width: 360px;" -->
	  
		<b-alert show variant="primary" v-if="showAlert">
			{{alertMsg}} </b-alert>
	<p/>
	  
	<b-form @submit.prevent="onSubmit" >
		
      <b-form-group label="Ваше имя:" description=""
					label-cols-md="3">
        <b-form-input
          class="form-input" v-model="name" type="text" />
      </b-form-group>
		
	  <b-form-group label="Телефон:" description="Вводите 10 последних цифр" required
					label-cols-md="3" placeholder="Обязательное поле">	  
		<vue-tel-input class="form-input" v-model="phone" v-bind="bindProps"></vue-tel-input>
      </b-form-group>
		
	  <b-form-group label="Адрес доставки:" description="" label-cols-md="4" required>
        <b-form-input
          class="form-input" v-model="address" type="text" 
					  placeholder="Улица (мкр), № дома (до 50 символов)" />
      </b-form-group>
		
	  <b-form-select v-model="payment" 
					 :options="options" class="form-input" ></b-form-select>

	  <div style="padding-top: 5%;">
  		<b-row cols="1" cols-sm="4" cols-md="4" cols-lg="4">
    		<b-col>К оплате: </b-col>
    		<b-col> <b>{{ SUBTOTAL }}</b> тенге</b-col>
  		</b-row>
	  </div>
	 
	  <br/>
	  <div class="button">
		<b-button type="submit" variant="danger" size="md"> 
			Отправить заказ </b-button>
	  </div>
    </b-form>
	  
	
	  
  </div>
</template>

<script>
	
import { mapGetters } from 'vuex';
	
export default {
	
  data() {
      return {
	
		showAlert: false,
		alertMsg: '',
	
        name: '',
		phone: '',
		address: '',
		payment: '',
	
		bindProps: {
        	mode: "international",
			defaultCountry: "KZ",
			required: true,
			enabledCountryCode: false,
			onlyCountries: ['RU', 'KZ'],
			placeholder: 'Обязательное поле'
		},
	
		options: [
          { value: '', text: 'Выберите способ оплаты' },
          { value: 'card', text: 'Банковская карта' },
          { value: 'cash', text: 'Наличными курьеру', disabled: false },
        ]
      }
    },
	
  computed: {
	
		... mapGetters (['GET_CART', 'SUBTOTAL']),
  },

  methods: {
	
	
	    onSubmit() {
		
			var str = '';
	
			if (this.phone.length < 10 ) {
										   
				str = 'Номер указан не полностью';
				this.alertMsg = str;
				this.showAlert = true;
			}
	
			else if (this.address.length > 50 || this.address.length < 5 ) {
			
		    	if (this.address.length > 50 ) { str = 'Строка адреса - не более 50 символов'}
				else if (this.address.length < 5)	{ str = 'Адрес слишком короткий'}
										  
				this.alertMsg = str;
				this.showAlert = true;
			}
							  
			else {
												 
				var data = 	{};

		    	data ['platform'] = 'web';
				data ['name'] = this.name;
				data ['phone'] = this.phone;
				data ['address'] = this.address;
				data ['payment'] = this.payment; //JSON.stringify ();		 							 
				this.$store.dispatch('sendOrder', data);
			}}
      },
};
</script>

<style scoped>
	
.button {
	
  backround-color: grey;
  margin: auto;
  /* max-width: 25%; */
}
	
.form-input {
	background-color: rgba(0,0,255,.1) /*width: 360px;*/
}
	
</style>