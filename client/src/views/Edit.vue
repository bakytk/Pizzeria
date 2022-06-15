<template>
  <div >
	  
	<p/>
		<b-alert show variant="primary" v-if="alert.show"> {{alert.msg}} </b-alert>
	<p/>
	  
	<b-form ref="Form" @submit.prevent="onSubmit" @reset="onReset" v-if="toggler.general">
		
		
      <!-- ---------------------- # CHOOSE ACTION # ------------------------------ -->
		
	  <b-form-group label="Шаг 1: " label-cols-md="2" class="col-md-7"
					description="Выберите предмет изменения">
        <b-form-select v-model="payload.target.object" :options="objectOptions" 
					   class="form-input" required>
		</b-form-select>
      </b-form-group>
		
      <b-form-group label="" label-cols-md="2" class="col-md-7"
					description="Выберите действие" >
        <b-form-select v-model="payload.target.action" :options="actionOptions" 
					   class="form-input" required>
		</b-form-select>
      </b-form-group>
		
      <!-- ---------------------- # ADD CATEGORY # --------------------------------- -->
		
	  <b-form-group label="Шаг 2: " label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.cat.add"
					description="Введите название новой категории">
        <b-form-input class="form-input" v-model="payload.add.category.name" 
					  type="text" required/>
      </b-form-group>
		
	  <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.cat.add"
					description="Ранг категории в списке: введите целое число">
        <b-form-input class="form-input" v-model="payload.add.category.rank" 
					  type="number" min="1" required/>
      </b-form-group>
		
	 <!-- ---------------------- # CHG - CATEGORY # --------------------------------- -->
		
	  <b-form-group label="Шаг 2: " label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.cat.chg.step2"
					description="Выберите категорию для редактирования" >
        <b-form-radio-group class="form-input" v-model="payload.chg.category.name"
        		:options="catNames" required>
		</b-form-radio-group>
      </b-form-group>
		
	  <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.cat.chg.step2"
					description="Выберите атрибут редактирования" >
        <b-form-radio-group class="form-input" v-model="payload.chg.category.attribute"
        		:options="catAttributes" required>
		</b-form-radio-group>
      </b-form-group>
		
	  <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.cat.chg.rank"
					description="Введите новое значение">
        <b-form-input class="form-input" v-model="payload.chg.category.newValue" 
					  type="number" min="1" required/>
      </b-form-group>
		
	  <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.cat.chg.name"
					description="Введите новое значение">
        <b-form-input class="form-input" v-model="payload.chg.category.newValue" 
					  type="text" required/>
      </b-form-group>
		
	  <!-- ---------------------- # DEL CATEGORY # --------------------------------- -->
		
	  <b-form-group label="Шаг 2: " label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.cat.del"
					description="Выберите категорию для удаления" >
        <b-form-radio-group class="form-input" v-model="payload.del.category.name"
        		:options="catNames" required>
		</b-form-radio-group>
      </b-form-group>
		
		
	  <!-- ---------------------- # ADD ITEM # --------------------------------- -->
		
	  <b-form-group label="Шаг 2: " label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.add"
					description="Выберите категорию, в которую добавляем товар">
        <b-form-radio-group class="form-input" v-model="payload.add.item.cat" 
					  :options="catNames" required>
		</b-form-radio-group>
      </b-form-group>
		
	  <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.add"
					description="Название, добавляемого товара">
        <b-form-input class="form-input" v-model="payload.add.item.title" 
					  type="text" required/>
      </b-form-group>
		
	  <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.add"
					description="Описание нового товара">
        <b-form-input class="form-input" v-model="payload.add.item.des" 
					  type="text" required/>
      </b-form-group>
		
      <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.add"
		  description="Цена товара: введите целое число без точек, запятых и других знаков препинания">
        <b-form-input class="form-input" v-model="payload.add.item.price" 
					  type="text" required/>
      </b-form-group>
	
	  
      <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.add">
        <b-form-file v-model="photo" class="mt-3" 
					 browse-text="Выбрать"
					 placeholder="Выберите фото: .jpg, .png, .gif, .jpeg, .bmp, .svf"
					 accept=".jpg, .png, .gif, .jpeg, .bmp, .svf"
					 required></b-form-file>
					  
      </b-form-group>
		

		
	  <!-- ---------------------- # CHG - ITEM # --------------------------------- -->
		
	  <b-form-group label="Шаг 2: " label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.chg.step2"
					description="Выберите категорию, в которой редактируется товар" >
        <b-form-radio-group class="form-input" v-model="payload.chg.item.cat"
        		:options="catNames" required>
		</b-form-radio-group>
      </b-form-group>
		
	  <b-form-group label="Шаг 3:" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.chg.step3"
					description="Товар, атрибут которого редактируется" >
        <b-form-radio-group class="form-input" v-model="payload.chg.item.title"
        		:options="itemNames" required>
		</b-form-radio-group>
      </b-form-group>
		
      <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.chg.step3"
					description="Выберите изменяемый атрибут товара" >
        <b-form-radio-group class="form-input" v-model="payload.chg.item.attribute"
        		:options="itemAttributes" required>
		</b-form-radio-group>
      </b-form-group>
		
	  <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.chg.txt"
					description="Введите новое значение атрибута">
        <b-form-input class="form-input" v-model="payload.chg.item.newValue" 
					  type="text" required/>
      </b-form-group>
		
	 
	  <b-form-group label="" label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.chg.img">
        <b-form-file v-model="photo" class="mt-3" 
					 browse-text="Выбрать"
					 placeholder="Выберите фото: .jpg, .png, .gif, .jpeg, .bmp, .svf"
					 accept=".jpg, .png, .gif, .jpeg, .bmp, .svf"
					 required></b-form-file>
					  
      </b-form-group>
	  
		
	  <!-- ---------------------- # DEL - ITEM # --------------------------------- -->
		
	  <b-form-group label="Шаг 2: " label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.del.step2"
					description="Выберите категорию, из которой удаляется товар" >
        <b-form-radio-group class="form-input" v-model="payload.del.item.cat"
        		:options="catNames" required>
		</b-form-radio-group>
      </b-form-group>
		
	  <b-form-group label="Шаг 3: " label-cols-md="2" class="col-md-7"
					v-if="toggler.nextStep.item.del.step3"
					description="Выберите удаляемый товар" >
        <b-form-radio-group class="form-input" v-model="payload.del.item.title"
        		:options="itemNames" required>
		</b-form-radio-group>
      </b-form-group>
      
	
	  <!-- ---------------------- # FORM END # --------------------------------- -->
	  
	  <br/>
	  <p>
		  <b-button type="submit" variant="info"> Продолжить </b-button>
		  <b-button type="reset" variant="danger"> Очистить  </b-button>
	  </p>
	  <br/>
		
    </b-form>
	  
	
	  
  </div>
