<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT cert_name, default_exp, Agency.agency_name
FROM Certification, Agency
WHERE Certification.cert_agency_id = Agency.agency_id';

$stmt = $db->prepare($sql);
$stmt->execute();

$comments = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($comments, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
