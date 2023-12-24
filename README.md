# Full-Stack E-Commerce Website and Dashboard

This repository contains a full-stack E-commerce website and a dashboard that was developed to meet the requirements of a client's business. The project encompasses both the frontend and backend components, utilizing various technologies to deliver a comprehensive solution. The website provides a user-friendly interface for customers to browse and purchase products, while the dashboard offers administrative functionalities for managing categories, products, carousels, and user permissions.

## Demo

### Website
Watch the demo of the website [here](https://www.youtube.com/watch?v=f-fbO6T2h-Y).

### Dashboard
Watch the demo of the dashboard [here](https://www.youtube.com/watch?v=fjC8WHy1lik&t=183s).


## Website Features

### Home Page

The home page is the starting point for customers and includes the following components:

- Carousel: A visually appealing carousel showcasing featured products. Clicking on an image opens a product details page.
- Top Categories: Floating containers displaying the top categories. Users can select a category to view products within that category.
- Top Products: A carousel displaying the highest-rated products. The rating information is stored in the database.

### Search Page

The search page allows users to search for products based on various criteria. It offers the following features:

- Products List: A list of products matching the search criteria.
- Filtering: Users can filter products by categories and price.
- Sorting: Products can be sorted by name.

### Product Details

The product details page provides comprehensive information about a specific product:

- Product Images Carousel: A carousel displaying multiple images of the product.
- Description: Detailed description of the product.
- Price: The price of the product.
- Stock: Indicates whether the product is in stock or not.

### Cart

The cart functionality allows users to add and remove items from their shopping cart. The cart data is persistently stored in the local storage of the user's browser, ensuring a seamless shopping experience.

## Technologies Used for the Website

### Backend

- MySQL: The backend utilizes MySQL for data storage. Filtering operations make use of MySQL views.
- Core PHP: The backend logic is implemented using Core PHP.

### Frontend

- Vue.js: The frontend of the website is built using Vue.js, a popular JavaScript framework known for its simplicity and reactivity.

## Dashboard Features

### Login Page

The login page provides a secure authentication mechanism for accessing the dashboard.

### Dashboard Page

The dashboard page offers a comprehensive overview of the business. It includes the following components:

- Line Chart: Presents dummy order data in the form of a line chart, providing insights into the business's performance.
- Pie Chart: Displays dummy order data in a pie chart, visualizing the distribution of orders.

### Management

The management section of the dashboard allows administrators to perform CRUD (Create, Read, Update, Delete) operations on various entities:

- Categories: Create, read, update, and delete categories.
- Products: Perform CRUD operations on products.
- Carousels: Manage the carousels displayed on the website.
- Admins / Permissions: Manage user permissions and roles. The system supports three types of admins: super admin, moderator, and normal user.

## Technologies Used for the Dashboard

### Backend

- MySQL: The same MySQL database used by the frontend is also utilized for the dashboard.
- CodeIgniter: The backend of the dashboard is developed using CodeIgniter, a powerful PHP framework known for its simplicity and versatility.
- Super Admin: The system includes a super admin role with extended permissions.

### Frontend

- Angular: The frontend of the dashboard is built using Angular, a popular TypeScript-based framework known for its robustness and scalability.

## Project Structure

The repository is organized into the following directories:

- Website
  - Frontend: Contains the frontend code of the E-commerce website.
  - Backend: Contains the backend code of the E-commerce website.
  - Mysql Files: Contains the MySQL database files related to the website.
- Dashboard
  - Frontend: Contains the frontend code of the dashboard.
  - Backend: Contains the backend code of the dashboard.
  - Mysql Files: Contains the MySQL database files related to the dashboard.

## Installation

To install and run this repository locally, please follow these steps:

1. Clone the repository to your local machine:

```
git clone https://github.com/HadiSkr/Full-Stack-eCommerce-Website-and-Dashboard.git
```

2. Set up the website:
   - Navigate to the Website/Frontend directory and follow the instructions in the README file to set up the frontend.
   - Navigate to the Website/Backend directory and follow the instructions in the README file to set up the backend.

3. Set up the dashboard:
   - Navigate to the Dashboard/Frontend directory and follow the instructions in the README file to set up the frontend.
   - Navigate to the Dashboard/Backend directory and follow the instructions in the README file to set up the backend.

Once the installation is complete, you should be able to access the E-commerce website and dashboard by opening the respective URLs in your web browser.

Please note that the installation steps may vary depending on your specific environment and configuration. Make sure to carefully read theREADME files in the Website/Frontend, Website/Backend, Dashboard/Frontend, and Dashboard/Backend directories for detailed instructions on setting up the frontend and backend components.

If you encounter any issues during the installation process, refer to the README files or consult the documentation of the technologies used (Vue.js, Angular, CodeIgniter, MySQL) for further assistance. 😊
