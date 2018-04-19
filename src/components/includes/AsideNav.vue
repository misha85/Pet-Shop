<template>
    <aside class="col-3 col-lg-2">
        <div style="display: none" v-for="grp in groups">{{grp}}</div>
        <ul class="nav flex-column nav-pills">
            <li class="nav-item">
                <router-link :to="{ name: 'SelectAll'}" class="nav-link">Svi Artikli <img class="float-right" src="../../assets/sveZivuljke.png" alt="img"></router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'SelectGroup', params: {idGroup: 0 , nameGroup: 'akcije'}}" class="nav-link">Akcije
                    <img class="float-right" src="../../assets/sale-sales.svg" alt="img"></router-link>
            </li>
            <li class="nav-item" v-for="cat in categories">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="">
                    <span style="width: 60px; display: inline-block;">{{cat.cat_name}}</span>
                    <!--<img class="float-right" :src="'data:text/html;base64,' + cat.cat_photo" alt="img"></a>-->
                    <img class="float-right" :src="'http://praksa3.mars-t.mars-hosting.com/api/category-get-images/' + cat.cat_id" alt="img"></a>
                <ul class="dropdown-menu flex-column">
                    <li class="nav-item" v-for="grp in cat.groups">
                        <router-link :to="{ name: 'SelectGroup', params: {idGroup: grp.grp_id , nameGroup: grp.grp_name}}" class="nav-link" href="">{{grp.grp_name}}
                            <img class="float-right" :src="'http://praksa3.mars-t.mars-hosting.com/api/groups-get-images/'+grp.grp_id" alt="grpImg">
                        </router-link>
                        <!--<img class="float-right" :src="getGroupsPhoto + grp.grp_id" alt="grpImg"> </a>-->
                    </li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                categories: [],
                groups: [],
            }
        },
        // computed: {
        //     getCategories: function () {
        //         for (var i = 0; i < this.categories.length; i++) {
        //             this.categories[i].cat_photo = 'data:text/html;base64,' + this.categories[i].cat_photo;
        //             console.log(this.categories[0].groups)
        //             // for (var j = 0; j < this.categories[i].groups.length; i++) {
        //             //     this.categories[i].groups[j].grp_photo =  'data:text/html;base64,' + this.categories[i].groups[j].grp_photo;
        //             // }
        //         }
        //         return this.categories;
        //     }
        // },
        created() {
            var self = this;
            var axios = require('axios');


            axios.get('http://praksa3.mars-t.mars-hosting.com/api/category/categories')
                .then(function (response) {
                    // console.log('categories ++++++++++');
                    // console.log(response.data.getCategories);
                    self.categories = response.data.getCategories;
                    axios.get('http://praksa3.mars-t.mars-hosting.com/api/groups/groups')
                        .then(function (response) {
                            // console.log('groups ++++++++++');
                            // console.log(response.data.getGroups);
                            self.groups = response.data.getGroups;
                            for (var i = 0; i < self.categories.length; i++) {
                                self.categories[i].groups = [];
                                for (var j = 0; j < self.groups.length; j++) {
                                    // self.groups[j].grp_photo = 'data:text/html;base64,' + self.groups[j].grp_photo;
                                    // console.log(self.groups[j]);
                                    if (self.categories[i].cat_id === self.groups[j].cat_id) {
                                        self.categories[i].groups.push(self.groups[j]);
                                    }
                                }
                                // console.warn(self.categories[i].groups);
                            }
                        })
                        .catch(function (error) {
                            console.warn(error);
                            console.warn('NEUSPEH groups ---------');
                        });
                })
                .catch(function (error) {
                    console.warn(error);
                    console.warn('NEUSPEH categories ---------');
                });
        }
    };
</script>

<style scoped>
    aside {
        padding: 0;
    }
    p {
        text-align: center;
        margin: 20px;
    }
    aside {
        padding: 0;
        background-color: #e9ecef;
    }
    aside ul {
        padding: 0;
        margin: 0;
        width: 100%;
    }
    aside ul li:hover {
        background-color: #45a9d8;
        border-radius: 5px;
    }
    aside ul li a:active {
        background-color: #0359eb;
        color: white;
        border-radius: 5px;
    }
    aside li a {
        height: 70px;
    }
    aside li img {
        height: 45px;
    }
    aside li a span {
        text-transform: capitalize;
    }
</style>