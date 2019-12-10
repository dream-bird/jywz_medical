/*Router模块化
* 1、引入vue-router A import Router from 'vue-router' B Vue.use(Router)
* 2、引入所有组件
* 3、配置路由
* 4、实例化路由并暴露出去
* 5、引入到main.js
* */
import Vue from 'vue'
import Router from 'vue-router'
import DoctorRouter from './doctorRouter.js'
import PatientRouter from './patientRouter.js'
import MachineRouter from './machineRouter.js'
import Login from '../components/view/patient/patient_login'
Vue.use(Router)

let indexrouter = [
  {
    path: '/',
    component: Login
      // (resolve) => require(['../components/view/patient/doctor_login.vue'],resolve)
  },
  {
    path:'*',redirect:'/' //默认跳转路由
  }
]
let routes = []
routes = routes.concat(DoctorRouter.routes);
routes = routes.concat(PatientRouter.routes);
routes = routes.concat(MachineRouter.routes);
routes = routes.concat(indexrouter);

// 实例化路由对象
const router = new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes // 缩写routes: routes
})

// router.beforeEach((to,from,next) =>{
//   window.document.title = to.meta.title;
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     let _session = await session.get();
//     if (_session) {
//       next();
//     } else {
//       next({
//         path: "/login",
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     }
//   } else {
//     next();
//   }
// })

router.afterEach((to,from,next) => {
  window.scrollTo(0, 0);
})
export default router;
