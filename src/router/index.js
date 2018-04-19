import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Purchase from '@/components/Purchase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/purchase/:watch',
      name: 'Purchase',
      component: Purchase	
    }

  ]
})
