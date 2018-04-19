<template>
	<div id="sub-footer" class="footer navbar-fixed-bottom">
		<div class="jumbotron jumbotron-fluid"> <!--subfuter-->
		    <div class="container">
		        <div class="row">
		            <div class="offset-2 col-md-5">
		                <p><i class="fas fa-2x fa-home"></i> Narodnih heroja 63 (lok. 26), Novi Beograd</p>
		                <p><i class="fa fa-2x fa-phone"></i> 061 168 44 48</p>
		                <p><i class="fa fa-2x fa-envelope"></i> tacinpetshop@gmail.com</p>
		            </div> <!-- offset-md -->
		            <div class="offset-2 offset-md-0 col-md-5">
		                <p><i class="fa fa-2x fa-globe"></i> www.5sop.rs</p>
		                <p class="float-left"><i class="fas fa-2x fa-clock"></i>&nbsp;</p>
		                <p>Radnim danima: 9:30-19h<br>Subotom: 9:30-15h</p>
		            </div> <!-- offset-md -->
		        </div> <!-- row -->
		    </div> <!-- container -->
		</div> <!--end subfuter-->
	</div>
</template>

<script>
export default{
	data() {
		return {

		}
	}
}
</script>

<style scoped>
#sub-footer{
  min-width: 100%;
  margin-top: 30px;
}
.jumbotron{
	margin: 0;
	padding: 0;
}
.row{
	padding: 40px;
}
</style>
