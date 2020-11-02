<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

if (isset($_GET['rankId'])) {
  /*
    SQL Statement: Gets a rank by id
  */
  $sql = 'SELECT *
          FROM Ranks
          WHERE Ranks.rank_id = ?';

  $stmt = $db->prepare($sql);
  $vars = [$_GET['rankId']];
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
