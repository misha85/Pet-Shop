<template>
	<div class="container">
		<div class="row">
			<h1 class="article-title"><i>Dodaj artikal</i></h1>
		</div> <!-- row -->
		<div id="new-article">
			<!-- =================  CATEGORIES  AND  GROUPS  ================== -->
			<div class="row">
				<div class="cat col-md-5 col-sm-5 col-xs-12">
					<select v-model="selectedCategory" class="custom-select">
						<option hidden>Izaberite kategoriju</option>
						<option v-for="category in categories" :value="category.cat_id">{{ category.cat_name }}</option>
					</select>
				</div> <!-- .col-5 -->
				<div class="grp offset-md-2 col-md-5 offset-sm-2 col-sm-5 col-xs-12">
					<select v-model="selectedGroup" class="custom-select" :disabled="selectedCategory === 'Izaberite kategoriju'">
						<option hidden>Izaberite grupu</option>
						<option v-for="group in groups" :value="group.grp_id">{{ group.grp_name }}</option>
					</select>
				</div> <!-- .offset-2 .col-5 -->
			</div> <!-- .row -->
			<!-- =================  NAME  AND  PRICE  ================== -->
			<div class="row">
				<div class="name col-md-5 col-sm-5 col-xs-12">
					<input type="text" v-model="name" class="form-control" placeholder="Naziv artikla">
				</div> <!-- .col-5 -->
				<div class="price offset-md-2 col-md-5 offset-sm-2 col-sm-5 col-xs-12">
					<input type="number" v-model="price"  min="1" class="form-control" placeholder="Cena artikla">
				</div> <!-- .col-5 -->
			</div> <!-- .row -->
			<!-- =================  DISCOUNT  ================== -->
			<div class="row">
					<div class="col-md-5 col-sm-12 col-xs-12">
						<small>Broj artikala na početnoj strani <strong :class="'critical'">{{ count_art_home }}/12</strong></small>
						<div class="input-group-text">
							<label for="home">Stavi artikal na pocetnu stranu</label>
							<input v-model="art_home" id="home" type="checkbox" aria-label="Checkbox for following text input" :disabled=isDisabled>
						</div>
						<div class="input-group-text">
							<label for="discount">Promo cena</label>
							<input v-model="discount" id="discount" type="checkbox" aria-label="Checkbox for following text input">
						</div>
					</div>
					<div v-if="discount" class="offset-md-2 col-md-5 offset-sm-2 col-sm-5 col-xs-12">
						<div class="discount">
							<datepicker
								:bootstrap-styling="true"
								@selected="setStartDiscount"
								language="sr"
								placeholder="Pocetak akcije"
								:monday-first="true"
								:full-month-name="true"
							></datepicker>
						</div>

						<div class="discount">
							<datepicker
								:bootstrap-styling="true"
								@selected="setEndDiscount"
								language="sr"
								placeholder="Kraj akcije"
								:monday-first="true"
								:full-month-name="true"
							></datepicker>
						</div>

						<div v-if="discount" class="range">
						  <input type="range" step="5" max="90" v-model="discountValue">
						  Iznos akcije {{ discountValue }}%
						</div>

					</div>
			</div>
				<!-- =================  EDITOR  ================== -->
				<div class="clear"></div>
				<vue-editor v-model="description" class="form-control editor" placeholder="opis..." :editorToolbar="customToolbar"></vue-editor>

				<div class="image">
					<picture-input
					ref="pictureInput"
					:crop="false"
					@change="onChanged"
					@remove="onRemoved"
					:width="400"
					:zIndex="0"
					size="1"
					:removable="true"
					removeButtonClass="btn btn-secondary"
					:height="200"
					accept="image/jpeg, image/png, image/gif"
					buttonClass="btn btn-info"
					:customStrings="{
					upload: '<h1>Upload it!</h1>',
					drag: 'Kliknite ili prevucite novu sliku',
					change: 'Promeni sliku',
					remove: 'Ukloni sliku',
					tap: 'Kliknite ili prevucite novu sliku',
					fileSize: 'Odabrana slika je prevelika'
				}">
			</picture-input>
		</div> <!-- .image -->

		<div class="row">
			<div class="buttons col-md-2 col-sm-2 col-xs-12">
				<router-link to="/artikli" tag="button" class="btn btn-warning">
					Nazad
				</router-link>
			</div> <!-- .col-2 -->
			<div class="buttons col-md-2 offset-md-8 col-sm-2 offset-sm-6 col-xs-12">
				<button type="button" class="button btn btn-success" @click="attemptUpload">Dodaj artikal</button>
			</div> <!-- .offset-8 .col-2 -->
		</div> <!-- .row -->
	</div> <!-- #new-article -->

	<!-- Modal -->
	<div class="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalLabel">Dodaj artikal</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <p v-if="failed">Niste popunili sva polja</p>
	        <p v-if="success">Artikal je uspesno sacuvan</p>
	        <p v-if="serverCrashed">
	        	Dogodilo se nešto nepredviđeno ali već radimo na otklanjanju greške.
						<br><br>
						Probajte ponovo za neko vreme.
	        </p>
	      </div>
	      <div class="modal-footer">
	      	<button v-if="failed" data-dismiss="modal" class="btn btn-info">Probaj opet</button>
	      	<button v-if="failed" @click="nextTime" class="btn btn-secondary">Drugi put</button>
	      	<button v-if="serverCrashed" @click="crashServer" class="btn btn-warning">U redu</button>
	        <button v-if="success" class="btn btn-info" @click="redirect" data-dismiss="modal">U redu</button>
	      </div>
	    </div>
	  </div>
	</div>
