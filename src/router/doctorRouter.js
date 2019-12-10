//引入vue和vue-router
import Vue from 'vue'
import Router from 'vue-router'
import DHome from '../components/view/doctor/doctor_home'
import PLogin from '../components/view/doctor/doctor_login'
import doctorLogin from '../components/view/doctor/login'
import DRegister from '../components/view/doctor/doctor_register'
import DCheck from '../components/view/doctor/doctor-check'
import DHistory from '../components/view/doctor/doctor_history'


Vue.use(Router)

let basepath = '/doctor';
let routes = [
    {
      path: '/doctor.html',
      meta: {
        title: "医生 | 就医问诊",
        requiresAuth: true
      },
      component: PLogin
      // component: doctorLogin
    },
    {
      path: basepath +'/dregister',
      meta: {
        title: "医生 | 注册",
        requiresAuth: true
      },
      component: DRegister
    },
    {
      path: basepath +'/dhome',
      meta: {
        title: "医生 | 主页",
        requiresAuth: true
      },
      component: DHome
    },
    {
      path: basepath +'/check',
      meta: {
        title: "医生 | 检查",
        requiresAuth: true
      },
      component: DCheck
    },
    {
      path: basepath +'/dhistory',
      meta: {
        title: "医生 | 历史记录",
        requiresAuth: true
      },
      component: DHistory
    },
  ]
export default {routes};
