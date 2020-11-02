<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Check for inputs
$rankSet = isset($_POST['rank_name']);
$descriptionSet = isset($_POST['rank_description']);
$attempt = $rankSet && $descriptionSet;

if ($attempt) {
  $sql = "INSERT INTO Ranks (rank_name, rank_description)
          VALUES (?, ?)";

  $stmt = $db->prepare($sql);
  $vars = [$_POST['rank_name'],
           $_POST['rank_description']
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