</template>

<script>
	
import { mapGetters, mapState } from 'vuex';	
	
function initialState (){
  return {
    alert: {
	
			show: false,
			msg: '',
		},
	
		photo: null,
	
		toggler: {

			general: true,
	
			nextStep: {
	
				item: {
	
					add: false,
					chg: {
						step2: false,
						step3: false,
						txt: false,
						img: false,
					},
					del: {
						step2: false,
						step3: false,
					},
				},
				cat: {
					
					add: false,
					chg: {
						step2: false,
						name: false,
						rank: false,
					},
					del: false,
				},
			},
	
			lastStep: false,
		},
	
	
		payload: {
	
			target: {

				object: '',
				action: '',
			},

			add: {

				category: {
					name: '',
					rank: '',
				},
				item: {
					title: '',
					cat: '',
					des: '',
					price: '',
				},
			},

			chg: {

				category: {
					name: '',
					attribute: '',
					newValue: '',
				},
				item: {
					cat: '',
					title: '',
					attribute: '',
					newValue: '',
				},
			},

			del: {

				category: {
					name: '',
				},
				item: {
					title: '',
					cat: '',	
				},
			},
		},
	
	    catAttributes: [
          { value: 'name', text: 'Название' },
          { value: 'rank', text: 'Ранг'},
        ],
	
	    itemAttributes: [
          { value: 'title', text: 'Название' },
          { value: 'des', text: 'Описание' },
		  { value: 'price', text: 'Цена' },
		  { value: 'img', text: 'Фото' },
        ],
	
		objectOptions: [
          { value: 'category', text: 'Категория' },
          { value: 'item', text: 'Товар', disabled: false },
        ],
	
		actionOptions: [
          { value: 'add', text: 'Добавить' },
          { value: 'chg', text: 'Изменить' },
		  { value: 'del', text: 'Удалить' },
        ],
  }
}
	
