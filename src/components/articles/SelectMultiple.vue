<template>
    <div>
        <p class="container-fluid alert alert-warning poruka" v-if="imaArtikala === 0" id="poruka">Nema artikala za tu grupu...</p>
        <article class="col-sm-6 col-md-4 col-lg-3 artikal1" v-if="user === 1">
            <router-link tag="a" :to="{ name: 'dodaj-artikal'}" class="card text-center">
                <div class="card-block">
                    <div class="card-title naslovH4">
                        <h4>Dodajte novi artikal...</h4>
                    </div>
                    <div class="card-text">
                        <p style="font-size: 8em; color: green;"><i class="fas fa-plus-square"></i></p>
                    </div>
                </div>
            </router-link>
        </article>

        <article class="col-sm-6 col-md-4 col-lg-3 artikal1" v-for="(art,index) in articles"><!--artikal-->
            <div id="adminDugmici" v-if="user === 1">
                <router-link tag="button" class="btn btn-info" :to="{ name: 'izmeni-artikal', params: {id: art.art_id}}">Izmeni
                    <i class="fas fa-edit"></i></router-link>
                <button class="btn btn-danger" @click.prevent="obrisiArtikal(art.art_id)">Obrisi
                    <i class="fas fa-trash"></i></button>
            </div>
            <router-link tag="a" :to="{ name: 'SelectSingle', params: {id: art.art_id , name: art.art_name}}" class="card text-center">
                <div class="card-block">
                    <div class="card-title naslovH4">
                        <h4>{{art.art_name | snippet(25)}}</h4>
                    </div>

                    <div class="card-text">
                        <div class="divSlike">
                            <div v-if="new Date(art.art_discount_start) < new Date().getTime() && new Date(art.art_discount_end) > new Date().getTime()" class="akcija"><!--Akcija popusti-->
                                <img src="../../assets/akcijaSlika.png" alt="akcija">
                                <div class="datum" style="background-color: red;color: white;">Akcija važi do: <br>{{art.art_discount_end}}
                                </div>
                                <div class="akcijaPopust">
                                    Akcija: <br><span style="font-size: 1.5em;">{{art.art_discount_value}}</span>%
                                </div>
                            </div>
                            <img :src="'http://praksa3.mars-t.mars-hosting.com/api/articleGetPhotos/' + art.art_id" alt="Artikal Nema Sliku">
                        </div>
                        <div class="cenaBoja" v-if="art.art_discount !== 1 || new Date(art.art_discount_start) > new Date().getTime() || new Date(art.art_discount_end) < new Date().getTime()">
                            <span class="small"><div class="prazanProstor">&nbsp;</div>cena: </span>{{art.art_price}}&nbsp;<span class="small">din</span>
                        </div>
                        <div class="cenaBoja" v-if="new Date(art.art_discount_start) < new Date().getTime() && new Date(art.art_discount_end) > new Date().getTime()"><!--NA POPUSTU-->
                            <div><span class="small">stara cena: </span><span style="text-decoration: line-through;">{{art.art_price}}&nbsp;<span class="small">din</span></span>
                            </div>
                            <hr>
                            <div>
                                <span class="small">nova cena: </span>{{(art.art_price * (100-art.art_discount_value)/100).toFixed(2)}}&nbsp;<span class="small">din</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<router-link :to="{ name: 'SelectSingle', params: {id: art.art_id , name: art.art_name}}" class="btn btn-sm btn-info btn-block">Detaljnije...</router-link>-->
            </router-link>
        </article> <!--end artikal-->
    </div>
</template>

