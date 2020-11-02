<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// check if the certId is set
if (isset($_POST['station_id']) && isset($_POST['person_id'])) {
  /*
      SQL statement: deletes association between person and station
  */
  $sql = "DELETE FROM Station_assoc WHERE station_id = ? AND person_id = ?";
  $stmt = $db->prepare($sql);
  $vars = [$_POST['station_id'], $_POST['person_id']];
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
