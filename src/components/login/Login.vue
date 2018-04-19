<template>
<div>
	<div class="modal overlay" id="mymodallogin">
		<div class="wrapper">
			<form class="form-signin" id="login">
				<p class="close" data-dismiss="modal">x</p>
				<h2 class="form-signin-heading">Upisite podatke</h2>
				<input type="text" class="form-control poravnan" v-model="email" name="email" placeholder="Email Address" required="" autofocus="" />
				<input type="password" class="form-control" v-model="password" name="password" placeholder="Password" required="" />
				<button class="btn btn-primary  btn-block" type="submit" @click.prevent="signin()">Uloguj se</button>
				<div class="row" style="padding-top: 16px;">
					<div class="col-12">

							<span class="btn btn-secondary "><a data-toggle="modal" data-target="#mymodalregister" @click="displaySignUp()">registruj se</a></span>
					</div>



				</div>
			</form>
		</div>
	</div>
	<div class="modal" id="mymodalpogresna" style="margin-top:250px">
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
import axios from 'axios';
import { eventBus } from '../../main';
import sha256 from 'sha256';

export default {
	data() {
		return {
			user: [],
			email: '',
			password: '',
			hash: ''
		}
	},

	methods: {
		displaySignUp() {
			$('#mymodallogin').modal('hide');
		},

		signin() {

			var app = this;
			app.hash = sha256(app.password+app.email);
			axios.post('http://praksa3.mars-t.mars-hosting.com/api/login/login', {
					user: {
						email: app.email,
						password: app.hash
					}
				})
				.then(function(response) {
					let korisnik = response.data.korisnik;
					if (korisnik) {
									$('#mymodallogin').modal('hide');
						localStorage.setItem('sid', response.data.sid);
						eventBus.$emit('userLogin', korisnik);
                app.$router.push('/');
            } else {
							 $('#mymodalpogresna').modal('show');
					}
				})
				.catch(function(error) {
					console.warn(error);
				});
		}
	}
}
</script>

<style scoped>
.poravnan{
	    text-align: left;
}
.dugmeok{
  text-align: center;
}
	h2 {
		margin-top: 30px;
	}

	.close {
		right: 0px;
		top: 0;
		color: #000;
		font-size: 35px;
		font-weight: bold;
	}



	.wrapper {
		margin-top: 80px;
		margin-bottom: 80px;
	}

	.form-signin {
		max-width: 380px;
		padding: 15px 35px 18px;
		margin: 0 auto;
		background-color: #fff;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}


	.form-signin-heading,
	.checkbox {
		margin-bottom: 30px;
	}

	.checkbox {
		font-weight: normal;
	}

	.form-control {
		position: relative;
		font-size: 16px;
		height: auto;
		padding: 10px;
		@include box-sizing(border-box);
	}

	input[type="text"] {
		margin-bottom: -1px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	input[type="password"] {
		margin-bottom: 20px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.overlay {
		top: 0;
		padding: 170px 0;
		text-align: center;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.6);

	}
</style>
