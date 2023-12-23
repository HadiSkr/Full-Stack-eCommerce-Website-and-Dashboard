<template>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product" @click="goToProductPage(product.id)">
        <div class="image-container">
          <img :src="`/src/assets/images/${product.images[0]}`" :alt="product.name" />
        </div>
        <div class="product-details">
          <p class="product-name">Name: {{ product.name }}</p>
          <p class="product-description">Description: {{ product.description }}</p>
          <div class="product-price">
            <span class="currency">$</span>
            <span class="amount">{{ product.price }}</span>
          </div>
          <div v-if="product.amount > 0" class="label in-stock">In Stock</div>
          <div v-else class="label out-of-stock">Out of Stock</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        products: [],
      };
    },
    mounted() {
      const id = this.$route.params.id;
      this.fetchProducts(id);
    },
    
    methods: {
        goToProductPage(id) {
      this.$router.push({ name: 'ProductView', params: { id } });
    },
      fetchProducts(id) {
        axios
          .get(`http://localhost/backend/GetcCatProducts.php?id=${id}`)
          .then((response) => {
            this.products = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .product-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .product {
    flex-basis: 28%;
    margin: 8px;
    padding: 16px;
    box-shadow: 0px 0px 14px 1px #e6e6e6;
    display: flex;
  }
  
  .image-container {
    width: 40%;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
  
  .image-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .product-details {
    flex-grow: 1;
  }
  
  .label {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  
  .in-stock {
    background-color: green;
    color: white;
  }
  
  .out-of-stock {
    background-color: red;
    color: white;
  }
  .product-name {
  font-weight: bold;
}
  </style>