<template>
	<div class="wrapper">
		<app-banners v-if="showBanner"></app-banners>
		<div class="container" id="main"> <!--kategorije i artikli -->
			<div class="row">
				<app-aside-nav></app-aside-nav>

				<div class="col-9 col-lg-10"> <!--artikli-->
					<ul class="list-group">
						<li class="list-group-item">
							<app-select-multiple :articles="articles" class="row"></app-select-multiple>
						</li>
					</ul>
				</div> <!--end artikli-->
			</div> <!-- .row -->
		</div> <!-- .container -->
	</div> <!-- #wrapper  -->
</template>

<script>
	import Sidebar from '../includes/AsideNav'
  import SelectMultiple from '../articles/SelectMultiple'
  import Banners from './banners/Banners'
  import { eventBus } from '../../main'


    export default {
		components: {
			'app-aside-nav': Sidebar,
      'app-select-multiple': SelectMultiple,
      'app-banners': Banners
    },
		data() {
			return {
				articles: [],
        showBanner: true
			}
		},
		filters: {
		},
		computed: {
			getArticles: function () {
				for (let i = 0; i < this.articles.length; i++) {
					this.articles[i].art_photo = 'data:text/html;base64,' + this.articles[i].art_photo;
				}
				return this.articles;
			}
		},
		created() {
			var self = this;
			var axios = require('axios');
			axios.get('http://praksa3.mars-t.mars-hosting.com/api/article/articles')
			.then(function (response) {
				self.articles = response.data.getArticles;
			})
			.catch(function (error) {
				console.warn(error);
				console.warn('NEUSPEH articles ---------');
			});
      if (localStorage.getItem('sid') == undefined) {
        this.$router.push('/');
      };
      eventBus.$on('editBanner', () => {
          this.showBanner = false;
      });
      eventBus.$emit('adminHome');
		},
    watch:{
      '$route.path'(){
        if (this.$route.path == '/admin/izmeni-baner/1' || this.$route.path == '/admin/izmeni-baner/2') {

        } else{
          this.showBanner = true;
        }
      }
    }
	};
</script>

<style scoped>
	#main {
		margin-bottom: 30px;
	}
</style>
