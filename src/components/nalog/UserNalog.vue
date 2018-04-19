<template>
<div class="body">
  <h1 class="naslovv">Vas Profil</h1>
  <div>
    <ul class="container">
      <article v-for="usr in getUser">
        <div>
          <div class="ozivotinjama">
            <div class="row">
              <div class=" col-md-8 animated zoomInUp"  style="padding-top: 35px; text-align:center;">
                <h4 class="onama-h1">Ime:{{usr.usr_firstname}}</h4>
                <h4 class="onama-h1">Prezime:{{usr.usr_lastname}}</h4>
                <p>Email:{{usr.usr_email}}</p>
                <div><span class="small">telefon </span>{{usr.usr_phone}}</div>
                <button class="btn btn-warning" data-toggle="modal" data-target="#mymodal" @click.prevent="popuni()">Izmeni</button>
              </div>
              <div class="col-md-4 ">
                <div class="row">
                  <div class="col-12" style="text-align: center;">
                    <img :src="usr.usr_photo" class="rounded">

                    <div class="col-12">
                      <picture-input
                       ref="pictureInput"
                        :crop="false"
                         @change="onChanged"
                          @remove="onRemoved"
                           :width="150"
                            :zIndex="0"
                            :removable="true"
                             removeButtonClass="btn btn-secondary"
                              :height="150"
                              accept="image/jpeg, image/png, image/gif"
                               buttonClass="btn btn-info"
                        :customStrings="{
                   upload: '<h1>Upload it!</h1>',
                   drag: 'Kliknite ili prevucite novu sliku',
                   change: 'Promeni sliku',
         					 remove: 'Ukloni sliku',
                   }">
                      </picture-input>
                      <button class="btn btn-success" @click.prevent="dodavanjeslike()">Sacuvaj sliku</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </ul>
  </div>


  <div class="modal" id="mymodal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Izmeni Profil</h1>
          <button type="button" class="close" name="button" data-dismiss="modal">X</button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-12 personal-info">
                <div class="alert alert-info alert-dismissable">
                  <a class="panel-close close" data-dismiss="alert">×</a>
                  <i class="fa fa-user-circle"></i> Ovo su vasi <strong>podaci</strong> Izmenite ih ako zelite i potrvrdite da bi se sacuvali
                </div>

                <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label class="col-lg-3 control-label libela">Ime:</label>
                    <div class="col-lg-8">
                      <input class="form-control" type="text" v-model="firstname" :class="[{'izmene1': izmene1}]" @keyup="izmeneee1()">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label libela">Prezime:</label>
                    <div class="col-lg-8">
                      <input class="form-control" type="text" v-model="lastname" :class="[{'izmene2': izmene2}]" @keyup="izmeneee2()">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label libela">Telefon:</label>
                    <div class="col-lg-8">
                      <input class="form-control" type="text" v-model="phone" :class="[{'izmene3': izmene3}]" @keyup="izmeneee3()">
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
          <div class="dugmee">
            <button class="btn btn-success" data-dismiss="modal" @click.prevent="edit()">Sacuvaj izmene</button>
            <button class="btn btn-primary" data-dismiss="modal">Ponisti</button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="modal" id="slikauspesno">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Bravo</h1>
          <button type="button" class="close" name="button" data-dismiss="modal">X</button>
        </div>
        <div class="modal-body">
          <div class="container">
            <!-- <div class="row"> -->
              <div class="col-md-12 personal-info">
                <div class="alert alert-success ">
                Cestitamo,uspesno ste promenili sliku!
                </div>
              </div>

            <!-- </div> -->
            <div class="row">

              <div class="col-12 dugmeok">
                <button class="btn btn-primary"  data-dismiss="modal">OK</button>
              </div>


            </div>
          </div>

        </div>
      </div>
    </div>
  </div>


</div>
</template>

