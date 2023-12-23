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

$query = "SELECT c.id, c.name, c.sort_order, c.description, i.filename 
          FROM products AS c
          JOIN images AS i ON c.id = i.product_id
          WHERE i.id = (
              SELECT MIN(id)
              FROM images
              WHERE product_id = c.id
          )
          ORDER BY c.sort_order ASC
          LIMIT 8";

$result = $connection->query($query);

$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

// Close the database connection
$connection->close();

// Return the categories as JSON
echo json_encode($categories);
?>