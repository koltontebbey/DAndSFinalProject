<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

/*
  SQL Statement: Gets a list of certifications ordered by name
*/
$sql = 'SELECT cert_id, cert_name
FROM Certification
ORDER BY cert_name';

$stmt = $db->prepare($sql);
$stmt->execute();

$results = $stmt->fetchAll();

$json = json_encode($results, JSON_PRETTY_PRINT);

// 200 OK
http_response_code(200);
header('Content-Type: application/json');

echo $json;
