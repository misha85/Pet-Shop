<template>
	<div class="container">
		<div class="row">

			<div class="main">
				<div class="col-12" v-if="isEmpty">
					<p>
						Zao nam je, ali za ovu kategoriju nema objavljenih blogova :(
					</p>
				</div>
				<div class="row" v-for="blog in blogs">
					<article class="blog">
						{{ blog.category }}
						<h3 class="text-right">{{ blog.title }}</h3>
						<div class="blog-img">
							<img :src="`url/:${blog.id}`" class="img-thumbnail rounded-circle text-right" alt="Responsive image">
						</div> <!-- .blog-img -->
						<p>
							{{ blog.content | snippet }} <router-link :to="'/blog/' + blog.id">vidi vise</router-link>
						</p>
						<div class="datum">Postavljeno: {{ blog.date | formatDate }}</div>
					</article> <!-- .blog -->
				</div> <!-- .row -->
			</div> <!-- .main -->
		</div> <!-- .row -->
	</div> <!-- .container -->
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { eventBus } from '../../main';

export default {
	data(){
		return {
			blogs: [],
			isEmpty: false,
			url: "http://praksa3.mars-t.mars-hosting.com/api/blog/get-image",
			name: this.$route.params.name
		}
	},
	created(){
		axios.get('http://praksa3.mars-t.mars-hosting.com/api/blog/get-blog-category', {
			params: {
				name: this.name
			}
		})
		.then(response => {
			console.log(response.data);
			this.blogs = [];
			for(var i=0; i<response.data.topics.length; i++){
				this.blogs.push({
					id: response.data.topics[i].tpc_id,
					title: response.data.topics[i].tpc_title,
					content: response.data.topics[i].tpc_content,
					category: response.data.topics[i].cat_name,
					date: response.data.topics[i].tpc_date,
					urlName: response.data.topics[i].tpc_title.replace(' ', '-')
				})
			};
			if(this.blogs.length > 0){ this.isEmpty = false }
				else { this.isEmpty = true };
		})
	},
	filters: {
		snippet(value) {
			if ( !value ) return '';
			return value.slice( 0 , 200 ) + '...';
		},
		formatDate(value){
			if ( !value ) return '';
			return moment(value).locale("sr").fromNow();
		}
	}
}
</script>

<style scoped>
article{
	padding: 10px;
	margin-bottom: 20px;
}
.btn{
	padding: 0 5px;
	vertical-align: bottom;
}
</style>
