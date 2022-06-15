<template>
  <div style="padding-bottom: 10%;">
	 
	<b-alert show variant="primary" v-if="show">{{alertMsg}}</b-alert>
	  
    <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="general">
		
	  <p> Для восстановления пароля введите e-mail: </p>
		
      <b-form-group description="ВНИМАНИЕ: ответ сервера может занять 3-5 секунд">
        <b-form-input
          class="form-input" v-model="email" type="email" required placeholder="name@mail.ru" />
      </b-form-group>
		
      <b-button type="submit" variant="info">Отправить</b-button>
      <b-button type="reset" variant="danger">Сбросить</b-button>
    </b-form>

  </div>
</template>

<script>	
	
export default {
    data() {
      return { 
		email: '', 
		general: true,
		show: false,
		alertMsg: ''
	}
    },
	
    methods: {
	
      onSubmit() {
		this.$axios.post('/restore', { 
			email: this.email,  
		})
		.then(resp => { 
			if (resp.data.success) this.general = false;
			this.alertMsg = resp.data.message;
			this.show = true;
		}); 
      },
	
      onReset() {
        this.email = '';  // Reset our form values
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
