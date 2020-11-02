<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

if (isset($_GET['stationId'])) {
  /*
    SQL Statement: Gets a station by id
  */
  $sql = 'SELECT *
          FROM Station
          WHERE Station.station_id = ?';

  $stmt = $db->prepare($sql);
  $vars = [$_GET['stationId']];
  $stmt->execute($vars);

  $results = $stmt->fetchAll();

  $json = json_encode($results, JSON_PRETTY_PRINT);

  // 200 OK
  http_response_code(200);
  header('Content-Type: application/json');

  echo $json;
}
else{
  // returns 400 bad request error if no param is entered.
  http_response_code(400);
}
