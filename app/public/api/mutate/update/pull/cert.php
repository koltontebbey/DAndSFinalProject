<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

if (isset($_GET['certId'])) {
  /*
    SQL Statement: Gets a cert by id
  */
  $sql = 'SELECT *
          FROM Certification
          WHERE Certification.cert_id = ?';

  $stmt = $db->prepare($sql);
  $vars = [$_GET['certId']];
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
