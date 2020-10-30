<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Check for inputs
$mbrset = isset($_POST['mbrSelected']);
$certset = isset($_POST['certSelected']);
$dateset = isset($_POST['date_obt']);
$attempt = $mbrset && $certset && $dateset;

if ($attempt) {
  $sql = "INSERT INTO Cert_assoc (person_id, cert_id, date_obtained) VALUES (?, ?, ?)";
  $stmt = $db->prepare($sql);
  $vars = [$_POST['mbrSelected'], $_POST['certSelected'], $_POST['date_obt']];
  $stmt->execute($vars);

  $json = json_encode(json_decode ("{}"), JSON_PRETTY_PRINT);

  // 200 OK
  http_response_code(200);
  header('Content-Type: application/json');
  
  echo $json;
}
else{
  // returns 400 bad request error if no param is entered.
  http_response_code(400);
}
