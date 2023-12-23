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

$searchString = $_GET['search']; 

$query = "SELECT p.id, p.name, p.amount, p.price, p.description, i.filename
          FROM products AS p
          JOIN images AS i ON p.id = i.product_id
          WHERE p.name LIKE '%$searchString%'
          ORDER BY i.id ASC";

$result = $connection->query($query);

if (!$result) {
    die('Query execution error: ' . $connection->error);
}

$products = array();

while ($row = $result->fetch_assoc()) {
    $productId = $row['id'];

    // Check if the product already exists in the array
    if (!isset($products[$productId])) {
        $product = array();
        $product['id'] = $productId;
        $product['name'] = $row['name'];
        $product['amount'] = $row['amount'];
        $product['price'] = $row['price'];
        $product['description'] = $row['description'];
        $product['images'] = array();
        
        $products[$productId] = $product;
    }

    // Append the image to the existing product
    $products[$productId]['images'][] = $row['filename'];
}

// Close the database connection
$connection->close();

// Return the products as JSON
echo json_encode(array_values($products));
?>