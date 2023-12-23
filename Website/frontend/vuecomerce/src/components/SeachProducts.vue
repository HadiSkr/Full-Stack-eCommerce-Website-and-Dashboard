<template>
    <div>
        <div class="filter-container">
  <label for="sort-by">Sort By:</label>
  <select id="sort-by" v-model="sortBy" @change="sortProducts">
    <option value="">None</option>
    <option value="name_asc">Name (Ascending)</option>
    <option value="name_desc">Name (Descending)</option>
  </select>
</div>
      <div class="filter-container">
        <label for="price-filter">Price Range:</label>
        <select id="price-filter" v-model="selectedPriceRange" @change="filterProducts">
          <option value="">All</option>
          <option value=1>$1 - $50</option>
          <option value=2>$51 - $500</option>
          <option value=3>$501 - $2000</option>
          <option value=4>>$2000</option>
        </select>
      </div>
      <div class="filter-container">
        <label for="category-filter">Category:</label>
        <select id="category-filter" v-model="selectedCategory" @change="filterProducts">
          <option value="">All</option>
          <option v-for="category in categories" :value="category.categoryname " :key="category.id">{{ category.categoryname }}</option>
        </select>
      </div>
  
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
            
          </div>
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
        categories: [],
        selectedPriceRange: '', 
        selectedCategory: '', 
        sortBy: '', 
      };
    },
    mounted() {
        
      this.fetchCategories();
      const search = this.$route.params.search;
      this.fetchProducts(search);
      this.sortProducts(); 
},
        watch: {
        products: {
            handler() {
            this.sortProducts(); 
            },
            deep: true,
        },
    },
    
    methods: {
      goToProductPage(id) {
        this.$router.push({ name: 'ProductView', params: { id } });
      },
      fetchProducts(search) {
        axios
          .get(`http://localhost/backend/search.php?search=${search}`)
          .then((response) => {
            this.products = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      fetchCategories() {
      axios
        .get('http://localhost/backend/GetallCategories.php')
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    filterProducts() {
    const search = this.$route.params.search;
    const priceRange = this.selectedPriceRange;
    const category = this.selectedCategory;

    axios
        .get(`http://localhost/backend/filtering.php?search=${search}&priceRange=${priceRange}&category=${category}`)
        .then((response) => {
            this.products = response.data;
        })
        .catch((error) => {
            console.error(error);
        });
  },
  sortProducts() {
    if (this.sortBy === 'name_asc') {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'name_desc') {
      this.products.sort((a, b) => b.name.localeCompare(a.name));
    }
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

  .filter-container {
    margin-bottom: 16px;
  }
  </style>