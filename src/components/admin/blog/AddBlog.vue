<template>
	<div class="container">
		<!-- ====================  MAIN  ==================== -->
		<div class="row">
			<div class="main col-md-12">
				<div class="row">
					<h1 class="new-blog-h1"><i>Dodaj novi blog</i></h1>
				</div> <!-- .row -->
				<!-- ====================  NEW  BLOG  ==================== -->
				<article class="new-blog col-12">
					<small><strong :class="{criticalTitle: criticalTitle}">{{ countTitle }}/100</strong></small>
					<input type="text" v-model="title" class="blog-title form-control" placeholder="Naslov">

					<!-- ================================ -->
					<div class="image">
						<picture-input
						  ref="pictureInput"
							:crop="false"
						  @change="onChanged"
						  @remove="onRemoved"
						  :width="400"
						  :zIndex="0"
						  :removable="true"
						  removeButtonClass="btn btn-secondary"
						  :height="200"
						  size="1"
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

					<div class="clear"></div>
					<small><strong>{{ countContent }}</strong></small>
					<vue-editor v-model="content" class="form-control editor" placeholder="sadrzaj..." :editorToolbar="customToolbar"></vue-editor>
					<!-- =================================== -->

					<button class="button btn btn-success" @click="attemptUpload">Dodaj blog</button>
					<button class="button btn btn-danger" @click="reset">Resetuj</button>
				</article> <!-- .new-blog -->
			</div> <!-- .main -->
		</div> <!-- .row -->

		<!-- Modal -->
		<div class="modal fade" id="addBlog" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">Dodaj Blog</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <!-- Blog je uspesno sacuvan (: -->
			      <p v-if="fileToBig">Odabrana slika je prevelika.</p>
		      </div>
		      <div class="modal-footer">
		        <button v-if="!fileToBig" type="button" @click="redirect" class="btn btn-info" data-dismiss="modal">U redu</button>
		        <button v-if="fileToBig" data-dismiss="modal">U redu</button>
		      </div>
		    </div>
		  </div>
		</div>
	</div> <!-- .container -->
</template>

<script>
	import { VueEditor } from 'vue2-editor'
	import PictureInput from 'vue-picture-input'
	import axios from 'axios'

	export default {
		components: {
			VueEditor,
			PictureInput
		},
		data(){
			return{
				id: '',
				title: '',
				content: '',
				image: '',
				countTitle: 0,
				countContent: 0,
				criticalTitle: false,
				fileToBig: false,
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
		methods: {
	    onChanged (image) {
	      if (this.$refs.pictureInput.file) {
	      	var imageSize = this.$refs.pictureInput.file.size / 1024 / 1024;
					if (imageSize > 0.1) {
						console.log(imageSize);
						this.fileToBig = true;
						$('#addBlog').modal('show');
					} else{
		      	this.image = this.$refs.pictureInput.file;
						this.fileToBig = false;
					}
	      } else {
	        console.log('Error');
	      }
	    },
	    onRemoved(){
	    	this.image = '';
	    },
	    attemptUpload(){
	    	let formData = new FormData();
	    	formData.append('id', this.id);
	    	formData.append('title', this.title);
	    	formData.append('content', this.content);
	    	formData.append('image', this.image);
    		axios.post('http://praksa3.mars-t.mars-hosting.com/api/admin/add-blog', formData)
    		.then( response => {
    			$('#addBlog').modal('show');
    		})
	    },
	    reset(){
	    	this.title = '';
	    	this.content = '';
	    },
	    redirect(){
	    	this.$router.push('/blog');
	    }
	  },
	  created(){
	    if (localStorage.getItem('sid') == undefined) {
	      this.$router.push('/');
	    } else{
	    	axios.get('http://praksa3.mars-t.mars-hosting.com/api/login/check-session', {
	    		params: {
	    			sid: localStorage.getItem('sid')
	    		}
	    	}).then( response => {
	    		this.id = response.data.userId
	    		console.log(this.id);
	    	})
	    }
	  },
	  watch: {
			'title'(){
				this.countTitle = this.title.length;
			},
			'content'(){
				this.countContent = this.content.length;
			},
		  	'countTitle'(){
				if(this.countTitle >= 100){
					this.countTitle = 100;
					this.criticalTitle = true;
					this.title = this.title.substr(0, 100);
				} else{
					this.criticalTitle = false;
				}
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

<style>
	.clear{
		clear: both;
	}
	.new-blog{ margin: 20px 0; position: relative; }
	.new-blog-h1{	margin: 25px auto 15px auto; }
	.new-blog>button:nth-of-type(2){ float: right; }
	.button{ margin-top: 20px; }
	input[type='text']{
		margin-bottom: 20px;
		text-align: center;
		padding: 10px;
		font-size: 19px;
	}
	.image{
		margin-bottom: 20px;
	}
	.criticalTitle{
		color: #F30B0B;
	}
	.criticalContent{
		color: #F30B0B;
	}
	small{
		color: #8E8E8E;
		margin-left: 5px;
	}
</style>
