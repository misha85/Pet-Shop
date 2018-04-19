<template>
	<div class="container">
		<div class="row">
			<div v-for="banner in banners" class="banner" :class="banner.offset">
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
					<img class="img-fluid" :style="{background: 'linear-gradient('+banner.bnr_bcgColor1+','+ banner.bnr_bcgColor2+')'}" :src="banner.imgUrl" alt="mars">
					<div id="adminDugmici">
						<router-link v-if="userStatus === 1" tag="button" class="btn btn-info" :to="'/admin/izmeni-baner/'+banner.bnr_location">
							Izmeni
							<i class="fas fa-edit"></i>
						</router-link>
						<button v-if="banner.bnr_active == 1" @click.prevent="changeBannerStatus(banner.bnr_location, 0)" class="btn btn-danger">Ukloni baner</button>
						<button v-if="banner.bnr_active == 0" @click.prevent="changeBannerStatus(banner.bnr_location, 1)" class="btn btn-success">Postavi baner</button>
					</div> <!-- .adminDugmici -->
				</a>
			</div> <!-- .banner -->
			<div class="set-margin d-block d-sm-none d-none d-sm-block d-md-none">.</div>
		</div> <!-- .row -->
	</div> <!-- .container -->
</template>

<script>
	import axios from 'axios';
	import { eventBus } from '../../../main';

	export default{
		data(){
			return {
				banners: [],
				userStatus: 0,
				sid: '',
				imgUrl: ''
			}
		},
		created(){
			this.getBanners();
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
      eventBus.$on('bannerChanged', () => {
      	this.getBanners();
      })
		},
		methods: {
			changeBannerStatus(location, status){
				console.log(location);
				console.log(status);
				axios.post('http://praksa3.mars-t.mars-hosting.com/api/admin/change-banner-status', {
					location: location,
					status: status
				}).then( response => {
					this.getBanners();
				})
			},
			getBanners(){
				axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/get-banner', {
					params: {
						adminPage: 'adminPage'
					}
				}).then( response => {
					this.banners = response.data.banner;
					console.log(this.banners);
					for(let i=0; i<this.banners.length; i++){
						console.log(this.banners[i].bnr_id);
						this.banners[i].imgUrl = 'http://praksa3.mars-t.mars-hosting.com/api/get-banner-image/'+this.banners[i].bnr_location;
						if (i / 1 == 0) {
							this.banners[i].offset = 'col-md-5 col-sm-12 col-xs-12 .d-none .d-sm-block';
						} else if (i / 1 == 1) {
							this.banners[i].offset = 'col-md-5 offset-md-2 col-sm-12 col-xs-12 .d-none .d-sm-block';
						}
					}
				});
			}
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
	}
	.banner{
		margin-bottom: 10px;
	}
	#adminDugmici {
		position: absolute;
		top: 0px;
		z-index: 102;
	}
	#adminDugmici button {
		display: block;
		width: 120px;
		padding: 5px;
		border-radius: 10px;
		z-index: 102;
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


