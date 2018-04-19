<template>
	<div class="container">
		<div class="row">
			<h1 class="onama-h1"><i>O nama</i></h1>
			<div class="onama">
				<img src="../../assets/onama.jpg" class="img-fluid col-xs-12 offset-xs-2" alt="onama">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem ea optio quod, nostrum magni sequi dolor, nesciunt, doloremque dolorum mollitia unde porro. Tempora debitis odio, sint blanditiis illum impedit iste?
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem ea optio quod, nostrum magni sequi dolor, nesciunt, doloremque dolorum mollitia unde porro. Tempora debitis odio, sint blanditiis illum impedit iste?
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero in, dolorem harum tenetur vel fuga accusamus velit consectetur.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem ea optio quod, nostrum magni sequi dolor, nesciunt, doloremque dolorum mollitia unde porro.
				</p>
			</div> <!-- .onama -->
		</div>

		<div class="row">
			<div class="onama">
				<img src="../../assets/bagdog.jpg" class="img-fluid" alt="dog-in-bag">
				<div class="paw"><img src="../../assets/paw.png" alt="paw"></div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem ea optio quod, nostrum magni sequi dolor, nesciunt, doloremque dolorum mollitia unde porro. Tempora debitis odio, sint blanditiis illum impedit iste?
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem ea optio quod, nostrum magni sequi dolor, nesciunt, doloremque dolorum mollitia unde porro. Tempora debitis odio, sint blanditiis illum impedit iste?
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero in, dolorem harum tenetur vel fuga accusamus velit consectetur.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem ea optio quod, nostrum magni sequi dolor, nesciunt, doloremque dolorum mollitia unde porro.
				</p>
			</div> <!-- .onama -->
		</div>
	</div> <!-- .container -->
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
.onama{
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 3px 3px 7px #98F6EE;
  overflow: hidden;
}
.onama img{
  -webkit-transform: rotate(355deg);
  -moz-transform: rotate(355deg);
  -o-transform: rotate(355deg);
  -ms-transform: rotate(355deg);
  transform: rotate(355deg);
  border-radius: 10px;
  width: 250px;
}
img[alt="onama"]{
  margin: 0 15px 30px 30px;
  float: right;
}
img[alt="dog-in-bag"]{
  float: left;
  margin: 20px 50px 30px 20px;
}
.paw{
  text-align: center;
}
.onama-h1{
	text-align: center;
	padding: 20px;
	margin-top: 20px;
	color: #737373;
}
p{
	color: #737373;
}
.pozadina {
    background-image: url("../../assets/pozadina.jpg");

}
.pozadinabela{
	background-color: white;
}
</style>
