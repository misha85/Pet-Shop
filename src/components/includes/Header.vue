<template>
    <header>
        <div class="container-fluid">
            <div class="row navbar" id="headerBg">
                <div class="container">

                    <nav class="navbar navbar-expand-lg navbar-dark">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <!--  navbar-togler -->
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <router-link to='/' class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" active-class="active" exact>Početna</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link to='/artikli' class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" active-class="active" exact>Artikli</router-link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Info</a>
                                    <div class="dropdown-menu">
                                        <router-link class="dropdown-item" to="/info/o-nama" data-toggle="collapse" data-target=".navbar-collapse.show" active-class="active" exact>O nama</router-link>
                                        <div class="dropdown-divider"></div>
                                        <router-link class="dropdown-item" to="/info/o-zivotinjama" data-toggle="collapse" data-target=".navbar-collapse.show" active-class="active" exact>O životinjama</router-link>
                                        <router-link class="dropdown-item" to="/info/o-hrani" data-toggle="collapse" data-target=".navbar-collapse.show" active-class="active" exact>O hrani</router-link>
                                    </div>
                                    <!--  dropdown-menu -->
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/blog" exact-active-class="is-active" data-toggle="collapse" data-target=".navbar-collapse.show" active-class="active" exact>Blog</router-link>
                                </li>
                                <li class="nav-item">

                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link" to="/kontakt" data-toggle="collapse" data-target=".navbar-collapse.show" active-class="active" exact>Kontakt</router-link>
                                </li>

                                <!-- <li class="nav-item" v-if="localStorage == ''"> -->

                                <!-- <li class="nav-item" v-else> -->
                                <li class="nav-item" v-if="userStatus === 0">
                                    <a class="nav-link" data-toggle="modal" data-target="#mymodallogin" >Uloguj se</a>
                                </li>

                                <ul class="nav-item dropdown" v-else>

                                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <small>Hello {{ userName }} {{userPhoto}}<i class="fas fa-user-circle"></i></small>
                                    </a>
                                    <div class="dropdown-menu">
                                        <router-link tag="li" class="btn btn-default btn-xs" :to="'/usernalog/'+id" active-class="active" exact>
                                            <i class="fa fa-cogs" aria-hidden="true"></i> Izmeni nalog
                                        </router-link>

                                        <div class="navbar-footer">
                                            <div class="navbar-footer-content">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <a class="btn btn-default btn-xs" data-toggle="modal" data-target="#mymodal11"><i class="fa fa-unlock-alt" aria-hidden="true"></i> Promeni Lozinku</a>
                                                    </div>

                                                    <div class="col-md-12">
                                                        <div class="dropdown-divider"></div>
                                                        <a class="btn btn-default btn-xs" @click="displayLogout()"><i class="fa fa-power-off" aria-hidden="true"></i> Izloguj se</a>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ul>

                            </ul>
                            <!--  navbar-nav -->
                        </div>
                        <!--  navbar-collapse -->
                    </nav>
                    <!--  navbar-expand -->

                    <div class="row">
                        <div class="col-3 d-none d-sm-block d-xs-block">
                            <router-link to='/' class="nav-link"><img src="../../assets/logo.png" class="nav-item">
                            </router-link>
                        </div><!--  col-3 -->
                    </div>
                </div>
                <!--  container -->
            </div>
            <!--  row -->
        </div>
        <div class="modal" id="mymodal11">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title">Promenite Lozinku</h1>
                        <button type="button" class="close" name="button" data-dismiss="modal">X</button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <!-- <div class="row"> -->
                            <div class="col-md-12 personal-info">
                                <div class="alert alert-warning ">
                                    Da li ste sigurni da zelite da promenite Lozinku?
                                </div>
                            </div>
                            <form class="" action="index.html" method="post">

                                <div class="form-group">
                                    <label class="col-md-12 control-label libela">Email:</label>
                                    <div class="col-md-8">
                                        <input class="form-control" type="text" v-model="email">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12 control-label libela">Trenutna Lozinka:</label>
                                    <div class="col-md-8">
                                        <input class="form-control" type="password" v-model="trenutnasifra">
                                    </div>
                                </div>

                                <div class="form-group ">
                                    <label class="col-md-12 control-label libela">Nova Lozinka:</label>
                                    <div class="col-md-8">
                                        <input class="form-control" type="password" v-model="password" id="password" :class="[{'valid': valid}, {'notValid': notValid}]" @keyup="confff()">
                                    </div>
                                </div>
                                <div class="form-group ">
                                    <label class="col-md-12 control-label libela">Potvrdi novu Lozinku:</label>
                                    <div class="col-md-8">
                                        <input class="form-control" type="password" v-model="passwordconff" :class="[{'valid': valid}, {'notValid': notValid}]" @keyup="confff()">
                                    </div>
                                </div>
                            </form>
                            <!-- </div> -->
                            <div class="row">
                                <div class="col-5">
                                    <button class="btn btn-success" @click.prevent="promeniSifru()">Promeni sifru</button>
                                </div>
                                <div class="col-7">
                                    <button class="btn btn-primary" data-dismiss="modal">Ponisti</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="mymodal22">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title">  Cestitamo,uspesno ste promenili Lozinku.</h1>
                        <button type="button" class="close" name="button" data-dismiss="modal">X</button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <!-- <div class="row"> -->
                            <div class="col-md-12 personal-info">
                                <div class="alert alert-success ">
                                    Cestitamo,uspesno ste promenili Lozinku.
                                </div>
                            </div>

                            <!-- </div> -->
                            <div class="row">

                                <div class="col-12 dugmeok">
                                    <button class="btn btn-primary" data-dismiss="modal">OK</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="mymodal33" style="margin-top:250px">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title">Pogresna Lozinka!</h1>
                        <button type="button" class="close" name="button" data-dismiss="modal">X</button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <!-- <div class="row"> -->
                            <div class="col-md-12 personal-info">
                                <div class="alert alert-danger ">
                                    Pogresna trenutna Lozinka!
                                </div>
                            </div>

                            <!-- </div> -->
                            <div class="row">

                                <div class="col-12 dugmeok">
                                    <button class="btn btn-primary" data-dismiss="modal">OK</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="mymodal44" style="margin-top:250px">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title">Pogresan email ili sifra!</h1>
                        <button type="button" class="close" name="button" data-dismiss="modal">X</button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <!-- <div class="row"> -->
                            <div class="col-md-12 personal-info">
                                <div class="alert alert-danger ">
                                    Pogresan email ili sifra!
                                </div>
                            </div>

                            <!-- </div> -->
                            <div class="row">

                                <div class="col-12 dugmeok">
                                    <button class="btn btn-primary" data-dismiss="modal">OK</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!--  container-fluid -->
        <app-login></app-login>
        <app-headeradmin :notAdmin="notAdmin" v-if="userStatus === 1"></app-headeradmin>
    </header>
