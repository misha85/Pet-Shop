<template>
  <header>
    <div class="container-fluid">
      <div class="row navbar navbar-dark bgg">
        <div class="container">
          <nav class="navbar navbar-expand-lg">

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav2" aria-controls="navbarNav2" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span></button>
              <!--  navbar-togler -->

              <div class="collapse navbar-collapse col-12" id="navbarNav2">

                <ul class="navbar-nav">
                  <li class="nav-item">
                    <router-link to='/admin/pocetna' class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" active-class="active" exact>Početna</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/admin/blog" data-toggle="collapse" data-target=".navbar-collapse.show" active-class="active" exact>Blog
                      <span class="badge badge-danger" data-toggle="tooltip" data-placement="bottom" title="Broj nepotvrđenih komentara">{{ numComments }}</span>
                    </router-link>
                  </li>

                  <li class="nav-item" v-if="id ===1">

                    <router-link  class="nav-link" to="/admin/korisnici" active-class="active" exact>Korisnici</router-link>
                  </li>
                </ul><!--  navbar-nav -->

              </div>
              <!--  navbar-collapse -->
            </nav> <!--  navbar-expand -->

          </div>
          <!--  container -->
        </div>
        <!--  row -->
      </div>

      <!--  container-fluid -->
    </header>
  </template>

  <script>
    import axios from 'axios';
    import { eventBus } from '../../main';

    export default {
      data() {
        return {
          numComments: 0,
          id: '',
        }
      },
      methods: {
        getNumComments() {
          axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/get-comments', {
            params: {
              component: 'header'
            }
          })
          .then((response) => {
            this.numComments = response.data.result[0].ukupno;
          })
        }
      },
      created() {
        this.getNumComments(),
        setInterval(() => {
          this.getNumComments();
        }, 10000);
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
        };
        eventBus.$on('commentChanged', () => {
          this.getNumComments();
        })
      }
    }
  </script>

  <style scoped>
    .clear{
      clear: both;
    }
    .bgg {
      /*background-color: firebrick;*/
      background: linear-gradient(to bottom, #e41619, firebrick, firebrick, #e41619 );
    }
  </style>
