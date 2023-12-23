import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ProductDetails from '@/components/ProductDetails.vue'
import CategoryView from '@/components/CategoryView.vue'
import CartView from '@/components/CartView.vue'
import SeachProducts from '@/components/SeachProducts.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/AboutView',
      name: 'AboutView',
      component: AboutView
    },
    //
    {
    path: '/product/:id',
      name: 'ProductView',
      component: ProductDetails
    },
    {
      path: '/category/:id',
        name: 'CategoryView',
        component: CategoryView
      },

      {
        path: '/cart',
        name: 'CartView',
        component: CartView
      },//
      {
        path: '/seachresults/:search',
        name: 'SearchResults',
        component: SeachProducts
      }
  ]
})

export default router