</template>

<script>
    import axios from 'axios'
    import Login from '../login/Login'
    import HeaderAdmin from './HeaderAdmin.vue'
    import {eventBus} from '../../main'
    import sha256 from 'sha256'
    export default {
        components: {
            'app-login': Login,
            'app-headeradmin': HeaderAdmin
        },
        data() {
            return {
                id: '',
                userName: '',
                userPhoto: '',
                userStatus: 0,
                user: {},
                valid: false,
                notValid: false,
                password: '',
                passwordconff: '',
                trenutnasifra: '',
                email: '',
                hash: '',
                hashstara: ''

            }
        },
        methods: {
            promeniSifru() {
                var app = this;
                // if (this.trenutnasifra=this.user.usr_password)
                // console.log(this.trenutnasifra);
                // console.log(this.id);
                // console.log(this.password);
                app.hashstara = sha256(app.trenutnasifra + app.email);
                app.hash = sha256(app.password + app.email);

                if (app.password === app.passwordconff) {
                    axios.post('http://praksa3.mars-t.mars-hosting.com/api/users/promenasifre', {
                        usr_id: app.id,
                        usr_password: app.hash,
                        sifrastara: app.hashstara
                    })
                        .then(response => {
                            if (response.data.res === null) {
                                $('#mymodal33').modal('show');
                            }
                            else {
                                $('#mymodal11').modal('hide');
                                $('#mymodal22').modal('show');
                            }
                        });
                } else {
                    $('#mymodal44').modal('show');
                }
            },
            confff() {

                if (this.password == this.passwordconff) {
                    this.valid = true;
                    this.notValid = false;
                } else {
                    this.notValid = true;
                    this.valid = false;
                }
            },
            displayLogout() {
                axios.get('http://praksa3.mars-t.mars-hosting.com/api/login/logout');
                this.userStatus = 0;
                localStorage.removeItem('sid');
                eventBus.$emit('userLogout');
                this.$router.push('/');
            },
            userLogin(korisnik) {
                console.log(korisnik);
                this.id = korisnik.usr_id;
                this.userStatus = korisnik.usr_status;
                this.userName = korisnik.usr_firstname;
            },
            notAdmin() {
                this.userStatus = 0;
            }
        },
        created() {
            if (localStorage.getItem('sid')) {
                axios.get('http://praksa3.mars-t.mars-hosting.com/api/login/check-session', {
                    params: {
                        sid: localStorage.getItem('sid')
                    }
                })
                    .then(response => {
                        if (response.data.userId) {
                            this.userStatus = response.data.userStatus;
                            this.id = response.data.userId;
                            this.userName = response.data.userName;
                        }
                    })
            }
            eventBus.$on('userLogin', korisnik => {
                this.id = korisnik.usr_id;
                this.userStatus = korisnik.usr_status;
                this.userName = korisnik.usr_firstname;
            })
            eventBus.$on('editBanner', () => {
                this.showBanner = false;
            })
            // eventBus.$on('slika', image => {
            //     this.userImage=image;
            // })
        },
        // mounted() {
        //     $('#modallogin').on('hidden.bs.modal', (e) => {
        //            $(this).removeData('bs.modal');
        //     })
        // },
        watch:{
          '$route.path'(){
            if (this.$route.path == '/admin/izmeni-baner/1' || this.$route.path == '/admin/izmeni-baner/2') {

            } else{
              this.showBanner = true;
            }
          }
        }
    }
</script>
<!-- misha@google.com -->
<style scoped>
    .dugmeok {
        text-align: center;
    }
    .valid {
        color: green;
        border: 1px solid green;
    }
    .notValid {
        color: red;
        border: 1px solid red;
    }
    .navbar img {
        width: 200px;
        vertical-align: text-bottom;
    }
    li a {
        cursor: pointer;
    }
    small {
        color: #fff;
        text-transform: capitalize;
    }
    @media screen and (max-width: 768px){
        header {
            font-size : 1.2em;
        }
    }
    #headerBg {
        /*background-color: #30288D;*/
        background: linear-gradient(to bottom, #30288D 40%, #007bff 140%);
    }
</style>
