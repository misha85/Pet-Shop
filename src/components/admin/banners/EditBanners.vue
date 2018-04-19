<template>
	<div class="container">
		<!-- ==========  EDIT  IMAGE  ========== -->
		<div class="row">
			<p v-if="!editImage">
				<div @click="editImage = !editImage" class="banner">
					<img class="img-fluid" id="banner-image" :style="{background: 'linear-gradient('+banner.bnr_bcgColor1+','+ banner.bnr_bcgColor2+')'}" :src="banner.image" alt="Responsive image">
					<div v-if="showSpin" class="spin">
						<i :style="{top: spinTop+'px', left: spinLeft+'px'}" class="fas fa-spinner fa-spin"></i>
					</div>
					<div
						class="title"
						:style="{
							color: banner.bnr_textTitleColor,
							background: banner.bnr_bcgTitleColor,
							bottom: banner.bnr_bottomPosition,
							top: banner.bnr_topPosition
						}">
						{{ banner.bnr_title }}
					</div> <!-- .title -->
				</div> <!-- .banner -->
			</p>
			<picture-input
				v-if="editImage"
				ref="pictureInput"
				:crop="false"
				@change="onChanged"
				@remove="onRemoved"
				:width="400"
				:height="200"
				:zIndex="0"
				size="1"
				:removable="true"
				removeButtonClass="btn btn-secondary"
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
		</div> <!-- .row -->
		<!-- ==========  EDIT  TITLE  &  COLORS  ========== -->
		<button class="btn btn-info" @click="moveText('up')">Podigni naslov</button>
		<button class="btn btn-info" @click="moveText('down')">Spusti naslov</button>

		<div class="banner-title">
			<small>Broj karaktera <strong :class="{criticalTitle: criticalTitle}">{{ titleChar }} / 50</strong></small>
			<label for="title">Naslov banera:</label>
			<input type="text" id="title" class="form-control" v-model="banner.bnr_title">
		</div>

		<div class="clear"></div>
		<div class="row">
			<div class="colors col-md-3 col-sm-6 col-xs-12">
				<label for="title-color">Pozadina naslova:</label>
				<input type="color" id="bck-color" v-model="banner.bnr_bcgTitleColor">
			</div> <!-- .colors -->
			<div class="colors col-md-3 col-sm-6 col-xs-12">
				<label for="title-color">Boja naslova:</label>
				<input type="color" id="title-color" v-model="banner.bnr_textTitleColor">
			</div> <!-- .colors -->

			<div class="colors col-md-3 offset-md-0 col-sm-6 offset-sm-0 col-xs-12">
				<label for="title-color">Pozadina slike 1:</label>
				<input type="color" id="bck-color" v-model="banner.bnr_bcgColor1">
			</div> <!-- .colors -->
			<div class="colors col-md-3 offset-md-0 col-sm-6 offset-sm-0 col-xs-12">
				<label for="title-color">Pozadina slike 2:</label>
				<input type="color" id="bck-color" v-model="banner.bnr_bcgColor2">
			</div> <!-- .colors -->
		</div> <!-- .row -->
		<hr>

		<!-- ==========  EDIT  LINK  ========== -->
		<div class="link">
			<p v-html="banner.bnr_link"></p>
			<small>Broj karaktera <strong :class="{criticalLink: criticalLink}">{{ linkChar }} / 100</strong></small>
			<label for="link">Promenite link:</label>
			<input type="text" class="form-control" v-model="banner.bnr_link">
		</div> <!-- .link -->
		<hr>

		<!-- ==========  EDIT  START  &  END  DATE  ========== -->
		<div class="row">
			<div class="discount col-md-12 col-sm-12 col-xs-12">
				Stari baner
			</div>
		</div> <!-- .row -->
		<div class="row">
			<div class="discount col-md-4 col-sm-5 col-xs-12">
				Početak: {{ banner.bnr_startdate | formatDate }}
			</div> <!-- .discount -->
			<div class="discount col-md-5 offset-md-0 col-sm-5 offset-sm-0 col-xs-12">
				Kraj: {{ banner.bnr_enddate | formatDate }}
			</div> <!-- .discount -->
			<div class="discount col-md-12 col-sm-12 col-xs-12">
				Novi baner
			</div>
			<div class="discount col-md-3 col-sm-5 col-xs-12">
				<datepicker
					:bootstrap-styling= "true"
					@selected="setStartBanner"
					language="sr"
					placeholder="Pocetak"
					:monday-first="true"
					:full-month-name="true"
					:value="state.startBanner"
				></datepicker>
			</div> <!-- .discount -->
			<div class="discount col-md-3 offset-md-1 col-sm-5 offset-sm-2 col-xs-12">
				<datepicker
					:bootstrap-styling= "true"
					@selected="setEndBanner"
					language="sr"
					placeholder="Kraj"
					:monday-first="true"
					:full-month-name="true"
					:value="state.endBanner"
				></datepicker>
			</div> <!-- .discount -->
		</div> <!-- .row -->
		<router-link to="/" tag="button" class="btn btn-warning float-left col-md-2 col-sm-2 col-xs-2">Nazad</router-link>
		<button @click="attemptUpload()" class="btn btn-success float-right col-md-2 col-sm-2 col-xs-2">Izmeni</button>
		<div class="clear"></div>

		<!-- Modal -->
		<div class="modal fade" id="bannerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">izmeni baner</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <p v-if="fileToBig">Odabrana slika je prevelika.</p>
		        <p v-if="success">Baner je uspesno izmenjen.</p>
		        <p v-if="removeBanner">Baner je uklonjen sa početne strane.</p>
		      </div>
		      <div class="modal-footer">
		      	<button v-if="fileToBig" class="btn btn-info" @click="fileToBig = !fileToBig" data-dismiss="modal">Probaj ponovo</button>
		      	<button v-if="fileToBig" class="btn btn-secondary" @click="redirect">Drugi put</button>
		      	<button v-if="success" class="btn btn-info" data-dismiss="modal">U redu</button>
		      	<button v-if="removeBanner" class="btn btn-info" @click="redirect">U redu</button>
		      </div>
		    </div>
		  </div>
		</div>
	</div> <!-- .container -->
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../../main';
import PictureInput from 'vue-picture-input';
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

