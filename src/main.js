import Vue from "vue";
import "normalize.css/normalize.css";
import App from "./App.vue";
import "./plugins/element.js";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
