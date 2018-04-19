<template>
	<!-- ====================  BLOG  ==================== -->
	<div>
		<h1>Komentari za odobravanje</h1>
		<h5 v-if="show">Nema komentara za odobravanje</h5>
		<div class="row">
			<paginate
			ref="paginator"
			name='allblogs'
			:list='blogs'
			:per='3'
			tag="ul">
			<div class="blog" v-for="blog in paginatedd('allblogs')">
				<article class="blog">
					<h3 class="text-right">{{ blog.title }} <span class="badge badge-danger" data-toggle="tooltip" data-placement="bottom" title="Broj neodobrenih komentara">{{ blog.numComments }}</span></h3>
					<router-link :to="'/admin/blog/uredi-blog/'+blog.tpc_id">
						<img :src='blog.url' class="img-thumbnail rounded-circle text-right" alt="Responsive image">
					</router-link>
					<p v-html="blog.content"></p>
					<div class="blog-date">Objavljeno: {{ blog.date | formatDate }}</div>
					<div class="buttons">
						<router-link tag="button" class="btn btn-primary" :to="'/admin/blog/uredi-blog/'+blog.tpc_id">
							Vidi komentare
						</router-link>
					</div> <!-- .buttons -->
					<hr>
				</article> <!-- .blog -->
			</div> <!-- .row -->
		</paginate>
	</div> <!-- .row -->

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
			}">
		</paginate-links>
	</div> <!-- .row -->
</div>
</template>

<script>
	import axios from 'axios'
	import moment from 'moment'

	export default {
		data(){
			return{
				blogs: [],
				paginate: ['allblogs'],
				show: false
			}
		},
		beforeCreate(){
			let app = this;
			axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/get-blogs').then( response => {
				for(var i=0; i<response.data.blogs.length; i++){
					app.blogs.push({
						tpc_id: response.data.blogs[i].tpc_id,
						title: response.data.blogs[i].tpc_title,
						content: response.data.blogs[i].tpc_content,
						date: response.data.blogs[i].tpc_date,
						numComments: response.data.blogs[i].ukupno,
						url: 'http://praksa3.mars-t.mars-hosting.com/api/slicica/' + response.data.blogs[i].tpc_id
					})
				}
				if (app.blogs.length == 0) {
					this.show = true;
				} else {
					this.show = false;
				}
			});
		},
		filters: {
			formatDate(value){
				if ( !value ) return '';
				return moment().locale("sr").format('Do MMMM YYYY');
			}
		},
		created(){
			if (localStorage.getItem('sid') == undefined) {
	      this.$router.push('/');
	    };
		}
	}
</script>

<style scoped>
	h1{
		text-align: center;
		margin-bottom: 40px;
	}
	h5{
		text-align: center;
	}
	button{	margin-bottom: 25px; }
	.buttons>button{ margin: 20px 10px 10px 0;	}
	.buttons>button:nth-of-type(2){	float: right;	}
	img{ width: 200px; }
	.pagination:nth-of-type(1){	margin: 0px auto 10px auto; }
	.badge-danger{
		padding-top: 0;
	}
	ul{
		padding: 0;
	}
	.blog{
		padding: 10px;
	}
</style>
