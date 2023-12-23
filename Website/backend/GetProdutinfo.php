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

$id = $_GET['id']; 

$query = "SELECT p.id, p.name, p.amount, p.price, p.description, i.filename
          FROM products AS p
          JOIN images AS i ON p.id = i.product_id
          WHERE p.id = $id
          ORDER BY i.id ASC";

$result = $connection->query($query);

if (!$result) {
    die('Query execution error: ' . $connection->error);
}

$product = array();
$product['id'] = $id;
$product['images'] = array();

while ($row = $result->fetch_assoc()) {
    $product['name'] = $row['name'];
    $product['amount'] = $row['amount'];
    $product['price'] = $row['price'];
    $product['description'] = $row['description'];
    $product['images'][] = $row['filename'];
}

// Close the database connection
$connection->close();

// Return the product as JSON
echo json_encode($product);
?>