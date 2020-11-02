<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

if (isset($_GET['mbrId'])) {
  $vars = [$_GET['mbrId']];

  /*
    SQL statement: Gets member details by id
  */
  $sql = 'SELECT *
          FROM Person
          WHERE Person.person_id = ?
          ';

  $stmt = $db->prepare($sql);
  $stmt->execute($vars);
  $result = $stmt->fetchAll();

  $json = json_encode($result, JSON_PRETTY_PRINT);

  // 200 OK
  http_response_code(200);
  header('Content-Type: application/json');

  echo $json;
}
else{
  // returns 400 bad request error if no param is entered.
  http_response_code(400);
}
