<template>
<div>
  <h1 class="naslovv">Korisnici</h1>
  <div class="body">
    <div class="container">
      <div style="background-color:white;">
        <vue-good-table
				title="Korisnici"
  			:columns="columns"
        :defaultSortBy="{field: 'usr_firstname', type: 'asc'}"
  			:rows="returnusers"
				:globalSearch="true"
  			:lineNumbers="true"
  			:paginate="true"
        styleClass="table condensed table-bordered table-striped">
          <template slot="table-row" slot-scope="props">
	                    <td>{{props.row.usr_firstname}}</td>
	                    <td>{{props.row.usr_lastname}}</td>
	                    <td>{{props.row.usr_email}}</td>
	                    <td>{{props.row.usr_phone}}</td>
                      <td v-if="props.row.usr_status ===1"><button class="btn btn-primary"  data-toggle="modal" data-target="#mymodal1" @click.prevent="idskini(props.row.usr_id)" >Admin</button></td>
                      <td v-else><button class="btn btn-primary" data-toggle="modal" data-target="#mymodal2" @click.prevent="iddodaj(props.row.usr_id)" >Korisnik</button></td>
	                    <td>{{props.row.usr_created}}</td>
                      <td v-if="props.row.usr_photo===null" ><img src="../../assets/bird.png" style="width:100px;" alt="..."></td>
	                    <td v-else><img style="width:100px;" :src="'data:text/html;base64,' + props.row.usr_photo" class="rounded float-right"></td>
	                    <td><button class="btn btn-danger" data-toggle="modal" data-target="#mymodal3" @click.prevent="idobrisi(props.row.usr_id)" ><i class="fas fa-trash-alt fa-3x"></i></button></td>
							 </template>
        </vue-good-table>
      </div>
    </div>
  </div>
  <div class="modal" id="mymodal1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Ukloni admina</h1>
          <button type="button" class="close" name="button" data-dismiss="modal">X</button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-12 personal-info">
                <div class="alert alert-danger ">

                Da li ste sigurni da zelite da ukloni admina ovom korisniku?
                </div>
              </div>
            </div>
          </div>
          <div class="dugmee">
            <button class="btn btn-success" style="margin-left:90px;" data-dismiss="modal" @click.prevent="adminskini(skiniadmin)" >Ukloni admina</button>
            <button class="btn btn-primary" style="margin-left:90px;" data-dismiss="modal">Ponisti</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="mymodal2">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Dodaj admina</h1>
          <button type="button" class="close" name="button" data-dismiss="modal">X</button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-12 personal-info">
                <div class="alert alert-danger ">

                Da li ste sigurni da zelite da dodate admina ovom korisniku?
                </div>


              </div>

            </div>
          </div>
          <div class="dugmee">
            <button class="btn btn-success" style="margin-left:90px;" data-dismiss="modal" @click.prevent="admindodaj(dodajadmin)">Dodaj admina</button>
            <button class="btn btn-primary" style="margin-left:90px;" data-dismiss="modal">Ponisti</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="mymodal3">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Obrisi korisnika</h1>
          <button type="button" class="close" name="button" data-dismiss="modal">X</button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-12 personal-info">
                <div class="alert alert-danger ">

                Da li ste sigurni da zelite da obrisete korisnika?
                </div>


              </div>

            </div>
          </div>
          <div class="dugmee">
            <button class="btn btn-success" style="margin-left:90px;" data-dismiss="modal" @click.prevent="obrisikorisnika(obrisi)">Obrisi korisnika</button>
            <button class="btn btn-primary" style="margin-left:90px;" data-dismiss="modal">Ponisti</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {

  name: 'test',
  data() {
    return {
      dodajadmin: '',
      skiniadmin: '',
      obrisi: '',
      user: [],
      columns: [{
          label: 'Ime',
            field: 'usr_firstname',
          // filterable: true,
        },
        {
          label: 'Prezime',
            field: 'usr_lastname',
          // filterable: true,
        },
        {
          label: 'Email',
            field: 'usr_email',
          // filterable: true,
        },
        {
          label: 'Telefon',
            field: 'usr_phone',
        },
        {
          label: 'Status',
            // field: 'usr_status',

        },
        {
          label: 'Datum kreiranja',
            field: 'usr_created',
        },
        {
          label: 'Avatar',
            field: 'usr_photo',
        },
        {
          label: 'Obrisi',
            // field: 'Obrisi korisnika',
        },
      ],
    }
  },
  computed: {
    returnusers:function(){
      return this.user;
    },
    getUser: function() {
      for (var i = 0; i < this.user.length; i++) {
        this.user[i].usr_photo = 'data:text/html;base64,' + this.user[i].usr_photo;
      }
      return this.user;
    }
  },
  watch: {

 },



  methods: {
    idskini(id){
      this.skiniadmin=id;
    },
    iddodaj(id){
      this.dodajadmin=id;
    },
    idobrisi(id){
      this.obrisi=id;
    },

    admindodaj(id){
      var self =this;
      axios.post('http://praksa3.mars-t.mars-hosting.com/api/users/dodajadmina', {
				usr_id: id,
			})
			.then(response => {
        for(var i=0;i<self.user.length;i++){
          if(self.user[i].usr_id===id){
            self.user[i].usr_status=1;
          }
        }
			})
    },

    adminskini(id){
      var self =this;
      axios.post('http://praksa3.mars-t.mars-hosting.com/api/users/skiniadmina', {
				usr_id: id,
			})
			.then(response => {

        for(var i=0;i<self.user.length;i++){
          if(self.user[i].usr_id===id){
            self.user[i].usr_status=2;
          }
        }

			})
    },
    obrisikorisnika(id){
      var self =this;
      axios.post('http://praksa3.mars-t.mars-hosting.com/api/users/obrisikorisnika', {
				usr_id: id,
			})
			.then(response => {
        for(var i=0;i<self.user.length;i++){
          if(self.user[i].usr_id===id){
            self.user.splice(i,1);
          }
        }
			})
    },
  },


  created() {
    var self = this;
    var axios = require('axios');

    axios.get('http://praksa3.mars-t.mars-hosting.com/api/users/svikorisnici')
      .then(function(response) {

        self.user = response.data.getUser;

      })
      .catch(function(error) {
        console.warn(error);

      });
    if (localStorage.getItem('sid') == null) {
      this.$router.push('/');
    };
  }
}
</script>

<style scoped>
.red {
  margin-left: 50px;
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
  box-shadow: 2px 2px 7px #CBC5C5;
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
</style>
