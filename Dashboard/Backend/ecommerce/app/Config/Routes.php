<?php

use CodeIgniter\Router\RouteCollection;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('products', 'ProductController::index');
$routes->get('categories', 'CategoryController::index');
$routes->get('headers', 'ProductController::headers');
$routes->post('signup', 'UserController::signup');
$routes->post('signin', 'UserController::signin');
$routes->delete('product/(:num)', 'ProductController::delete/$1');
$routes->delete('category/(:num)', 'CategoryController::delete/$1');
$routes->post('insertCategory', 'CategoryController::insertCategory');
$routes->post('insertproduct', 'ProductController::insertproduct');
$routes->post('editproduct/(:num)', 'ProductController::editProduct/$1');
$routes->post('editgategory/(:num)', 'CategoryController::editgategory/$1');
$routes->get('usersinfo', 'UserController::getusersrolesinfo');
$routes->delete('user/(:num)', 'UserController::deletesuer/$1');
$routes->get('roles', 'UserController::getroles');
$routes->get('permissions', 'UserController::getpermissions');
$routes->get('carousles', 'CarouselController::index');
$routes->delete('carousel/(:num)', 'CarouselController::deletecarousel/$1');
$routes->post('insertimage/(:num)', 'CarouselController::insertImage/$1');

$routes->post('insertcarousel', 'CarouselController::insertCarousel');



