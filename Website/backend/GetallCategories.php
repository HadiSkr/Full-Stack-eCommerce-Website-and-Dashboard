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

$query = "SELECT * FROM categories";

$result = $connection->query($query);

$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

$connection->close();

echo json_encode($categories);
?>