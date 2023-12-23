<?php
header('Access-Control-Allow-Origin: *');
// Allow specific HTTP methods (e.g., GET, POST)
header('Access-Control-Allow-Methods: GET, POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Origin, Content-Type');
// Set the response content type
header('Content-Type: application/json');

$connection = new mysqli('localhost', 'root', '', 'unifi');

if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
}

$search = isset($_GET['search']) ? $_GET['search'] : '';
$selectedPriceRange = isset($_GET['priceRange']) ? $_GET['priceRange'] : '';
$selectedCategory = isset($_GET['category']) ? $_GET['category'] : '';

$query = "SELECT pcv.*, ppv.price_range
          FROM product_category_view AS pcv
          JOIN product_price_view AS ppv ON pcv.id = ppv.id
          WHERE 1 = 1";

if ($selectedPriceRange) {
    $query .= " AND ppv.price_range COLLATE utf8mb4_unicode_ci = '$selectedPriceRange' COLLATE utf8mb4_unicode_ci";
}

if ($selectedCategory) {
    $query .= " AND pcv.categoryname COLLATE utf8mb4_unicode_ci = '$selectedCategory' COLLATE utf8mb4_unicode_ci";
}

if ($search) {
    $query .= " AND (pcv.name COLLATE utf8mb4_unicode_ci LIKE '%$search%' COLLATE utf8mb4_unicode_ci)";
}

$result = mysqli_query($connection, $query);
if (!$result) {
    die('Error executing the query: ' . mysqli_error($connection));
}

$products = [];
while ($row = mysqli_fetch_assoc($result)) {
    $row['images'] = explode(',', $row['images']);
    $products[] = $row;
}

$connection->close();

echo json_encode($products);
?>