<template>
	<div class="container">
		<div class="row">
			<div v-for="banner in banners" class="banner" :class="banner.offset" v-if="banner.bnr_active === 1">
				<div
					class="title"
						:style="{
							color: banner.bnr_textTitleColor,
							background: banner.bnr_bcgTitleColor,
							bottom: banner.bnr_bottomPosition,
							top: banner.bnr_topPosition
						}">
						{{ banner.bnr_title }}
					</div> <!-- .title -->
				<a target="_blank" :href="banner.bnr_link">
					<img class="img-fluid" :style="{background: 'linear-gradient('+banner.bnr_bcgColor1+','+ banner.bnr_bcgColor2+')'}" :src="'http://praksa3.mars-t.mars-hosting.com/api/get-banner-image/'+banner.bnr_location" alt="mars">
				</a>
			</div> <!-- .banner -->
			<div class="set-margin d-block d-sm-none d-none d-sm-block d-md-none">.</div>
		</div> <!-- .row -->
	</div> <!-- .container -->
</template>

<script>
	import axios from 'axios';
	import { eventBus } from '../../main';

	export default{
		data(){
			return {
				banners: [],
				userStatus: 0,
				sid: ''
			}
		},
		created(){
			console.log(this.$route.path);
			axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/get-banner').then( response => {
				this.banners = response.data.banner;
				console.log(this.banners);
				for(let i=0; i<this.banners.length; i++){
					if (this.banners.length == 2) {
						if (i / 1 == 0) {
							this.banners[i].offset = 'col-md-5 col-sm-12 col-xs-12 .d-none .d-sm-block';
						} else if (i / 1 == 1) {
							this.banners[i].offset = 'col-md-5 offset-md-2 col-sm-12 col-xs-12 .d-none .d-sm-block';
						}
					} else{
						if (this.banners[i].bnr_location == 1) {
							this.banners[i].offset = 'col-md-5 col-sm-12 col-xs-12 .d-none .d-sm-block';
						} else{
							this.banners[i].offset = 'col-md-5 offset-md-7 col-sm-12 col-xs-12 .d-none .d-sm-block';
						}
					}
				}
			});
			if (localStorage.getItem('sid')) {
				axios.get('http://praksa3.mars-t.mars-hosting.com/api/login/check-session', {
					params: {
						sid: localStorage.getItem('sid')
					}
				})
				.then(response => {
					if (response.data.userId) {
						this.userStatus = response.data.userStatus;
					}
				});
			}
      eventBus.$on('userLogin', korisnik => {
        this.userStatus = korisnik.usr_status;
        this.userName = korisnik.usr_firstname;
      });
      eventBus.$on('userLogout', () => {
      	this.userStatus = 0;
      });
		}
	}
</script>

<style scoped>
	img{
		width: 600px;
		height: 130px;
		background: linear-gradient(#000000, #2D28A0);
	}
	.banner{
		padding: 0;
		position: relative;
		margin-bottom: 10px;
		float: left !important;
	}
	.banner:nth-of-type(2){
		float: right;
	}
	#adminDugmici {
		position: absolute;
		top: 0px;
		z-index: 2;
	}
	#adminDugmici button {
		display: block;
		width: 100px;
		padding: 5px;
		border-radius: 10px;
	}
	#adminDugmici button:hover {
		border: 2px solid gray;
		box-shadow: 3px 3px 30px -2px rgba(0, 0, 0, 0.75);
	}
	.title{
		min-width: 100%;
		position: absolute;
		text-align: center;
		font-weight: bold;
		line-height: 26px;
	}
	.set-margin{
		height: 40px;
		color: #fff;
	}
</style>


