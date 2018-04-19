<template>
  <div>

    <div class="modal overlay2" id="mymodalregister">
        <form class="form-register">



        <div class="container">
          <a class="iks" data-dismiss="modal">X</a>
          <div class="row main">
            <div class="panel-heading">
                     <div class="panel-title text-center">
                        <h1 class="title">Pet-shop</h1>
                        <hr />
                      </div>
                  </div>
            <div class="main-login main-center">
              <form class="form-horizontal" id="myForm"  @submit.prevent="signup()">

                <div class="form-group">
                  <label for="name" class="cols-sm-2 control-label">Ime</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                      <input type="text" class="form-control" minlength="2" maxlength="30"  v-model="name" name="name"   placeholder="Unesite ime" required>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="lastname" class="cols-sm-2 control-label">Prezime</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                      <input type="text" class="form-control" minlength="2" maxlength="30" v-model="lastname" name="lastname"  placeholder="Unesite prezime" required>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="phone" class="cols-sm-2 control-label">Telefon</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-mobile" aria-hidden="true"></i></span>
                      <input type="text" class="form-control" minlength="2" maxlength="30" v-model="phone" name="phone"  placeholder="Unesite telefon" required>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="email" class="cols-sm-2 control-label">Email</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                      <input type="email" class="form-control" v-model="email"  name="regemail"  placeholder="Unesite Email" required>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="password" class="cols-sm-2 control-label">Sifra</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                      <input type="password" class="form-control" minlength="6" maxlength="30" v-model="password" name="regpassword" placeholder="Unesite sifru" :class="[{'valid': valid}, {'notValid': notValid}]" @keyup="con()" required>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="confirm" class="cols-sm-2 control-label">Potrvrdite Sifru</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                      <input type="password" class="form-control" v-model="passwordconf" name="confirm"   placeholder="Potvrdite vasu sifru" :class="[{'valid': valid}, {'notValid': notValid}]" @keyup="con()" required>
                    </div>
                  </div>
                </div>

                <div class="form-group ">
                  <button  type="submit" class="btn btn-primary btn-lg btn-block login-button">Registruj se</button>
                </div>
                <div class="login-register">
                  <a class="btn btn-secondary " style="color:white;" data-toggle="modal" data-target="#mymodallogin" @click="displayLogin()">Uloguj se</a>
               </div>
              </form>
            </div>
          </div>
        </div>
        </form>
    </div><!-- Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Email već postoji u bazi</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" @click="redirect(1)" data-dismiss="modal">Probaj ponovo</button>
            <button type="button" class="btn btn-info" @click="redirect(0)" data-dismiss="modal">Otkazi</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../../main';
import sha256 from 'sha256';

export default {
    data() {
        return {
          name: '',
          lastname: '',
          phone: '',
            email: '',
            password:'',
            passwordconf:'',
            hash: '',
            valid: false,
      			notValid: false
        }
    },
    methods: {
     displayLogin() {
       $('#mymodalregister').modal('hide');
    },
    con(){
			if(this.password==this.passwordconf){
				this.valid = true;
				this.notValid = false;
			}else {
				this.notValid = true;
				this.valid = false;
			}
		},
    signup(){

      if(this.password==this.passwordconf){
        var app = this;
        this.hash = sha256(this.password+this.email);
        axios.post('http://praksa3.mars-t.mars-hosting.com/api/login/register', {
					name: this.name,
					lastname: this.lastname,
					phone: this.phone,
					email: this.email,
					password: this.hash
				})
        .then( response => {
          if (response.data.result == 'email-exists') {
            $('#registerModal').modal('show');
          } else{

            let korisnik = response.data.korisnik;
            if (korisnik) {
                 $('#mymodalregister').modal('hide');
              localStorage.setItem('sid', response.data.sid);
              eventBus.$emit('userLogin', korisnik);
                app.$router.push('/');
              } else {

            }
          }
        })
      }else{
        this.notValid = true;
				this.valid = false;
      }
		},
    redirect(value){
      if (value == 1) {
        this.displayLogin();
      } else{
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.overlay2 {
  top: 0;
  bottom: 0;
  padding: 50px 0;
  text-align: center;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.iks{
  padding: 3px 15px 10px 20px;
  background-color: red;
   position: relative;left: 152px;
   border-radius: 0 0 0 30px;
   cursor: pointer;
}
.form-register {
  max-width: 350px;
  min-width: 350px;
  padding: 0px 65px 15px;
  margin: 0 auto;
  background-color: #fff;
}
.centered-form {
  margin-top: 60px;
}
.centered-form .panel {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: rgba(0, 0, 0, 0.3) 20px 20px 20px;
}
label.label-floatlabel {
  font-weight: bold;
  color: #46b8da;
  font-size: 11px;
}
.valid{
	color:green;
	border: 1px solid green;
  }
.notValid{
  	color:red;
		border: 1px solid red;
	}
  .modal-title{
    color: #D02D2D;
  }
</style>
