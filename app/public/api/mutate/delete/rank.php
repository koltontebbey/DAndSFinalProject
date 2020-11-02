<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// check if the rankId is set
if (isset($_POST['rankId'])) {
  /*
      SQL statement: Deletes the rank and its child records based on
                     cert id.
  */
  $sql = "DELETE FROM Ranks WHERE rank_id = ?";
  $stmt = $db->prepare($sql);
  $vars = [$_POST['rankId']];
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