<script>
import PictureInput from 'vue-picture-input';
import { eventBus } from '../../main';
import axios from 'axios';
import {
  sha256,
  sha224
} from 'js-sha256';
export default {
  components: {
    PictureInput
  },
  data() {
    return {
      user: [],
      id: null,
      firstname: '',
      lastname: '',
      phone: '',
      password: '',
      passwordconf: '',
      conf: false,
      izmene1: false,
      izmene2: false,
      izmene3: false,
      valid: false,
      notValid: false,
      image: '',
      // hash: sha256.update('nesto'),
      // hashprovera: sha256.update('nesto'),
    }
  },
  computed: {
    getUser: function() {
      for (var i = 0; i < this.user.length; i++) {
        if(this.user[i].usr_photo===null){

        }else{
          this.user[i].usr_photo = 'data:text/html;base64,' + this.user[i].usr_photo;
        }

      }
      return this.user;

    }
  },
  methods: {
    popuni() {
      var self = this;
      this.Valid = false;
      this.notValid = false;
      this.izmene1 = false;
      this.izmene2 = false;
      this.izmene3 = false;

      var axios = require('axios');
      axios.get('http://praksa3.mars-t.mars-hosting.com/api/users/user', {
          params: {
            id: self.id
          }
        })
        .then(function(response) {
          self.firstname = response.data.getUser[0].usr_firstname;
          self.lastname = response.data.getUser[0].usr_lastname;
          self.phone = response.data.getUser[0].usr_phone;
          self.password = response.data.getUser[0].usr_password;
          self.passwordconf = response.data.getUser[0].usr_password;

        })
        .catch(function(error) {
          console.warn(error);
        });
    },


    confff() {

      if (this.password == this.passwordconf) {
        this.valid = true;
        this.notValid = false;
      } else {
        this.notValid = true;
        this.valid = false;
      }
    },
    izmeneee1() {
      this.izmene1 = true;
    },
    izmeneee2() {
      this.izmene2 = true;
    },
    izmeneee3() {
      this.izmene3 = true;
    },
    edit() {
      var self =this;
      if (self.password == self.passwordconf) {
        axios.post('http://praksa3.mars-t.mars-hosting.com/api/users/edituser', {
            usr_id: self.$route.params.id,
            usr_firstname: self.firstname,
            usr_lastname: self.lastname,
            usr_phone: self.phone,
          })
          .then(response => {
            for(var i=0;i<self.user.length;i++){
              if(self.user[i].usr_id==self.id){
                self.user[i].usr_firstname=self.firstname;
                self.user[i].usr_lastname= self.lastname;
                self.user[i].usr_phone= self.phone;
              }
            }
          });
      } else {}
    },
    onChanged(image) {
      if (this.$refs.pictureInput[0].file) {
        this.image = this.$refs.pictureInput[0].file;
        return;
      } else {
        console.log('Error');
      }
    },
    onRemoved() {
      this.image = '';
    },
    dodavanjeslike() {
      var self = this;
      let formData = new FormData();
      formData.append('image', self.image);
      formData.append('idd', self.$route.params.id);
      axios.post('http://praksa3.mars-t.mars-hosting.com/api/users/promena-slike', formData, {
        })
        .then(response => {
          for(var i=0;i<self.user.length;i++){
            if(self.user[i].usr_id==self.id){
              self.user[i].usr_photo=null;
            }
          }
          // $('#slikauspesno').modal('show');
          // eventBus.$emit('slikaa',self.image);
        });
    }
  },
  created() {
    var self = this;
    var axios = require('axios');
    this.id = this.$route.params.id;
    axios.get('http://praksa3.mars-t.mars-hosting.com/api/users/user', {
        params: {
          id: self.id
        }
      })
      .then(function(response) {
        self.user = response.data.getUser;
      })
      .catch(function(error) {
        console.warn(error);
      });
  },
}
</script>

<style scoped>
.dugmeok{
  text-align: center;
}
.dugmee {
  text-align: center;
}

.naslovv {
  text-align: center;
}

.ozivotinjama img {
  width: 150px;
}

.ozivotinjama {
  background-color: white;
  margin: 20px;
  box-shadow: 5px 5px 15px #CBC5C5;
  overflow: hidden;
  padding: 20px;
  border-radius: 10px;
}

.onama {
  padding: 10px;
  margin: 30px -15px 0 -25px;
  box-shadow: 3px 3px 7px #98F6EE;
  overflow: hidden;
}

.body {
  background-image: url("../../assets/pozadina.jpg");
  background-size: 60%;
}

.list-group-item {
  display: flex;
}

.libela {
  max-width: 100%;
}

.izmene1 {
  color: green;
  border: 1px solid green;
}

.izmene2 {
  color: green;
  border: 1px solid green;
}

.izmene3 {
  color: green;
  border: 1px solid green;
}

.valid {
  color: green;
  border: 1px solid green;
}


.notValid {
  color: red;
  border: 1px solid red;
}
</style>