export default {
	
  data() {
	
      return initialState();
   },
	
  computed: {
	
		//...mapGetters(['GET_ITEMNAMES']),
		...mapState([ 'itemLists', 'catNames', 'itemNames' ]), 
	
  },

   methods: {
	
	    onSubmit() {
	
			if ( ! this.toggler.lastStep ) {
	
				// Step 1
	
				if (this.payload.target.object === '' ) { 
					this.alert.msg = 'Выберите предмет изменений'; this.alert.show = true;}
	
				else if (this.payload.target.action === '' ) { 
					this.alert.msg = 'Выберите действие'; this.alert.show = true;}
										   
				else { 
	
					// Step 2: category-add ------------------------------------------------
					// ======================================================================
	
					if (this.payload.target.object === 'category' 
							&& this.payload.target.action === 'add' ) {

						this.toggler.lastStep = true;
						this.toggler.nextStep.cat.add = true;

					}
	
					// Step 2: category-del -------------------------------------------------
					// ======================================================================
	
					else if (this.payload.target.object === 'category' 
							&& this.payload.target.action === 'del' ) {
	
						this.toggler.lastStep = true;
						this.toggler.nextStep.cat.del = true;
					}
	
					// Step 2: category-chg --------------------------------------------------
					// =======================================================================
	
					else if (this.payload.target.object === 'category' 
							&& this.payload.target.action === 'chg' ) {
	
						this.toggler.nextStep.cat.chg.step2 = true;
	
						if (this.payload.chg.category.attribute === 'name') {
	
							this.toggler.nextStep.cat.chg.name = true;
							this.toggler.lastStep = true;
						}
						else if (this.payload.chg.category.attribute === 'rank') {
	
							this.toggler.nextStep.cat.chg.rank = true;
							this.toggler.lastStep = true;
						}
					}
	
					// Step 2: item-add -----------------------------------------------------
					// ======================================================================
	
					else if (this.payload.target.object === 'item' 
							&& this.payload.target.action === 'add' ) {
	
						this.toggler.lastStep = true;
						this.toggler.nextStep.item.add = true;
					}
	
					// Step 2: item-chg -----------------------------------------------------
					// ======================================================================
	
					else if (this.payload.target.object === 'item' 
							&& this.payload.target.action === 'chg' ) {
	
						this.toggler.nextStep.item.chg.step2 = true;
	
						if (this.payload.chg.item.cat === '') {
							
							this.alert.msg = 'Выберите категорию'; this.alert.show = true;
						} else  {
	
							this.alert.msg = ''; this.alert.false = true;
	
							var cat = this.payload.chg.item.cat;
							this.$store.dispatch('setItems', cat);
	
							this.toggler.nextStep.item.chg.step3 = true;
	
							if (this.payload.chg.item.attribute === 'title' ||
									this.payload.chg.item.attribute === 'des' ||
									this.payload.chg.item.attribute === 'price' ) {

								this.toggler.nextStep.item.chg.txt = true;
								this.toggler.lastStep = true;
							}
							else if (this.payload.chg.item.attribute === 'img') {

								this.toggler.nextStep.item.chg.img = true;
								this.toggler.lastStep = true;
							}
						}
					} //item-chg
	
					// Step 2: item-del -----------------------------------------------------
					// ======================================================================
	
					else if (this.payload.target.object === 'item' 
							&& this.payload.target.action === 'del' ) {
	
						this.toggler.nextStep.item.del.step2 = true;
	
						if (this.payload.del.item.cat === '') {
							
							this.alert.msg = 'Выберите категорию'; this.alert.show = true;
						} else  {
	
							this.alert.msg = ''; this.alert.false = true;
	
							var cat = this.payload.del.item.cat;
							this.$store.dispatch('setItems', cat);
	
							this.toggler.nextStep.item.del.step3 = true;
							this.toggler.lastStep = true;
						}
	
					}//item-del
	
					// Step 2: END ----------------------------------------------------------
					// ======================================================================
				
				} //else	
			} //if
	
			else { 
	
					const options = {
  						headers: { 
							'Authorization': this.$cookies.get('bothubco'),
							'Content-Type': 'multipart/form-data'
						},
					};
	
					const obj = this.payload.target.object;
					const act = this.payload.target.action;
					//console.log('this.photo \n', this.photo );
	
					const fd = new FormData();
					fd.append ('object', obj);
					fd.append ('action', act);
					fd.append ('update', JSON.stringify (this.payload[act][obj]) );
					fd.append ('img', this.photo);
	
					this.$axios.post('/edit', fd, options)
					.then(resp => { 
	
						Object.assign(this.$data, initialState());
						this.alert.msg = resp.data.message; this.alert.show = true;
	
					}).catch(function (error) { console.log(error); })	
				}
		},	
	
		onReset() {
	
			Object.assign(this.$data, initialState());
      	}
   },
};
</script>

<style scoped>
	
.form-input {
	background-color: rgba(0,0,255,.1)
}
	
</style>