<script>
    import {eventBus} from '../../main';

    export default {
        props: ['articles', 'imaArtikala'], /*ovo primam sa drugih stranica i izlistavam...*/
        data() {
            return {
                user: 2,
            }
        },
        methods: {
            snippet(value, duzina) {
                if (!value) return;
                if (value.length > duzina) {
                    let pos = value.lastIndexOf(' ', duzina);
                    return value.slice(0, pos) + '...';
                } else {
                    return value;
                }
            },
            obrisiArtikal(deleteID) {
                var self = this;
                var axios = require('axios');
                bootbox.confirm("Da li zelite da obrisete artikal?", function (odgovor) {
                    if (odgovor == true) {
                        if (localStorage.getItem('sid')) {
                            axios.get('http://praksa3.mars-t.mars-hosting.com/api/login/check-session', {
                                params: {
                                    sid: localStorage.getItem('sid')
                                }
                            }).then(response => {
                                if (response.data.userId && response.data.userStatus == 1) {

                                    axios.get('http://praksa3.mars-t.mars-hosting.com/api/article/deleteArticle', {
                                        params: {
                                            id: deleteID
                                        }
                                    }).then(function (response) {
                                        eventBus.$emit('deletedArticle', deleteID);
                                        // console.log('emitovanje eventBusa deletedArticle: ' + deleteID)
                                    }).catch(function (error) {
                                        console.log(error);
                                        console.log('NEUSPEH brisanja artikla ---------');
                                    });
                                }
                            })
                        }
                    }
                })
            }
        },
        created() {
            var axios = require('axios');
            var self = this;
            this.user = 0;
            axios.get('http://praksa3.mars-t.mars-hosting.com/api/login/check-session', {
                params: {
                    sid: localStorage.getItem('sid')
                }
            }).then(response => {
                if (response.data.userId && response.data.userStatus === 1) {
                    this.user = 1;
                }
            }).catch(function (error) {
                console.log(error);
                console.log('NEUSPEH CHECK SESIJE ---------');
            });
        }
    };
</script>

<style scoped>
    hr {
        margin: 0;
    }
    #poruka {
        text-align: center;
    }
    article {
        margin-bottom: 10px;
    }
    article > a {
        color: dimgray;
        transition: box-shadow 800ms;
    }
    article > a:hover {
        text-decoration: none;
        color: black;

        cursor: pointer;
        transition: 100ms;
        box-shadow: 3px 3px 30px -2px rgba(0, 0, 0, 0.75);
    }
    article > a:hover .cenaBoja {
        /*box-shadow: 0 0 30px 2px antiquewhite;*/
        background-color: antiquewhite;
    }
    article p {
        margin: 0;
        padding: 0;
    }
    article.artikal1 img {
        max-width: 100%;
        max-height: 100%;
    }
    article.artikal2 img {
        margin: 0 auto;
        max-width: 600px;
        max-height: 600px;
    }
    .cenaBoja {
        background-color: #dedede;
    }
    .divSlike {
        /*background-color: red;*/
        height: 150px;
        position: relative;
    }
    .naslovH4 {
        height: 55px;
        overflow: hidden;
    }
    #adminDugmici {
        position: absolute;
        top: 100px;
        z-index: 2;
    }
    #adminDugmici button {
        display: block;
        width: 100px;
        padding: 5px;
        border-radius: 0 10px 10px 0;
    }
    #adminDugmici button:hover {
        border: 2px solid gray;
        box-shadow: 3px 3px 30px -2px rgba(0, 0, 0, 0.75);
    }
    .akcija {
        width: 80px;
        position: absolute;
        top: -30px;
        right: -10px;
    }
    .akcijaPopust {
        position: absolute;
        top: 25%;
        width: 100%;
        text-align: center;
        color: white;
        font-weight: bold;
        transform: rotate(-7deg);
        line-height: 100%;
    }
    .datum {
        font-size: 0.7em;
        font-style: italic;
        position: absolute;
        bottom: -30px;
        right: 0px;
        width: 86px;
        text-align: center;
        color: white;
        transform: rotate(-7deg);
        line-height: 100%;
    }
    .prazanProstor {
        background-color: white;
        height: 28px;
    }
</style>
