<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">UNIFI</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="AboutView" class="nav-link" href="#">About</router-link>
          </li>
        </ul>
        <div class="cart-items" @click="goToCartPage()">
          <b> Items In Cart:  {{ getCartItemCount }} </b>
        </div>

        <form class="d-flex" @submit.prevent="searchProducts">
          <input v-model="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    goToCartPage() {
      this.$router.push({ name: 'CartView'});
    },
    searchProducts() {
      this.$router.push({ name: 'SearchResults', params: { search: this.search }});
    },
  },
  computed: {
    ...mapGetters('cart', ['getCartItemCount']),
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  name: 'Navbar',
};
</script>

<style scoped>
.cart-items {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  margin-left: 10px;
}
</style>