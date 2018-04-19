<template>
    <div class="col-9 col-lg-10"> <!--artikli-->
        <ul class="list-group">
            <li class="list-group-item">
                <article class="artikal2" v-for="art in getArticles"> <!--artikal-->
                    <div class="card text-center">
                        <div class="card-block">
                            <div class="card-header">
                                <h4 class="card-title">{{art.art_name}}</h4>
                            </div>
                            <div class="card-text">
                                <div class="row">
                                    <div class="text-left col-12">
                                        <div v-if="new Date(art.art_discount_start) < new Date().getTime() && new Date(art.art_discount_end) > new Date().getTime()" class="akcija"><!--Akcija popusti-->
                                            <img src="../../assets/akcijaSlika.png" alt="akcija">
                                            <div class="akcijaPopust">
                                                Akcija:
                                                <br><span style="font-size: 1.8em;">{{art.art_discount_value}}</span>%
                                                <br><div style="font-size: 0.7em;line-height: 80%;margin-top: 5px;">Akcija važi do: <br>{{art.art_discount_end}}</div>
                                            </div>
                                        </div><!--End Akcija popusti-->

                                        <img :src="art.art_photo" class="d-block w-100">
                                        <span v-html="art.art_description">{{art.art_description}}</span>
                                    </div>
                                </div>
                                <div class="card-footer text-muted cenaBoja" v-if="art.art_discount !== 1 || new Date(art.art_discount_start) > new Date().getTime() || new Date(art.art_discount_end) < new Date().getTime()">
                                    <span class="small">cena: </span> {{art.art_price}}
                                </div>

                                <div class="card-footer text-muted cenaBoja" v-if="new Date(art.art_discount_start) < new Date().getTime() && new Date(art.art_discount_end) > new Date().getTime()">
                                    <div style="text-decoration: line-through;"><span class="small">stara cena: </span>{{art.art_price}}&nbsp;<span class="small">din</span>
                                    </div>
                                    <hr>
                                    <div>
                                        <span class="small">nova cena: </span>{{(art.art_price * (100-art.art_discount_value)/100).toFixed(2)}}&nbsp;<span class="small">din</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article> <!--end artikal-->
            </li>
        </ul>
        <div class="alert alert-danger text-center" v-if="imaLiArtikla === 0">ARTIKAL JE OBRISAN!!!</div>
    </div><!--end artikli-->
</template>

<script>
    import AsideNav from '../includes/AsideNav'

    export default {
        components: {
            'app-aside-nav': AsideNav
        },
        data() {
            return {
                articles: [],
                imaLiArtikla: 1,
                id: this.$route.params.id
            }
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
            // this.id = this.$route.params.id;
            axios.get('http://praksa3.mars-t.mars-hosting.com/api/article/single-article', {
                params: {
                    id: self.id
                }
            }).then(function (response) {
                // console.log('articles ++++++++++');
                // console.log(response.data.article);
                self.articles = response.data.article;
                if(response.data.article.length === 0) {
                    self.imaLiArtikla = 0;
                }
                // console.log(self.niz);
                // console.log('articles ++++++++++');
            })
                .catch(function (error) {
                    console.warn(error);
                    console.info('NEUSPEH article -----------------');
                });


        }
    }
</script>

<style scoped>
    p {
        padding: 0 20px 0;
    }
    article p {
        margin: 0;
        padding: 10px;
    }
    article.artikal2 img {
        margin: 0 auto;
        max-width: 500px;
        max-height: 500px;
    }
    article #divCena {
        background-color: antiquewhite;
    }
    .cenaBoja {
        background-color: antiquewhite;
    }
    .akcija {
        width: 140px;
        position: absolute;
        top: -10px;
        right: 0px;
    }
    .akcija img {
        width: 100%;
    }
    .akcijaPopust {
        position: absolute;
        top: 25%;
        width: 100%;
        text-align: center;
        color: white;
        font-weight: bold;
        transform: rotate(-7deg);
        line-height: 120%;
    }
</style>