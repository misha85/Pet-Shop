<template>
	<div>
		<div v-if="show" class="noResults">Nema pronadjenih rezultata.</div>
		<div class="row" v-for="blog in blogs">
			<article class="blog col-12">
				<h3 class="text-right">{{ blog.tpc_title }}</h3>
				<div class="blog-img">
					<router-link :to="'/blog/'+blog.urlTitle+'/'+blog.tpc_id">
						<img :src="blog.url" class="img-thumbnail rounded-circle text-right" alt="Responsive image">
					</router-link>
				</div> <!-- .blog-img -->
				<div>
					<p v-html="blog.tpc_content"></p>
					<router-link :to="'/blog/'+blog.urlTitle+'/'+blog.tpc_id">
						<p>Vidi ceo blog</p>
					</router-link>
				</div>
				<div>Postavljeno: <span class="datum">{{ blog.tpc_date | formatDate }}</span></div>
				<hr>
			</article> <!-- .blog -->
		</div> <!-- .row -->
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import { eventBus } from '../../main';

	export default{
		data(){
			return {
				blogs: [],
				show: false
			}
		},
		filters: {
			formatDate(value){
				if ( !value ) return '';
				return moment(value).locale("sr").format('Do MMMM YYYY');
			}
		},
		created(){
			axios.get('http://praksa3.mars-t.mars-hosting.com/api/blog/search-blog', {
				params: {
					search: this.$route.params.search
				}
			}).then(response => {
				console.log(response.data.topics.length);
				if (response.data.topics.length == 0) {
					this.show = true;
				} else{
					this.gettingBlogs(response.data.topics);
					this.show = false;
				}
				eventBus.$emit('clearInput');
			})
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
			gettingBlogs(blogs){
				this.blogs = [];
				this.blogs = blogs;
				for(let i=0; i<this.blogs.length; i++){
					this.blogs[i].tpc_content = this.snippet(this.blogs[i].tpc_content, 200);
					let id = this.blogs[i].tpc_id;
					this.blogs[i].url = "http://praksa3.mars-t.mars-hosting.com/api/slicica/"+id;
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
		padding: 0 5px;
		vertical-align: bottom;
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
	.noResults{
		margin-left: 15px;
	}
</style>


