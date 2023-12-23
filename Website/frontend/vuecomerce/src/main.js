import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/app.scss'
import jQuery from 'jquery'
import Navbar from './components/Navbar.vue'
import 'popper.js'
import cart from './stores/cart'; 

const store = createStore({
  modules: {
    cart
  }
})

// Load cart items from local storage
store.dispatch('cart/loadCartItems');

const app = createApp(App)

window.j = window.jQuery = jQuery

app.use(router)

app.component('Navbar', Navbar)

app.use(store) 

// Save cart items to local storage before unmounting the app
app.unmount = function () {
  store.dispatch('cart/saveCartItems');
}

app.mount('#app')