<template>
    <div >
        <div class="container" id="main"> <!--kategorije i artikli-->
            <div class="row">
                <app-aside-nav></app-aside-nav>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import AsideNav from '../includes/AsideNav'
    export default {
        components: {
            'app-aside-nav': AsideNav
        },
        data() {
            return {}
        }
    };
</script>

<style scoped>
    p {
        text-align: center;
        margin: 20px;
    }
    #main {
        margin-top: 30px;
        margin-bottom: 30px
    }
    #nav ul li {
    }
    #nav li:hover {
        background-color: #54a552;
        border-radius: 5px;
    }
    #nav li a {
        height: 75px;
    }
    #nav li img {
        height: 45px;
    }
    #nav li:hover img {
        padding: 4px;
    }
    article {
        margin-bottom: 10px;
    }
    article p {
        margin: 0;
        padding: 0;
    }
    article.artikal1 img {
        max-width: 100px;
        max-height: 100px;
    }
    article.artikal2 img {
        margin: 0 auto;
        max-width: 600px;
        max-height: 600px;
    }
    article div div div div:last-child {
        background-color: antiquewhite;
    }
</style>