export default{
	components: {
		PictureInput,
		Datepicker
	},
	data() {
		return {
			banner: {},
			userStatus: 0,
			editImage: false,
			tmpImage: '',
			state: {},
      newImage: '',
      fileToBig: false,
      success: false,
      removeBanner: false,
      spinLeft: '',
      spinTop: '',
      showSpin: false,
      titleChar: 0,
      linkChar: 0,
      criticalTitle: false,
      criticalLink: false
		}
	},
	created(){
		this.banner.bnr_location = this.$route.params.location;
		axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/get-banner', {
			params: {
				location: this.banner.bnr_location
			}
		}).then( response => {
			this.banner = response.data.banner[0];
			this.state.startBanner = moment(response.data.banner[0].bnr_startdate).locale("sr").format('YYYY-MM-DD');
			this.state.endBanner = moment(response.data.banner[0].bnr_enddate).locale("sr").format('YYYY-MM-DD');
			this.banner.image = 'http://praksa3.mars-t.mars-hosting.com/api/get-banner-image/'+this.banner.bnr_location
		});
		if (localStorage.getItem('sid')) {
			axios.get('http://praksa3.mars-t.mars-hosting.com/api/login/check-session', {
				params: {
					sid: localStorage.getItem('sid')
				}
			}).then( response => {
				this.userStatus = response.data.userStatus;
				if(this.userStatus !== 1){
					this.$router.push('/');
				}
			});
		};
		eventBus.$emit('bannerChanged');
	},
	methods:{
		onChanged (image) {
			this.spinLeft = ($('#banner-image').width() / 2) - 20;
			this.showSpin = true;
			console.log(this.spinLeft);
			if (this.$refs.pictureInput.file) {
				var imageSize = this.$refs.pictureInput.file.size / 1024 / 1024;
				if (imageSize > 1) {
					this.fileToBig = true;
					$('#bannerModal').modal('show');
				} else{
					this.tmpImage = this.$refs.pictureInput.file;
					this.newImage = this.$refs.pictureInput.file;
					let formData = new FormData();
		    	formData.append('location', this.banner.bnr_location);
		    	formData.append('image', this.tmpImage);
					axios.post('http://praksa3.mars-t.mars-hosting.com/api/admin/set-banner-tmp_photo', formData)
					.then( response => {
						console.log('tu sam');
						this.tmpImage = response.data.image;
						this.getImage;
						this.editImage = false;
						this.showSpin = false;
					})
					.catch( error => {
						this.showSpin = false;
						console.log(error.response);
					})
				}
			} else {
				console.log('Error');
			}
		},
		onRemoved(){
			this.banner.bnr_photo = '';
		},
    attemptUpload(){
    	this.fileToBig = false;
    	this.success = true;
    	let formData = new FormData();
    	formData.append('location', this.$route.params.location);
    	formData.append('title', this.banner.bnr_title);
  		formData.append('photo', this.newImage);
    	formData.append('link', this.banner.bnr_link);
    	formData.append('startDate', this.state.startBanner);
    	formData.append('endDate', this.state.endBanner);
    	formData.append('textTitleColor', this.banner.bnr_textTitleColor);
    	formData.append('bcgTitleColor', this.banner.bnr_bcgTitleColor);
    	formData.append('bcgColor1', this.banner.bnr_bcgColor1);
    	formData.append('bcgColor2', this.banner.bnr_bcgColor2);
    	formData.append('topPosition', this.banner.bnr_topPosition);
    	formData.append('bottomPosition', this.banner.bnr_bottomPosition);
  		axios.post('http://praksa3.mars-t.mars-hosting.com/api/admin/edit-banner', formData)
  		.then( response => {
  			$('#bannerModal').modal('show');
  			console.log(response.data.res);
  		})
    },
		setStartBanner(value){
			 this.state.startBanner = moment(value).format('YYYY-MM-DD');
		},
		setEndBanner(value){
			this.state.endBanner = moment(value).format('YYYY-MM-DD');
		},
		moveText(value){
			if (value === 'up') {
				this.banner.bnr_topPosition = 0;
				this.banner.bnr_bottomPosition = '';
			} else {
				this.banner.bnr_bottomPosition = 0;
				this.banner.bnr_topPosition = '';
			}
		},
		redirect(){
			$('#bannerModal').modal('hide');
			this.$router.push('/');
		}
	},
	computed:{
		getImage(){
			this.banner.image = 'data:text/html;base64,' + this.tmpImage;
		}
	},
	filters: {
		formatDate(value){
			if ( !value ) return '';
			return moment(value).locale("sr").format('Do MMMM YYYY');
		}
	},
	watch: {
		'banner.bnr_title'(){
			this.titleChar = this.banner.bnr_title.length;
		},
		'banner.bnr_link'(){
			this.linkChar = this.banner.bnr_link.length;
		},
		'titleChar'(){
			if(this.titleChar >= 50){
				this.titleChar = 50;
				this.criticalTitle = true;
				this.banner.bnr_title = this.banner.bnr_title.substr(0, 50);
			} else{
				this.criticalTitle = false;
			}
		},
		'linkChar'(){
			if(this.linkChar >= 100){
				this.linkChar = 100;
				this.criticalLink = true;
				this.banner.bnr_link = this.banner.bnr_link.substr(0, 100);
			} else{
				this.criticalLink = false;
			}
		}
	}
}
</script>

<style scoped>
	.clear{
		clear: both;
	}
	.btn{
		margin-bottom: 20px;
	}
	img{
		cursor: pointer;
	}
	.title{
		min-width: 100%;
		position: absolute;
		text-align: center;
		font-weight: bold;
	}
	.banner{
		position: relative;
		margin: 20px auto 70px auto;
		/*overflow: hidden;*/
	}
	.banner-title{
		margin: 10px 0;
	}
	.banner-content{
		margin-bottom: 20px;
	}
	.colors{
		margin-top: 15px;
	}
	.discount:nth-of-type(3){
		border-top: 1px dashed #656565;
		padding-top: 15px;
	}
	.label{
		margin-top: 25px;
		padding: 0;
	}
	.jumbotron{
		margin: 30px auto;
		background: #ff6739;
		width: 475px;
		height: 130px;
		position: relative;
		overflow: hidden;
	}
	.fa-spinner{
		position: absolute;
		font-size: 45px;
		color: #bababa;
		z-index: 20;
		margin-top: 10px;
	}
	small{
		color: #8E8E8E;
		margin-left: 55px;
		float: right;
	}
	.criticalTitle{
		color: #F30B0B;
	}
	.criticalLink{
		color: #F30B0B;
	}
</style>
