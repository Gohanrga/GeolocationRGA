import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Store from '../store/index'
Vue.use(VueRouter)
const store = Store;
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/ListOfWorks',
    name: 'ListOfWorks',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListOfWorks.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//
router.beforeEach((to, from, next) => {
  const publicPages = ['Login'];
  const authPublic = publicPages.includes(to.name);

  if (authPublic) {
    next();
    return
  }
  else {
    let token = store.getters.getToken();

    if (token === '')
      next('/');
    else
      next();
  }
})

export default router
