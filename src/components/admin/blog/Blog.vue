<template>
<div class="container">
		<div class="">
			<!-- ====================  MAIN  ==================== -->
			<div class="main">
        <div class="row">
          <router-link tag="button" class="button btn btn-info" to="/admin/blog">Blogovi</router-link>
          <router-link tag="button" class="button btn btn-info" to="/admin/blog/tabela">Tabela</router-link>
          <router-link tag="button" class="button btn btn-info" to="/admin/blog/dodaj-blog">Dodaj Novi Blog</router-link>
        </div>
        <hr>
        <router-view></router-view>
			</div> <!-- .main -->
		</div> <!-- .row -->
	</div> <!-- .container -->
</template>

<script>
import axios from 'axios';

export default {
	created(){
		if (localStorage.getItem('sid') === undefined) {
      this.$router.push('/');
    };
	}
}
</script>

<style scoped>
.button{ margin: 20px auto; }
</style>
