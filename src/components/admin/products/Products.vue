<template>
<div class="container">
		<div class="">
			<!-- ====================  MAIN  ==================== -->
			<div class="main">
                <router-view></router-view>
			</div> <!-- .main -->
		</div> <!-- .row -->
	</div> <!-- .container -->
</template>

<script>
export default {
	created(){
    if (localStorage.getItem('sid') == undefined) {
      this.$router.push('/');
    };
	}
}
</script>

<style scoped>
.row>.btn-info{ margin: 20px auto; }
</style>
