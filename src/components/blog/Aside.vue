<template>
<div>
	<ul>
		<li v-for="category in categories">
			<router-link :to="'/kategorija/' + category.name">{{ category.name | toUpperFirst }}</router-link>
		</li>
	</ul>
</div>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../../main';

export default {
	data(){
		return {
			categories: []
		}
	},
	methods: {
		setCategory(categoryName){
			eventBus.$emit('categoryChanged', categoryName);
		}
	},
	created() {
		axios.get('http://praksa3.mars-t.mars-hosting.com/api/blog/get-blog').then(response => {
			for(var j=0; j<response.data.categories.length; j++){
				this.categories.push({
					id: response.data.categories[j].cat_id,
					name: response.data.categories[j].cat_name
				})
			}
		})
	},
	filters: {
		toUpperFirst(value){
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	},
}
</script>

<style scoped>
	ul{
		list-style: none;
		padding: 10px;
		margin-left: 30px;
	}
	ul li {
		margin-top: 15px;
		background: #fff;
		font-size: 22px;
		padding-left: 20px;
	}
</style>
