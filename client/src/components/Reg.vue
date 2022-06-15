<template>
  <div >
	  
	<p/>
		<b-alert show variant="primary" v-if="showAlert">
			{{alertMsg}} </b-alert>
	<p/>
	  
	<b-form @submit.prevent="onSubmit" @reset="onReset" v-if="general">
		
	  <b-form-group label="Ваше имя:" description="" label-cols-md="3">
      	<b-form-input class="form-input" v-model="name" type="text"/>
      </b-form-group>
		
      <b-form-group label="E-mail:" description="" label-cols-md="3">
        <b-form-input class="form-input" v-model="email" type="email" 
					  placeholder="name@mail.ru" required/>
      </b-form-group>
		
	  <b-form-group label="Сотовый:" description="Вводите 10 последних цифр"
					label-cols-md="3" placeholder="Обязательное поле">	  
		<vue-tel-input class="form-input" v-model="phone" v-bind="bindProps"></vue-tel-input>
      </b-form-group>
		
		
	  <b-form-group label="Пароль:" label-cols-md="3"
					description="Cлитно: латинские буквы или цифры (6-10 символов)">
        <b-form-input class="form-input" v-model="pwd" type="password" 
					  placeholder="Ваш пароль"/>
      </b-form-group>
		
	  <b-form-group label="Подтвердите пароль:" label-cols-md="3" >
        <b-form-input class="form-input" v-model="pwd2" type="password" 
					  placeholder="Повторите пароль"/>
      </b-form-group>
		
	  <b-form-group label="Название магазина:" label-cols-md="3"
					description="Cлитно: латинские буквы или цифры (5-20 символов)">
        <b-form-input class="form-input" v-model="shop" type="text" 
					  placeholder="Магазин ABC" />
      </b-form-group>
		
	  <b-form-select v-model="selected" :options="options" class="form-input" ></b-form-select>
	 
	  <br/>
	  <br/>
	  <b-button type="submit" variant="danger">Отправить</b-button>
      <b-button type="reset" variant="info">Сбросить</b-button>
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
		general: true,
	
		name: '',
        email: '',
	    phone: '',
		pwd: '',
		pwd2: '',
		shop: '',
		selected: '',
	
		bindProps: {
        	mode: "international",
			defaultCountry: "KZ",
			required: true,
			enabledCountryCode: false,
			onlyCountries: ['RU', 'KZ'],
			placeholder: 'Обязательное поле'
		},
	
		options: [
          { value: '', text: 'Выберите категорию магазина' },
          { value: 'flower', text: 'Цветочный магазин' },
          { value: 'barber', text: 'Салон красоты/Барбершоп', disabled: true },
          { value: 'food', text: 'Доставка еды', disabled: false },
		  { value: 'other', text: 'Иное', disabled: false },
        ]
      }
    },
	
  computed: {
  },

  methods: {
	
	
	    onSubmit() {
		
			var str = '';
	
			if (this.name.length == 0 ) { 
				this.alertMsg = 'Укажите Ваше имя'; this.showAlert = true;}
	
			else if (this.email.length == 0 ) { 
				this.alertMsg = 'Email не указан'; this.showAlert = true;}
	
			else if (this.phone.length < 10 ) { 
				this.alertMsg = 'Номер указан не корректно, повторите ввод'; this.showAlert = true;}
	
			else if (this.pwd.length == 0 ||  this.pwd2.length == 0) { 
				this.alertMsg = 'Oдно из паролей не указан'; this.showAlert = true;}
	
			else if (this.pwd != this.pwd2 ) { 
				this.alertMsg = 'Введенные пароли не совпадают'; this.showAlert = true;}
	
			else if (this.shop.length == 0 ) { 
				this.alertMsg = 'Название магазина не введено'; this.showAlert = true;}
							  
			else {
										   
				this.$axios.post('/register', { 
										   
					name: this.name,
					email: this.email, 
					phone: this.phone,
					pwd: this.pwd,
					shop: this.shop,  
					category: this.selected,
				})
				.then(resp => { 
	
					if (resp.data.success) this.general = false;
					this.alertMsg = resp.data.message;
					this.showAlert = true;
				});  						   					   
			}
		},
	
		onReset() {
	
        	this.name = '';
        	this.email = '';
			this.phone = '';
        	this.pwd = '';
			this.pwd2 = '';
			this.shop = '';
        	this.selected = '';
			this.showAlert = false;
			this.general = true;
			this.alertMsg = ''
      	}
   },
};
</script>

<style scoped>
	
.form-input {
	background-color: rgba(0,0,255,.1)
}
	
</style>