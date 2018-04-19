<template>
	<div class="main">
		<div class="page">
			<div class="row">
			<!-- ==========================  SINGLE  BLOG  ========================== -->
				<article class="single-blog col-12">
					<div class="single-blog-header">
						<h1>{{ singleBlog.title }}</h1>
					</div> <!-- .single-blog-header -->
					<div class="single-blog-img">
						<img :src='singleBlog.url' class="img-fluid" alt="Responsive image">
					</div> <!-- .single-blog-img -->
					<p v-html="singleBlog.content"></p>
					<span class="datum">Objavljeno: {{ singleBlog.date | formatDate }}</span>
				</article>  <!-- .single-blog -->
			</div> <!-- .row -->
			<hr>
			<!-- ==========================  COMMENTS  ========================== -->
			<div class="row">
				<app-comment></app-comment>
			</div> <!-- .row -->
		</div> <!-- .page -->
	</div> <!-- .main -->
</template>

<script>
	import moment from 'moment'
	import axios from 'axios'
	import Comments from './Comments.vue'

	export default{
		components: {
			'app-comment': Comments
		},
		data() {
			return {
				singleBlog: {}
			}
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
					url: "http://praksa3.mars-t.mars-hosting.com/api/slicica/" + response.data.blog.tpc_id
				}
			})
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
.datum{ color: #6E6E6E; }
img{
	border-radius: 20px;
}
</style>
