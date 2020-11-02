<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

if (isset($_GET['rankId'])) {
  $vars = [$_GET['rankId']];

  /*
    SQL statement: Gets rank details
  */
  $sql1 = 'SELECT *
            FROM Ranks
            WHERE Ranks.rank_id = ?
          ';

  $stmt1 = $db->prepare($sql1);
  $stmt1->execute($vars);
  $details = $stmt1->fetchAll();


  $result = [
    "rank_details" => $details,
  ];

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
