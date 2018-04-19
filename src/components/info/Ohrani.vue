<template>
	<div class="pozadina">
		<div class="container ">
				<h1 class="food-h1 pozadinabela">O hrani</h1>
				<div class="food-logo">
					<img src="../../assets/food-logo.png" alt="food-logo">
				</div>
				<div class="row ">
					<article class="food pozadinabela" >
						<header>
							<h2 class="food-title">Suva hrana</h2>
						</header>
						<div class="food-image">
							<img src="../../assets/dry-food.jpg" alt="dry-food">
						</div>
						<p class="food-text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eligendi, nostrum minima molestias error laborum quo modi quisquam quas sit eius, exercitationem expedita voluptates voluptatem, dolores, voluptas ipsam vel iste.
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eligendi, nostrum minima molestias error laborum quo modi quisquam quas sit eius, exercitationem expedita voluptates voluptatem, dolores, voluptas ipsam vel iste.
						</p>
					</article> <!-- .food -->
				</div> <!-- .row -->

				<hr>

				<div class="row ">
					<article class="food pozadinabela" >
						<header>
							<h2 class="food-title">Hrana za macke</h2>
						</header>
						<div class="food-image">
							<img src="../../assets/cat-food.jpeg" alt="cat-food">
						</div>
						<p class="food-text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eligendi, nostrum minima molestias error laborum quo modi quisquam quas sit eius, exercitationem expedita voluptates voluptatem, dolores, voluptas ipsam vel iste.
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eligendi, nostrum minima molestias error laborum quo modi quisquam quas sit eius, exercitationem expedita voluptates voluptatem, dolores, voluptas ipsam vel iste.
						</p>
					</article> <!-- .food -->
				</div> <!-- .row -->

				<hr>

				<div class="row ">
					<article class="food pozadinabela" >
						<header>
							<h2 class="food-title">Hrana za pse</h2>
						</header>
						<div class="food-image">
							<img src="../../assets/dog-food.jpeg" alt="dog-food">
						</div>
						<p class="food-text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eligendi, nostrum minima molestias error laborum quo modi quisquam quas sit eius, exercitationem expedita voluptates voluptatem, dolores, voluptas ipsam vel iste.
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eligendi, nostrum minima molestias error laborum quo modi quisquam quas sit eius, exercitationem expedita voluptates voluptatem, dolores, voluptas ipsam vel iste.
						</p>
					</article> <!-- .food -->
				</div> <!-- .row -->
				<hr>
			</div> <!-- .container -->
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
.food{
  margin: 10px;
  padding: 15px;
  box-shadow: 2px 2px 7px #CBC5C5;
}
.food-logo{
  text-align: center;
  margin-bottom: 35px;
}
.food-logo img{
  width: 105px;
}
.food-h1{
  color: #780A0A;
  text-align: center;
  margin-top: 20px;
}
.food-image{
  text-align: center;
  margin: 0 auto;
  margin-bottom: 15px;
}
.food-image img{
  width: 250px;
  border-radius: 10px;
}
.food-title{
  text-align: center;
  font-style: oblique;
  color: #BC5256;
}
.food-text{
  color: #808080;
}
.pozadina {
    background-image: url("../../assets/pozadina.jpg");

}

.pozadinabela{
	  background-color: white;
}
</style>
