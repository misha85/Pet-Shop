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
                <app-select-multiple :articles="searchArticles" :imaArtikala="imaArtikala" class="row"></app-select-multiple>
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
                imaArtikala: 1,
                articles: [],
                idGroup: this.$route.params.idGroup,
                nameGroup: this.$route.params.nameGroup,
                search: ''
            }
        },
        computed: {
            searchArticles() {
                return this.articles.filter((article) => {
                    // return article.art_name.match(this.search);
                    return article.art_name.toLowerCase().match(this.search.toLowerCase());
                });
            }
        },
        methods: {
            axiosPoziv() {
                var self = this;
                var axios = require('axios');
                self.search = '';
                if (this.$route.params.idGroup == 0) {
                    axios.get('http://praksa3.mars-t.mars-hosting.com/api/article/saleArticles')
                        .then(function (response) {
                            self.articles = response.data.saleArticles;
                            if (response.data.saleArticles.length === 0) {
                                self.imaArtikala = 0;
                            } else {
                                self.imaArtikala = 1;
                            }
                        }).catch(function (error) {
                        console.warn(error);
                        console.warn('NEUSPEH AKCIJA ---------');
                    });

                }
                else {
                    axios.get('http://praksa3.mars-t.mars-hosting.com/api/article/articlesGroups', {
                        params: {
                            id: self.idGroup
                        }
                    }).then(function (response) {
                        self.articles = response.data.articlesGroups;
                        if (self.articles.length === 0) {
                            self.imaArtikala = 0;
                        } else {
                            self.imaArtikala = 1;
                        }
                    }).catch(function (error) {
                        console.warn(error);
                        console.warn('NEUSPEH articles---------');
                    });
                }
            }
        },
        watch: {
            '$route'(to, from) {
                this.idGroup = to.params.idGroup;
                this.axiosPoziv();
            }
        },
        created() {
            this.axiosPoziv();
            var self = this;
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

