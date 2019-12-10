// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import QRCode from 'qrcodejs2'
import axios from 'axios'
import Router from 'vue-router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
Vue.prototype.$axios = axios;
// import './assets/css/remConfig'
Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    var token = sessionStorage.getItem("access_token");
    var patientCardQRCode = sessionStorage.getItem("patientCardQRCode");
    if (patientCardQRCode){
      config.headers = {
        Authorization: "Bearer " + token,
        dataType: 'json',
        contentType: "application/json",
        "X-CARD-CODE" :patientCardQRCode,
      }
    }else{
      if (token){
        config.headers = {
          Authorization: "Bearer " + token,
          dataType: 'json',
          contentType: "application/json",
        }
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
