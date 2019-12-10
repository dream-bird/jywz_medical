//引入vue和vue-router
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/view/patient/patient_home'
import Login from '../components/view/patient/patient_login'
import ScanRegister from '../components/view/patient/scanregister'
import Register from '../components/view/patient/patient_register'
import ApplyCard from '../components/view/patient/applycard'
import Ecard from '../components/view/patient/ecard'
import TwoCode from '../components/view/patient/qrcode'
import PBill from '../components/view/patient/patient_bill'
import PDetail from '../components/view/patient/patient_detail'
Vue.use(Router)

let basepath = '/patient';
let routes = [
    {
      path: '/index.html',
      meta: {
        title: "患者 | 登陆",
        requiresAuth: true
      },
      component: Login
      //按需加载
      // component: (resolve) => require(['../components/view/patient/doctor_login.vue'],  resolve)
    },
    {
      path: basepath + '/pregister',
      meta: {
        title: "患者 | 注册",
        requiresAuth: true
      },
      component: Register
    },
    {
      path: basepath + '/phome',
      meta: {
        title: "患者 | 主页",
        requiresAuth: true
      },
      component: Home
    },
    {
      path: basepath + '/scanregister',
      meta: {
        title: "患者 | 扫码",
        requiresAuth: true
      },
      component: ScanRegister
    },
    {
      path: basepath + '/applycard',
      meta: {
        title: "患者 | 申领医疗卡",
        requiresAuth: true
      },
      component: ApplyCard
    },
    {
      path: basepath + '/ecard',
      meta: {
        title: "患者 | 获取医疗卡",
        requiresAuth: true
      },
      component: Ecard
    },
    {
      path: basepath + '/twocode',
      meta: {
        title: "患者 | 二维码",
        requiresAuth: true
      },
      component: TwoCode
    },
    {
      path: basepath + '/pbill',
      name: 'PBill',
      meta: {
        title: "患者 | 处方",
        name: '',
        requiresAuth: true
      },
      component: PBill
    },
    {
      path: basepath + '/pdetail',
      name:"PDetail",
      meta: {
        title: "患者 | 明细",
        requiresAuth: true
      },
      component: PDetail
    },
  ]
export default {routes};
