<template>
    <div>
        <app-jumbotron></app-jumbotron> <!--jumbotron-->
        <app-banners v-if="showBanner"></app-banners>

        <div class="container" id="main"> <!--kategorije i artikli-->
            <div class="row">
                <app-aside-nav></app-aside-nav>

                <div class="col-9 col-lg-10"> <!--artikli-->
                    <ul class="list-group">
                        <li class="list-group-item">
                            <app-select-multiple :articles="articles" class="row"></app-select-multiple>
                        </li>
                    </ul>
                </div> <!--end artikli-->

            </div>
        </div>
    </div>
</template>

<script>
    import AsideNav from './includes/AsideNav'
    import Jumbotron from './Jumbotron'
    import SelectMultiple from './articles/SelectMultiple'
    import Banners from './banners/Banners'
    import { eventBus } from '../main'

    export default {
        components: {
            'app-aside-nav': AsideNav,
            'app-select-multiple': SelectMultiple,
            'app-jumbotron': Jumbotron,
            'app-banners': Banners
        },
        data() {
            return {
                articles: [],
                showBanner: true
            }
        },
        // computed: {
        //     getArticles: function () {
        //         for (let i = 0; i < this.articles.length; i++) {
        //             this.articles[i].art_photo = 'data:text/html;base64,' + this.articles[i].art_photo;
        //         }
        //         return this.articles;
        //     }
        // },
        created() {
            var self = this;
            var axios = require('axios');
            axios.get('http://praksa3.mars-t.mars-hosting.com/api/article/articlesLimit')
            .then(function (response) {
                self.articles = response.data.getArticles;
            })
            .catch(function (error) {
                console.warn(error);
                console.warn('NEUSPEH articles ---------');
            });
            eventBus.$on('editBanner', () => {
                this.showBanner = false;
            });
            eventBus.$on('deletedArticle', function (deleteID) {
                // console.warn('primanje eventBusa deletedArticle: ' +deleteID);
                for (var i = 0; i < self.articles.length; i++) {
                    if (deleteID === self.articles[i].art_id) {
                        // console.log(self.articles[i].art_id);
                        self.articles.splice(i, 1);
                        self.search = '';
                    }
                }
            })
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
    .jumbotron{
        margin: 0;
    }
</style>
