import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import FindInitiative from '@/pages/Find-initiative'
import Portfolio from '@/pages/Portfolio'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/find-initiative',
      name: 'FindInitiative',
      component: FindInitiative
    },
    {
      path: '/portfolio/:id',
      name: 'Portfolio',
      component: Portfolio
    }
  ]
})
