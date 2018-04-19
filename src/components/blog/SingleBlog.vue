<template>
	<div>
		<div class="container">
			<div class="row">
				<article class="single-blog col-12">
					<div class="single-blog-header">
						<h1>{{ singleBlog.title }}</h1>
					</div> <!-- .single-blog-header -->
					<div class="single-blog-img col-12">
						<img :src='singleBlog.url' class="img-fluid" alt="Responsive image">
						<hr>
					</div> <!-- .single-blog-img -->
					<p v-html="singleBlog.content"></p>

					<span class="datum col-12">Objavljeno: {{ singleBlog.date | formatDate }}</span>

					<router-link to="/blog" tag="button" class="btn btn-info col-md-3 col-sm-12 col-xs-12">
						Nazad na blogove
					</router-link>

					<router-link v-if="userStatus === 1" :to="'/admin/blog/edit-blog/'+singleBlog.id" tag="button" class="btn btn-warning col-md-3 col-sm-12 col-xs-12">
						Izmeni blog
					</router-link>

					<longpress
						v-if="userStatus === 1"
            class="btn btn-danger col-md-3 col-sm-12 col-xs-12"
            :value="singleBlog.id"
            duration="3"
            :on-confirm="doDelete"
            pressing-text="Brisanje za {$rcounter}"
            action-text="Brisanje, sacekajte momenat....">
            Obrisi blog
          </longpress>

				</article>  <!-- .single-blog -->
			</div> <!-- .row -->
		</div> <!--  .container -->
		<app-comment v-if="userStatus !== 1"></app-comment>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import Comment from './Comment.vue';
	import { eventBus } from '../../main';
	import Longpress from 'vue-longpress';

	export default {
		components: {
			'app-comment': Comment,
			Longpress
		},
		data(){
			return{
				singleBlog: {},
				userStatus: 0
			}
		},
		filters: {
			formatDate(value){
				if ( !value ) return;
				return moment(value).locale("sr").format('Do MMMM YYYY');
			}
		},
		methods:{
		  doDelete(id) {
				axios.delete('http://praksa3.mars-t.mars-hosting.com/api/admin/delete-blog', {
					params: {
						id: id
					}
				}).then( response => {
					this.$router.push('/blog');
				});
      },
		},
		beforeCreate(){
			let app = this;
			axios.get('http://praksa3.mars-t.mars-hosting.com/api/blog/get-single-blog', {
				params: {
					id: app.$route.params.id
				}
			}).then(response => {
				app.singleBlog = {
					id: response.data.blog.tpc_id,
					title: response.data.blog.tpc_title,
					content: response.data.blog.tpc_content,
					category: response.data.blog.cat_name,
					date: response.data.blog.tpc_date,
					url: "http://praksa3.mars-t.mars-hosting.com/api/slicica/"+ response.data.blog.tpc_id
				}
			});
		},
		created(){
			eventBus.$emit('inputCleared');
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
		text-align: center;
	}
	.single-blog h1{
		margin: 10px 0 15px 0;
		text-align: left;
		color: #000000;
	}
	.single-blog p{ margin-top: 20px; }
	.single-blog img{
		border-radius: 10px;
		margin-bottom: 15px;
		min-width: 70%;
	}
	.datum{
		color: #888888;
		font-size: 16px;
		float: left;
		margin: 20px 0 40px 0;
	}
	.btn-warning,
	.btn-info,
	.btn-danger{
		margin-left: 15px;
	}
	.btn{
		margin-bottom: 10px;
	}
</style>
