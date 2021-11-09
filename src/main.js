import Vue from 'vue';
import App from './App.vue';

import { stringOne, stringTwo } from './data';
import alerting from './function';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alert(stringOne);
alert(stringTwo);
alerting();
