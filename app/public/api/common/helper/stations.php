<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

/*
  SQL Statement: Gets list of stations.
*/
$querystr = 'SELECT station_id, station_name FROM Station';

$stmt = $db->prepare($querystr);
$stmt->execute();

$results = $stmt->fetchAll();

$json = json_encode($results, JSON_PRETTY_PRINT);

// 200 OK
http_response_code(200);
header('Content-Type: application/json');

echo $json;
