<template>
	
  <div style="padding-bottom: 10%;">
	<p/>
	<b-alert show variant="primary" v-if="show">{{alertMsg}}</b-alert>
	<p/>
	  
    <b-form @submit.prevent="onSubmit" @reset="onReset">
		
      <b-form-group id="group-1" label="E-mail:" description="" >
        <b-form-input
          class="form-input" v-model="form.email" type="email" required placeholder="name@yandex.com" />
      </b-form-group>

      <b-form-group id="group-2" label="Пароль:" label-for="input-2">
        <b-form-input
          class="form-input" v-model="form.pwd" type="password" required placeholder="Ваш пароль" />
      </b-form-group>

      <b-button type="submit" variant="info">Отправить</b-button>
      <b-button type="reset" variant="danger">Сбросить</b-button>
    </b-form>

  </div>
</template>

<script>	
	
import { bus } from '../main'
	
export default {
    data() {
      return { 
		form: { email: '', pwd: ''}, 
		show: false,
		alertMsg: ''
	}
    },
	
    methods: {
	
      onSubmit() {
	
		this.$axios.post('/login', { email: this.form.email,  pwd: this.form.pwd})
	
		.then(resp => { 
	
			if (resp.data.success == true) {
	
				this.$cookies.set('bothubco', resp.data.token);
				//console.log('token /n' + resp.data.token)
				//{ httpOnly: true, secure: true, name: "bothubco", value: resp.data.token });
	
	            this.$router.push('/Dashboard');
				bus.$emit ('exitLogin'); 
	            //this.$store.dispatch('login');
			}
			else { 
				this.alertMsg = resp.data.message;
				this.show = true;
			}
		}); 
      },
	
      onReset() {
	
        this.form.email = '';  
        this.form.pwd = '';
		this.show = false;
		this.alertMsg = ''
      }
    }
  }
</script>


<style>
	
.form-input {
	background-color: rgba(0,0,255,.1)
}
</style>
