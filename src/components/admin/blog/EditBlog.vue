<template>
	<div>
		<div class="container">
			<div class="row">
				<article class="single-blog col-12">
					<!-- ==========  EDIT  TITLE  ========== -->
					<div class="single-blog-header title">
						<h1 v-if="!editTitle">
							<span @click="editTitle = !editTitle">
								<i class="fas fa-pencil-alt"></i>
							</span>
							{{ singleBlog.tpc_title }}
						</h1>
						<p class="edit-title" v-else>
						<small><strong :class="{criticalTitle: criticalTitle}">{{ countTitle }}/100</strong></small>
							<input @click="showReset" type="text" class="form-control" v-model="singleBlog.tpc_title">
							<span @click="editTitle = !editTitle">
								<i class="fas fa-check checkTitle"></i>
							</span>
						</p>
					</div> <!-- .single-blog-header -->

					<!-- ==========  EDIT  IMAGE  ========== -->
					<div class="clear"></div>
					<p v-if="!editImage" class="edit-image">
						<img @click="editImage = !editImage" :src="singleBlog.url" class="img-thumbnail rounded-circle" alt="Responsive image">
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
							:removable="true"
							size="1"
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
				</div> <!-- .single-blog -->

				<!-- ==========  EDIT  CONTENT  ========== -->
				<div class="content" v-if="!editContent">
					<span @click="editContent = !editContent">
						<i class="fas fa-pencil-alt pencil-content"></i>
					</span>
					<p v-html="singleBlog.tpc_content"></p>
				</div>

				<div v-else @click="showReset" class="edit-content">
					<small><strong>{{ countContent }}</strong></small>
					<div class="clear"></div>
					<vue-editor v-model="singleBlog.tpc_content" class="form-control editor" placeholder="sadrzaj..." :editorToolbar="customToolbar"></vue-editor>
					<button class="btn btn-primary" @click="editContent = !editContent">Sacuvaj</button>
				</div>
				<br>
				<span class="datum">Objavljeno: {{ singleBlog.tpc_date | formatDate }}</span>
				<hr>
        <div class="row">
        	<div class="buttons col-md-2 col-sm-2 col-xs-12">
        		<router-link to="/blog" tag="button" class="btn btn-warning">
							Nazad
						</router-link>
        	</div>
        	<div class="buttons col-md-2 offset-md-1 col-sm-2 offset-sm-1 col-xs-12">
        		<button v-if="userStatus === 1" class="btn btn-success" @click="attemptUpload">Izmeni</button>
        	</div>
        	<div class="buttons col-md-2 offset-md-1 col-sm-2 offset-sm-2 col-xs-12">
        		<longpress
							v-if="userStatus === 1"
		          class="btn btn-danger"
		          :value="singleBlog.id"
		          duration="3"
		          :on-confirm="doDelete"
		          pressing-text="Brisanje za {$rcounter}"
		          action-text="Brisanje, sacekajte momenat....">
		          Obrisi blog
		        </longpress>
        	</div>
        	<div v-if="reset" class="buttons col-md-2 offset-md-1 col-sm-2 offset-sm-1 col-xs-12">
        		<button v-if="userStatus === 1" class="btn btn-secondary" @click="getBlog">Otkazi</button>
        	</div>
        </div> <!-- .row -->

			</article>  <!-- .single-blog -->
		</div> <!-- .row -->
	</div> <!--  .container -->
	<!-- Modal -->
	<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalLabel">Izmeni Blog</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        Blog je uspesno izmenjen
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-info" data-dismiss="modal">U redu</button>
	      </div>
	    </div>
	  </div>
	</div>
