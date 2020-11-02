<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

/*
  SQL Statement: Gets a list of members order by last name
*/
$sql = 'SELECT Person.person_id,
        CONCAT(Person.last_name, ", ", Person.first_name) AS full_name
        FROM Person
        ORDER BY last_name';

$stmt = $db->prepare($sql);
$stmt->execute();

$results = $stmt->fetchAll();

$json = json_encode($results, JSON_PRETTY_PRINT);

// 200 OK
http_response_code(200);
header('Content-Type: application/json');

echo $json;
