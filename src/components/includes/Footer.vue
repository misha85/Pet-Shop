<template>
    <footer class="container-fluid footerBg">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center">
                    <div class="row">
                        <span class="col-md-6">Copyright&nbsp;&copy;&nbsp;by 5&nbsp;Shop</span>
                        <span class="h4 col-md-6"><a href=""><i class="fab fa-facebook"></i></a>&nbsp;<a href=""><i class="fab fa-instagram"></i></a>&nbsp;<a href=""><i class="fab fa-twitter"></i></a>&nbsp;<a href=""><i class="fab fa-youtube"></i></a></span>
                    </div>
                </div>
                <div class="col-md-6 text-center">
                    <div class="row">
                        <div class="col-lg-3">Made by:</div>
                        <div class="col-sm-6 col-md-5 col-lg-4">
                            <div class="small text-lg-left"><a target="_blank" href="">Miloš&nbsp;Đurđević</a></div>
                            <div class="small text-lg-left"><a target="_blank" href="https://www.linkedin.com/in/stefan-parovi%C4%87-796b80159/">Stefan&nbsp;Parović</a></div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-5">
                            <div class="small text-lg-left"><a target="_blank" href="https://www.linkedin.com/in/danilo-petrovic-064446155/">Danilo&nbsp;Petrović</a></div>
                            <div class="small text-lg-left"><a target="_blank" href="https://www.linkedin.com/in/slobodan-radovanovic-166b3615b/">Slobodan&nbsp;Radovanović</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'Footer',
        data() {
            return {}
        }
    }
</script>

<style scoped>
    footer {
        color: rgba(255, 255, 255, .5);
        min-width: 100%;
        min-height: 60px;
        background: #343a40;
        padding-top: 10px;
    }
    footer a {
        color: #e4e4e4;
        color: rgba(255, 255, 255, .7);
    }
    footer a:hover {
        color: #007bff;
        text-decoration: none;
    }
    footer a:active {
        color: white;
    }
    .footerBg {
        /*background-color: #30288D;*/
        background: linear-gradient(to bottom, #007bff -20%, #30288D 100%);
    }
</style>
