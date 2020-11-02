<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// check if the agencyId is set
if (isset($_POST['agencyId'])) {
  /*
      SQL statement: Deletes the agency and its child records based on
                     cert id.
  */
  $sql = "DELETE FROM Agency WHERE agency_id = ?";
  $stmt = $db->prepare($sql);
  $vars = [$_POST['agencyId']];
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
