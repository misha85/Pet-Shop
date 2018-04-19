<template>
  <div id="app">
    <app-header></app-header>
    <app-register></app-register>
    <router-view/>
    <app-subfooter v-if="$route.path != '/kontakt'"></app-subfooter>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/includes/Header'
import Register from './components/login/Register'
import Footer from './components/includes/Footer'
import Subfooter from './components/includes/Subfooter'

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-register' : Register,
    'app-footer': Footer,
    'app-subfooter': Subfooter
  },
  data(){
    return{
    }
  }
}
</script>

<style>
#app {
  /*background-image: url("./assets/pozz.png");*/
  font-family: 'Raleway', sans-serif;
  font-size: 18px;
}
  /*=======  INPUT  RANGE  ======*/
  .discount{
    margin-bottom: 15px;
  }
  .range{
    margin: 20px 0;
  }
  input[type=range] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type=range]::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type=range]::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: #3071a9;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: #367ebd;
  }
  /* ==========  SCROLL  BAR  ========= */
  ::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
    background-color: #F5F5F5;
    border-radius: 10px;
  }
  ::-webkit-scrollbar{
    width: 10px;
    height: 9px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb:hover{
    border-radius: 10px;
    background-color: #FFF;
    background-image: -webkit-gradient(
      linear,
      40% 0%,
      75% 84%,
      from(#00BFFF),
      to(#00BFFF),
      color-stop(.5,#98F6EE)
    );
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-image: -webkit-gradient(
      linear,
      40% 0%,
      75% 84%,
      from(#003DFF),
      to(#003DFF),
      color-stop(.5,#98F6EE)
    );
  }

</style>
