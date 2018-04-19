<template>
	<div class="container">
		<paginate
		ref="paginator"
		name='allblogs'
		:list='blogs'
		:per='3'>
		<div class="row" v-for="blog in paginatedd('allblogs')">
			<article class="blog col-12">
				<h3 class="text-right">{{ blog.tpc_title }}</h3>
				<div class="blog-img">
					<router-link :to="'/blog/'+blog.urlTitle+'/'+blog.tpc_id">
						<img :src="'http://praksa3.mars-t.mars-hosting.com/api/slicica/'+ blog.tpc_id" class="img-thumbnail rounded-circle text-right" alt="Responsive image">
					</router-link>
				</div> <!-- .blog-img -->
				<div>
					<p v-html="blog.tpc_content"></p>
					<p class="buttons">
	          <div class="row">
	          	<div class="buttons col-md-2 col-sm-2 col-xs-12">
	          		<router-link :to="'/blog/'+blog.urlTitle+'/'+blog.tpc_id" tag="button" class="btn btn-info col-xs-12">
									Vidi ceo blog
								</router-link>
	          	</div>
	          	<div v-if="userStatus === 1" class="buttons col-md-2 offset-md-3 col-sm-2 offset-sm-3 col-xs-12">
	          		<router-link :to="'admin/blog/edit-blog/'+blog.tpc_id" tag="button" class="btn btn-warning col-xs-12">
									Izmeni blog
								</router-link>
	          	</div>
	          	<div v-if="userStatus === 1" class="buttons col-md-2 offset-md-3 col-sm-2 offset-sm-3 col-xs-12">
	          		<longpress
			            class="btn btn-danger col-xs-12"
			            :value="blog.tpc_id"
			            duration="3"
			            :on-confirm="doDelete"
			            pressing-text="Brisanje za {$rcounter}"
			            action-text="Brisanje, sacekajte momenat....">
			            Obrisi blog
			          </longpress>
	          	</div>
	          </div> <!-- .row -->
					</p>
				</div>
				<div class="clear"></div>
				<div>Postavljeno: <span class="datum">{{ blog.tpc_date | formatDate }}</span></div>
				<hr>
			</article> <!-- .blog -->
		</div> <!-- .row -->
	</paginate>
	<!-- ====================  PAGINATION  ==================== -->
	<div class="row">
		<paginate-links
			for="allblogs"
			:classes="{
				'ul': 'pagination',
				'li': 'page-item',
				'a': 'page-link'
			}"
			:async="true"
			:limit="3"
			:hide-single-page="true"
			:show-step-links="true"
			:step-links="{
				next: 'Sledeca',
				prev: 'Prethodna'
			}"
		></paginate-links>
	</div> <!-- .row -->
</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import { eventBus } from '../../main';
	import Longpress from 'vue-longpress';

	export default{
		components: {
			Longpress
		},
		data(){
			return {
				paginate: ['allblogs'],
				blogs: [],
				userStatus: 0
			}
		},
		filters: {
			formatDate(value){
				if ( !value ) return '';
				return moment(value).locale("sr").format('Do MMMM YYYY');
			}
		},
		created(){
			axios.get('http://praksa3.mars-t.mars-hosting.com/api/blog/get-blog').then(response => {
				this.gettingBlogs(response.data.topics);
			});
			if (localStorage.getItem('sid')) {
				axios.get('http://praksa3.mars-t.mars-hosting.com/api/login/check-session', {
					params: {
						sid: localStorage.getItem('sid')
					}
				}).then( response => {
					if(response.data.userId){
						this.userStatus = response.data.userStatus;
					}
				});
				eventBus.$on('userLogin', korisnik => {
					this.userStatus = korisnik.usr_status;
				})
			} else{
				this.userStatus = 0;
			}
		},
		methods: {
			snippet(value, duzina){
			  if (!value) return;
			  if (value.length > duzina) {
			      let pos = value.lastIndexOf(' ', duzina);
			      return value.slice(0, pos) + '...';
			  } else {
			      return value;
			  }
			},
		  doDelete(id) {
				axios.delete('http://praksa3.mars-t.mars-hosting.com/api/admin/delete-blog', {
					params: {
						id: id
					}
				}).then( response => {
					axios.get('http://praksa3.mars-t.mars-hosting.com/api/blog/get-blog').then(response => {
						this.gettingBlogs(response.data.topics);
					})
				});
      },
			gettingBlogs(blogs){
				this.blogs = [];
				this.blogs = blogs;
				for(let i=0; i<this.blogs.length; i++){
					this.blogs[i].tpc_content = this.snippet(this.blogs[i].tpc_content, 200);
					this.blogs[i].urlTitle = this.blogs[i].tpc_title.replace(/ |\?/g, function(match) {return(match==" ")? "-": "";});
				}
			}
		}
	}
</script>

<style scoped>
	article{
		padding: 10px;
		margin: 20px 0;
	}
	.btn{
		padding: 5px;
		vertical-align: bottom;
		margin-bottom: 15px;
	}
	.buttons{
		margin-bottom: 20px;
		text-align: center;
		padding: 0;
	}
	a{text-decoration: none;}
	.clear{ clear: both; }
	.datum{ color: #A1A1A1; margin-left: 10px; }
	ul{
		padding-left: 0;
	}
	.blog-img{
		width: 250px;
		margin-bottom: 20px;
	}
</style>
