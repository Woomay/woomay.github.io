import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axiosConfig from './lib/http';

declare module 'Vue/types/vue' {
  interface Vue {
    $http: any;
  }
}
Vue.prototype.$http = axiosConfig;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
