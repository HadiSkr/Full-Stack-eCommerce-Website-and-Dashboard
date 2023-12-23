<template>
    <div>
      <h1>Welcome to the Home View!</h1>
      <!-- Add your content here -->
    </div>
    
    <CarouselView/>

    <TopCategories/>
    
    <TopProducts/>
   

  </template>
  
  <script>
import CarouselView from '@/components/CarouselView.vue'
import TopCategories from '@/components/TopCategories.vue'
import TopProducts from '@/components/TopProducts.vue'

  export default {
    name: 'HomeView',
    components: {
    CarouselView,
    TopCategories,
    TopProducts
  }
    // Add your component logic here
  }
  </script>
  
  <style scoped>
  /* Add your component styles here */
  </style>