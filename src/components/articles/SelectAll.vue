<template>
    <div class="col-9 col-lg-10"> <!--artikli-->
        <div class="offset-lg-4 col-lg-8">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Traženje artikala:</span>
                </div>
                <input type="text" class="form-control" placeholder="Pronađite ime željenog artikla..." v-model="search">
            </div>
        </div>
        <ul class="list-group">
            <li class="list-group-item">
                <app-select-multiple :articles="searchArticles" class="row"></app-select-multiple>
            </li>
        </ul>
    </div> <!--end artikli-->
</template>

<script>
    import AsideNav from '../includes/AsideNav'
    import SelectMultiple from './SelectMultiple'
    import {eventBus} from '../../main';

    export default {
        components: {
            'app-aside-nav': AsideNav,
            'app-select-multiple': SelectMultiple
        },
        data() {
            return {
                articles: [],
                search: ''
            }
        },
        computed: {
            //     getArticles: function () {
            //         for (let i = 0; i < this.articles.length; i++) {
            //             this.articles[i].art_photo = 'data:text/html;base64,' + this.articles[i].art_photo;
            //         }
            //         return this.articles;
            //     },
            searchArticles() {
                return this.articles.filter((article) => {
                    // return article.art_name.match(this.search);
                    return article.art_name.toLowerCase().match(this.search.toLowerCase());
                });
            }
        },
        created() {
            var self = this;
            var axios = require('axios');
            axios.get('http://praksa3.mars-t.mars-hosting.com/api/article/articles')
                .then(function (response) {
                    // console.log('articles ++++++++++');
                    // console.log(response.data.getArticles);
                    self.articles = response.data.getArticles;
                    // console.log(self.niz);
                    // console.log('articles ++++++++++');
                })
                .catch(function (error) {
                    console.warn(error);
                    console.warn('NEUSPEH articles ---------');
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
        }
    };
</script>

<style scoped>
</style>
