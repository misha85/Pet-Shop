<template>
	<div class="container">
		<div class="row">
			<h1 class="article-title"><i>Izmeni artikal</i></h1>
		</div> <!-- row -->
		<div id="new-article">
			<!-- =================  CATEGORIES  AND  GROUPS  ================== -->
			<div class="row">
				<div class="cat col-md-5 col-sm-5 col-xs-12">
					<select v-model="selectedCategory" @change="categoryChanged" class="custom-select">
						<option v-for="category in categories" :selected="selectedCategory" :value="category.cat_id">{{ category.cat_name }}</option>
					</select>
				</div> <!-- .col-5 -->
				<div class="grp offset-md-2 col-md-5 offset-sm-2 col-sm-5 col-xs-12">
					<select v-model="selectedGroup" class="custom-select">
						<option hidden>Izaberite grupu</option>
						<option v-for="group in groups" :selected="selectedGroup" :value="group.grp_id">{{ group.grp_name }}</option>
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
						<small>Broj artikala na početnoj strani <strong :class="{critical: critical}">{{ count_art_home }}/12</strong></small>
						<div class="input-group-text">
							<label for="home">Stavi artikal na pocetnu stranu</label>
							<input v-model="art_home" @click="calc_count_art_home" id="home" type="checkbox" aria-label="Checkbox for following text input" :disabled=isDisabled>
						</div>
						<div class="input-group-text">
							<label for="discount">Promo cena</label>
							<input v-model="discount" id="discount" type="checkbox" aria-label="Checkbox for following text input">
						</div>
					</div>
					<div v-if="discount" class="offset-md-2 col-md-5 offset-sm-12 col-sm-0 col-xs-12">
						<div class="discount">
							<datepicker
								:bootstrap-styling="true"
								@selected="setStartDiscount"
								language="sr"
								placeholder="Pocetak akcije"
								:monday-first="true"
								:full-month-name="true"
								:value="state.startDiscount"
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
								:value="state.endDiscount"
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

				<!-- ==========  EDIT  IMAGE  ========== -->
				<div class="clear"></div>
				<p v-if="!editImage" class="edit-image">
					<img @click="editImage = !editImage" :src="imageUrl" class="img-thumbnail rounded-circle" alt="Responsive image">
				</p>
				<div v-if="editImage" class="edit-image">
					<div class="image">
						<span @click="editImage = !editImage">
							<i class="fas fa-ban cancelImage"></i>
						</span>
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
		</div> <!-- .image -->

		<div class="row">
			<div class="buttons col-md-2 col-sm-2 col-xs-12">
				<button type="button" class="btn btn-warning" @click="turnBack">Nazad</button>
			</div>
			<div class="buttons col-md-2 offset-md-3 col-sm-2 offset-sm-3 col-xs-12">
				<button type="button" class="btn btn-success" @click="attemptUpload">Sacuvaj</button>
			</div>
			<div class="buttons col-md-2 offset-md-3 col-sm-2 offset-sm-3 col-xs-12">
				<button type="button" class="btn btn-secondary" @click="getProduct">Resetuj</button>
			</div>
		</div> <!-- .row -->
	</div> <!-- #new-article -->

	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalLabel">Izmeni artikal</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        Artikal je uspesno izmenjen
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-info" @click="redirect" data-dismiss="modal">U redu</button>
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
	import moment from 'moment';

	export default{
		components: {
			VueEditor,
			PictureInput,
			Datepicker
		},
		data() {
			return {
				imageUrl: '',
				product: {},
				categories: [],
				selectedCategory: '',
				groups: [],
				selectedGroup: '',
				name: '',
				price: '',
				description: '',
				image: '',
				discount: false,
				state: {},
				discountValue: 0,
				editImage: false,
				productImage: '',
				showModal: false,
				art_home: false,
				count_art_home: '',
				isDisabled: false,
				critical: false,
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
			this.getProduct();
			if (!localStorage.getItem('sid')) {
				this.$router.push('/');
			};
		},
		methods: {
			setStartDiscount(value){
				 this.state.startDiscount = moment(value).format('YYYY-MM-DD');
			},
			setEndDiscount(value){
				this.state.endDiscount = moment(value).format('YYYY-MM-DD');
			},
			onChanged (image) {
				if (this.$refs.pictureInput.file) {
					this.productImage = this.$refs.pictureInput.file;
				} else {
					console.log('Error');
				}
			},
			onRemoved(){
				this.productImage = '';
			},
			attemptUpload(){
				let formData = new FormData();
				if (this.discount === false) this.discount = 0
					else if (this.discount === true) this.discount = 1;
				formData.append('id', this.$route.params.id);
				formData.append('group', this.selectedGroup);
				formData.append('name', this.name);
				formData.append('price', this.price);
				formData.append('discount', this.discount);
				formData.append('startDiscount', this.state.startDiscount);
				formData.append('endDiscount', this.state.endDiscount);
				formData.append('discountValue', this.discountValue);
				formData.append('description', this.description);
				formData.append('image', this.productImage);
				if(this.art_home == true) {
					this.art_home = 1;
        } else {
           this.art_home = 0;
        }
        formData.append('art_home', this.art_home);
				axios.post('http://praksa3.mars-t.mars-hosting.com/api/admin/edit-product', formData)
				.then( response => {
					console.log(response);
					$('#myModal').modal('show');
				})
				.catch( error => {
					alert('Niste popunili sva polja');
				})
			},
			categoryChanged(){
				axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/add-products', {
					params: {
						part: 'grp',
						catId: this.selectedCategory
					}
				})
				.then( response => {
					this.groups = response.data.groups;
					this.selectedGroup = 'Izaberite grupu';
				})
			},
			getProduct(){
				axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/edit-product', {
					params: {
						id: this.$route.params.id
					}
				})
				.then( response => {
					this.imageUrl = 'http://praksa3.mars-t.mars-hosting.com/api/admin/edit-product-image/'+this.$route.params.id;
					this.product = response.data.product;
					this.categories = response.data.categories;
					this.groups = response.data.groups;
					this.art_home = response.data.product.art_home;
					this.count_art_home = response.data.q[0].count_art_home;
          this.selectedCategory = this.product.cat_id;
					this.selectedGroup = this.product.grp_id;
					this.name = this.product.art_name;
					this.price = this.product.art_price;
					this.description = this.product.art_description;
					if(this.product.art_discount == 1) this.discount = true
						else this.discount = false;
					this.state.startDiscount = this.product.art_discount_start;
					this.state.endDiscount = this.product.art_discount_end;
					if (this.product.art_discount_value == null) this.discountValue = 0
						else this.discountValue = this.product.art_discount_value;
				})
			},
			turnBack(){
				this.$router.push( {name: 'SelectAll'} );
			},
			redirect(){
				this.$router.push( {name: 'SelectAll'} );
			},
			calc_count_art_home(){
				if(this.art_home === true || this.art_home === 1){
					this.count_art_home--;
					if (this.count_art_home > 12 && (this.art_home === false || this.art_home === 0)) {
						this.count_art_home = 12;
						this.isDisabled = true;
					}
				}
				else if(this.art_home === false || this.art_home === 0){
					this.count_art_home++;
					if (this.count_art_home > 12 && (this.art_home === false || this.art_home === 0)) {
						this.count_art_home = 12;
						this.isDisabled = true;
					}
				}
			}
		},
		watch: {
			'count_art_home'(){
				if (this.count_art_home >= 12 && (this.art_home === false || this.art_home === 0)) {
					this.count_art_home = 12;
					this.isDisabled = true;
				}
				if(this.count_art_home >= 12){
					this.critical = true;
				} else{
					this.critical = false;
				}
			}
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
	input{
		text-transform: capitalize;
		text-align: left;
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
	.discount{
		margin-bottom: 10px;
	}
	.image{
		margin: 20px;
		display: inline;
		position: relative;
	}
	img{
		cursor: pointer;
		width: 300px;
	}
	.edit-image{
		text-align: center;
		margin: 20px;
	}
	.cancelImage{
		position: absolute;
		right: 0;
		top: 0;
		color: #992C2C;
		cursor: pointer;
	}
	.modal-body{
		margin: 0 auto;
		color: #286133;
	}
	.buttons{
		margin-bottom: 20px;
		text-align: center;
	}
	strong{
		margin-left: 10px;
	}
	.critical{
		color: #FC0707;
	}
</style>
