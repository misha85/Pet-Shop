<template>
	<div class="container ">
		<div class="row" style="border-top: 10px">
			<div class="col-md-12">
				<div class="container podaci">
					<div class="row kontakt">
						<div id="googleMapa" class="col-lg-7">
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.991290002938!2d20.40266991577156!3d44.82174208410095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a6578f322d81d%3A0xc3c49cc612bcb881!2z0J3QsNGA0L7QtNC90LjRhSDRhdC10YDQvtGY0LAgNjMsINCR0LXQvtCz0YDQsNC0!5e0!3m2!1ssr!2srs!4v1518614998556" width="100%" height="450" frameborder="0" allowfullscreen></iframe>
						</div>
						<div class="col-lg-5">
							<div class="offset-md-2 offset-lg-0 col-md-8 col-lg-12">
								<p><i class="fa fa-home"></i> Narodnih heroja 63 (lok. 26), Novi Beograd</p>
								<hr>
								<p><i class="fa fa-phone"></i> 061 303 90 70</p>
								<hr>
								<p><i class="fa fa-envelope"></i> tacinpetshop@gmail.com</p>
								<hr>
								<p><i class="fa fa-globe"></i> www.5sop.rs</p>
								<hr>
								<p><a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook-square"></i> Facebook</a></p>
								<hr>
								<p><i class="fa fa-clock"></i> Radno vreme 09:30-19h (Subota 09:30-15h)</p>
							</div>
						</div>

					</div> <!-- .kontakt -->

				</div> <!-- .container -->
			</div>
		</div>
		<div class="col-md-12 kontaktforma" style="display: none;">
			<div class="well well-sm">
				<form>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<input type="email" class="form-control" id="email" placeholder="Vaš email" required="required"/>
							</div>
							<div class="form-group">
								<div class="input-group">
							<span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span>
							</span>
								<input type="text" class="form-control" id="name" placeholder="naslov..." required="required"/>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<textarea name="message" id="message" class="form-control" rows="9" cols="25" required="required"
										  placeholder="Poruka"></textarea>
							</div>
						</div>
						<div class="col-md-12">
							<button @click.prevent="sendMessage" class="btn btn-primary pull-right dugmeee" id="btnContactUs">Pošalji poruku</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {

		data() {
			return {
			}
		},
		methods:{
		}
	}
</script>

<style scoped>
	#googleMapa {
		margin: 0 auto;
	}
	.dugmeee {
		margin-bottom: 15px;
	}
	.podaci {
		margin-bottom: 20px;
		background-color: #f5f5f5;
		border: 1px solid #e3e3e3;
	}
	.kontaktforma {
		background-color: #f5f5f5;
		border: 1px solid #e3e3e3;
	}
	.kontakt {
		margin-top: 15px;
	}
	.kontakt a:link,
	.kontakt a:visited {
		color: #212529;
	}
</style>
