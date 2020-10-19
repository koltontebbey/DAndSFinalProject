<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT Person.person_id, Person.first_name, Person.last_name
FROM Person';

$stmt = $db->prepare($sql);
$stmt->execute();

$mbrs = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($mbrs, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