</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import { VueEditor } from 'vue2-editor';
	import PictureInput from 'vue-picture-input';
	import Longpress from 'vue-longpress';
	import { eventBus } from '../../../main';

	export default{
		components: {
			VueEditor,
			PictureInput,
			Longpress
		},
		data() {
			return {
				singleBlog: {},
				blogImage: '',
				editTitle: false,
				editImage: false,
				editContent: false,
				userStatus: 0,
				reset: false,
				countTitle: '',
				countContent: '',
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
		filters: {
			formatDate(value){
				if ( !value ) return;
				return moment(value).locale("sr").format('Do MMMM YYYY');
			}
		},
		created(){
			this.getBlog();
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
		methods: {
			onChanged (image) {
				if (this.$refs.pictureInput.file) {
					this.blogImage = this.$refs.pictureInput.file;
	      	var imageSize = this.$refs.pictureInput.file.size / 1024 / 1024;
					if (imageSize > 0.1) {
						this.fileToBig = true;
						$('#addBlog').modal('show');
					} else{
						this.fileToBig = false;
					}
				} else {
					console.log('Error');
				}
				this.showReset();
			},
			onRemoved(){
				this.blogImage = '';
			},
	    attemptUpload(){
	    	let formData = new FormData();
	    	formData.append('id', this.singleBlog.tpc_id);
	    	formData.append('title', this.singleBlog.tpc_title);
	    	formData.append('content', this.singleBlog.tpc_content);
	    	formData.append('image', this.blogImage);
    		axios.post('http://praksa3.mars-t.mars-hosting.com/api/admin/update-blog', formData)
    		.then( response => {
    			$('#editModal').modal('show');
    			console.log(response);
    		})
	    },
		  doDelete(id) {
				axios.delete('http://praksa3.mars-t.mars-hosting.com/api/admin/delete-blog', {
					params: {
						id: id
					}
				}).then( response => {
					this.$router.push('/blog');
				});
      },
      showReset(){
      	this.reset = true;
      },
	    getBlog(){
	    	axios.get('http://praksa3.mars-t.mars-hosting.com/api/blog/get-single-blog', {
	    		params: {
	    			id: this.$route.params.id
	    		}
	    	}).then( response => {
	    		this.singleBlog = response.data.blog;
	    		this.singleBlog.url = "http://praksa3.mars-t.mars-hosting.com/api/slicica/"+ this.$route.params.id;
					this.editTitle = false;
					this.editImage = false;
					this.editContent = false;
	    	})
	    	this.reset = false;
	    }
	  },
	  watch: {
	  	'singleBlog.tpc_title'(){
	  		this.countTitle = this.singleBlog.tpc_title.length;
	  	},
	  	'countTitle'(){
				if(this.countTitle >= 100){
					this.countTitle = 100;
					this.criticalTitle = true;
					this.singleBlog.tpc_title = this.singleBlog.tpc_title.substr(0, 100);
				} else{
					this.criticalTitle = false;
				}
			},
			'singleBlog.tpc_content'(){
				this.countContent = this.singleBlog.tpc_content.length;
			},
			'countContent'(){
				if(this.countContent >= 100){
					this.countContent = 100;
					this.criticalLink = true;
					this.content = this.content.substr(0, 100);
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
	.single-blog{
		border-radius: 10px;
		margin: 20px 0;
		padding: 20px 40px;
		max-width: 100%;
	}
	.title{
		min-width: 80%;
		margin: 0 auto;
		text-align: center;
	}
	h1{
		font-size: 30px;
	}
	.editor{ margin-bottom: 15px; }
	.datum{
		color: #888888;
		font-size: 16px;
	}
	.image{
		margin: 20px;
		display: inline;
		position: relative;
	}
	input[type='text']{
		float: right;
		padding-left: 35px;
	}
	.fa-pencil-alt{
		cursor: pointer;
		color: #2A7A2E;
		margin-right: 5px;
		font-size: 20px;
	}
	.edit-title,
	.content{
		position: relative;
	}
	.checkTitle{
		position: absolute;
		left: 10px;
		top: 10px;
		color: #37B734;
		cursor: pointer;
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
	.pencil-content{
		position: absolute;
		left: -30px;
	}
	img{
		cursor: pointer;
	}
	.buttons{
		margin-bottom: 20px;
		text-align: center;
		padding: 0;
	}
	.criticalTitle{
		color: #F50B0B;
	}
	.edit-content small{
		color: #8E8E8E;
		margin: 0 auto;
	}
	small{
		color: #8E8E8E;
	}
</style>
