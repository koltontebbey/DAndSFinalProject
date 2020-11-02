<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// check if the stationId is set
if (isset($_POST['stationId'])) {
  /*
      SQL statement: Deletes the station and its child records based on
                     cert id.
  */
  $sql = "DELETE FROM Station WHERE station_id = ?";
  $stmt = $db->prepare($sql);
  $vars = [$_POST['stationId']];
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
