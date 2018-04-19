// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store/store';
import VueGoodTable from 'vue-good-table';
import VueInstant from 'vue-instant'
import VuePaginate from 'vue-paginate'
import 'vue-instant/dist/vue-instant.css'


Vue.use(VueInstant)
Vue.use(VueGoodTable);
Vue.use(VuePaginate)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.filter('snippet',function(value, duzina){
    if (!value) return;
    if (value.length > duzina) {
        let pos = value.lastIndexOf(' ', duzina);
        return value.slice(0, pos) + '...';
    } else {
        return value;
    }
});

export const eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
