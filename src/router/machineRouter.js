//引入vue和vue-router
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/view/machine/home'
import Doctors from '../components/view/machine/doctors'
import Register from '../components/view/machine/register'

Vue.use(Router)

let basepath = '/machine';

// const route =new Router({
//   routes: [
//     {
//       path: basepath+'/home',
//       component: Home
//     },
//   ]
// })
let routes = [
    {
      path: '/machine.html',
      meta: {
        title: "一体机 | 主页",
        requiresAuth: true
      },
      component: Home
    },
    {
      path: basepath + '/doctors',
      meta: {
        title: "一体机 | 挂号医生信息",
        requiresAuth: true
      },
      component: Doctors
    },
    {
      path: basepath + '/register',
      name: 'Register',
      meta: {
        title: "一体机 | 挂号",
        requiresAuth: true
      },
      component: Register
    },
  ]
export default {routes};