</div>
</template>

<script>
	import axios from 'axios';
	import PictureInput from 'vue-picture-input';
	import { VueEditor } from 'vue2-editor';
	import Datepicker from 'vuejs-datepicker';
	import moment from 'moment'
	import { eventBus } from '../../../main';

	export default{
		components: {
			VueEditor,
			PictureInput,
			Datepicker
		},
		data() {
			return {
				categories: [],
				selectedCategory: 'Izaberite kategoriju',
				groups: [],
				selectedGroup: 'Izaberite grupu',
				name: '',
				price: '',
				description: '',
				image: '',
				discount: false,
				state: {},
				discountValue: 0,
				userStatus: 0,
				failed: false,
				success: false,
				serverCrashed: false,
				art_home: false,
				count_art_home: '',
				isDisabled: false,
				customToolbar: [
				[{ 'header': [false, 2, 3, 4, 5, 6, ] }],
				['bold', 'italic', 'underline', 'strike'],
				[{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
				[{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
				[{ 'indent': '-1'}, { 'indent': '+1' }],
				[{ 'color': [] }, { 'background': [] }],
				['link']
				]
			}
		},
		created(){
			axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/add-products', {
				params: {
					part: 'cat'
				}
			})
			.then( response => {
				this.art_home = response.data.q[0].art_home;
				this.count_art_home = response.data.q[0].count_art_home;
				this.categories = response.data.categories;
				if(this.count_art_home >= 12)
					this.isDisabled = true;
			})
			if (localStorage.getItem('sid')) {
				axios.get('http://praksa3.mars-t.mars-hosting.com/api/login/check-session', {
					params: {
						sid: localStorage.getItem('sid')
					}
				}).then( response => {
					if(response.data.userId){
						this.userStatus = response.data.userStatus;
						console.log(this.userStatus);
					}
				});
				eventBus.$on('userLogin', korisnik => {
					this.userStatus = korisnik.usr_status;
				})
			} else{
				this.$router.push('/');
			}
		},
		watch: {
			selectedCategory(){
				if(this.selectedCategory !== 'Izaberite kategoriju'){
					axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/add-products', {
						params: {
							part: 'grp',
							catId: this.selectedCategory
						}
					})
					.then( response => {
						this.groups = response.data.groups;
					})
				}
			}
		},
		methods: {
			setStartDiscount(value){
				 this.state.startDiscount = moment(value).format('YYYY-MM-DD');
				 console.log(this.state.startDiscount);
			},
			setEndDiscount(value){
				this.state.endDiscount = moment(value).format('YYYY-MM-DD');
				 console.log(this.state.endDiscount);
			},
			onChanged (image) {
				if (this.$refs.pictureInput.file) {
					this.image = this.$refs.pictureInput.file;
				} else {
					console.log('Error');
				}
			},
			onRemoved(){
				this.image = '';
			},
			attemptUpload(){
				let formData = new FormData();
				formData.append('group', this.selectedGroup);
				formData.append('name', this.name);
				formData.append('price', this.price);
				formData.append('discount', this.discount);
				formData.append('startDiscount', this.state.startDiscount);
				formData.append('endDiscount', this.state.endDiscount);
				formData.append('discountValue', this.discountValue);
				formData.append('description', this.description);
				formData.append('image', this.image);
				if(this.art_home == true) {
					this.art_home = 1;
        } else {
           this.art_home = 0;
        }
        formData.append('art_home', this.art_home);
				if (this.discount === false || this.discount === 0) {
					this.discount = 0;
					if (this.selectedGroup == '' || this.name == '' || this.price == '' || this.description == '' || this.image == '') {
						this.success = false;
						this.failed = true;
					} else{
						this.failed = false;
						this.success = true;
						axios.post('http://praksa3.mars-t.mars-hosting.com/api/admin/add-products', formData)
						.then( response => {
							if (response.data.message === 'failed') {
								this.failed = true;
								this.success = false;
							} else if(response.data.message === 'success') {
								this.success = true;
								this.failed = false;
							}
							console.log(response.data.img);
						})
						.catch( error => {
							this.success = false;
							this.failed = false;
							this.serverCrashed = true;
						})
					}
				} else if (this.discount === true || this.discount === 1){
					this.discount = 1;
					if (this.selectedGroup == '' || this.name == '' || this.price == '' || this.description == '' || this.image == '' || this.state.startDiscount === undefined || this.state.endDiscount === undefined || this.discountValue === 0) {
						this.success = false;
						this.failed = true;
					} else{
						this.failed = false;
						this.success = true;
						axios.post('http://praksa3.mars-t.mars-hosting.com/api/admin/add-products', formData)
						.then( response => {
							if (response.data.message === 'failed') {
								this.failed = true;
								this.success = false;
							} else if(response.data.message === 'success') {
								this.success = true;
								this.failed = false;
							}
						})
						.catch( error => {
							this.success = false;
							this.failed = false;
							this.serverCrashed = true;
						})
					}
				}
				$('#addProduct').modal('show');
			},
			redirect(){
				this.success = false;
				this.$router.push('/artikli');
			},
			nextTime(){
				$('#addProduct').modal('hide');
				this.$router.push('/artikli');
			},
			crashServer(){
				this.serverCrashed = false;
				$('#addProduct').modal('hide');
				this.$router.push('/artikli');
			},
		}
	}
</script>

<style scoped>
	.article-title{
		margin: 20px auto;
		color: #28a745;
	}
	#new-article{
		margin-bottom: 20px;
		padding: 30px;
		background: #fff;
		border-radius: 10px;
	}
	.cat,
	.grp,
	.name,
	.price{
		margin-bottom: 20px;
	}
	select{
		text-transform: capitalize;
	}
	.editor{
		margin-bottom: 20px;
	}
	.image{
		margin-bottom: 20px;
	}
	label{
		width: 100%;
		padding: 0;
		margin: 0;
		height: 40px;
		line-height: 40px;
	}
	.input-group-text{
		padding: 0;
		margin-bottom: 15px;
	}
	.button{
		margin-bottom: 20px;
	}
	.buttons{
		text-align: center;
	}
	.btn-warning{
		margin-bottom: 15px;
	}
	.critical{
		color: #F80808;
	}
</style>
