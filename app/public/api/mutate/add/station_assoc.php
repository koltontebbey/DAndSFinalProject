<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Check for inputs
$personIdSet = isset($_POST['person_id']);
$stationIdSet = isset($_POST['station_id']);
$attempt = $personIdSet && $stationIdSet;

if ($attempt) {
  $sql = "INSERT INTO Station_assoc (person_id, station_id)
          VALUES (?, ?)";

  $stmt = $db->prepare($sql);
  $vars = [$_POST['person_id'],
           $_POST['station_id']
          ];

  $stmt->execute($vars);

  $statusObj = array('status' => 'ok');

  $json = json_encode($statusObj, JSON_PRETTY_PRINT);

  // 200 OK
  http_response_code(200);
  header('Content-Type: application/json');

  echo $json;
}
else{
  // returns 400 bad request error if no param is entered.
  http_response_code(400);
}
