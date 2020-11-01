<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Check for inputs
$rankIdSet = isset($_POST['rank_id']);
$rankSet = isset($_POST['rank_name']);
$descriptionSet = isset($_POST['rank_description']);
$attempt = $rankSet && $descriptionSet && $rankIdSet;

if ($attempt) {
  $sql = "UPDATE Ranks SET rank_name = ?, rank_description = ?
          WHERE rank_id = ?";

  $stmt = $db->prepare($sql);
  $vars = [$_POST['rank_name'],
           $_POST['rank_description'],
           $_POST['rank_id']
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
