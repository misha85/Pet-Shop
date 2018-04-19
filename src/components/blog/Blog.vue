<template>
	<!-- ====================  MAIN  ==================== -->
	<div class="container">
		<div class="">
			<div class="col-12">
				<router-link to="/blog">
					<h2>
						<img src="../../assets/cat.png" class="cat-png" alt="cat">
						Blog
					</h2>
				</router-link>
				<!-- ==========  SEARCH  BLOGS  ========== -->
		    <div class="search">
		    	<vue-instant
		    	  :suggestion-attribute="suggestionAttribute"
		    	  v-model="value"
		    	  :disabled="false"
		    	  @input="changed"
		    	  :show-autocomplete="true"
		    	  :autofocus="false"
		    	  :suggestions="suggestions"
		    	  name="customName"
		    	  placeholder="pretrazi blogove..."
		    	  type="twitter"
		    	></vue-instant>
		    </div>
				<div class="clear"></div>
				<hr>
			</div> <!-- .col-12 -->
			<div class="suggestions"  v-if="suggestions.length >= 1" v-for="(suggestion, index) in suggestions">
    	  <a @click="clearInput(index, suggestion.tpc_id)">
    	  	<h5>
    	  		<img :src="suggestion.url" alt="">
    	  		{{ suggestion.tpc_title }}
    	  		<small>datum: {{ suggestion.tpc_date | formatDate }}</small>
    	  	</h5>
    	  </a>
    	</div>
    	<div class="clear"></div>
			<div class="main" v-if="suggestions.length === 0">
				<transition name="slide" mode="out-in">
					<router-view></router-view>
				</transition>
			</div> <!-- .main -->
		</div> <!-- .row -->
	</div> <!-- .container -->
</template>

<script>
	import moment from 'moment';
	import axios from 'axios';
  import { VueInstant } from 'vue-instant';
  import { eventBus } from '../../main';

	export default{
		components: {
			'vue-instant': VueInstant
		},
		data(){
			return{
        value: '',
        suggestionAttribute: 'tpc_title',
        suggestions: []
			}
		},
		filters: {
			formatDate(value){
				if ( !value ) return '';
				return moment(value).locale("sr").format('Do MMMM YYYY');
			}
		},
    methods: {
      changed: function() {
      	this.suggestions = [];
        axios.get('http://praksa3.mars-t.mars-hosting.com/api/blog/search-blog', {
          params: {
            search: this.value
          }
        }).then( response => {
	        this.suggestions = response.data.topics
					for(let i=0; i<this.suggestions.length; i++){
						this.suggestions[i].urlTitle = this.suggestions[i].tpc_title.replace(/ |\?/g, function(match) {return(match==" ")? "-": "";});
						this.suggestions[i].url = "http://praksa3.mars-t.mars-hosting.com/api/slicica/"+this.suggestions[i].tpc_id
					}
        })
      },
      clearInput(index, id){
      	this.$router.push({
      		name: 'singleBlog',
      		params: {
      			title: this.suggestions[index].urlTitle,
      			id: id
      		}
      	});
      	this.suggestions = [];
      }
    },
    created(){
    	eventBus.$on('inputCleared', () => {
    		this.value = '';
    	})
    }
	}
</script>

<style scoped>

	.col-12, .blog{ background: #FFF; }
	.blog-img{ width: 350px; }
	h2{
		font-size: 76px;
		float: left;
		color: #000;
	}
	.cat-png{
		width: 70px;
		vertical-align: baseline;
		margin-right: -10px;
	}
	.search{
		float: right;
		margin-top: 40px;
	}
	.suggestions{
		cursor: pointer;
		color: #54a552;
		margin-bottom: 20px;
	}
	.suggestions:hover{
		color: #447842;
	}
	img{
		width: 100px;
		border-radius: 50px;
	}
	.clear{ clear: both; }
	.slide-leave-active{
	  transition: opacity 1s ease;
	  opacity: 0;
	  animation: slide-out 1s ease-out forwards;
	}
	.slide-leave{
	  opacity: 1; transform: translateX(0); }
	.slide-enter-active{ animation: slide-in 1s ease-out forwards; }
	@keyframes slide-out{
	  0%{ transform: translateY(0); }
	  100%{ transform: translateY(-30px); }
	}
	@keyframes slide-in{
	  0%{ transform: translateY(-30px); }
	  100%{ transform: translateY(0); }
	}
</style>
