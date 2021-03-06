<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Check for inputs

$mbrset = isset($_POST['person_id']);
$certset = isset($_POST['cert_id']);
$dateset = isset($_POST['date_obt']);
$attempt = $mbrset && $certset && $dateset;

if ($attempt) {
  if(isset($_POST['exp_date'])){
    $sql = "INSERT INTO Cert_assoc (person_id, cert_id, date_obtained, exp_date)
            VALUES (?, ?, ?, ?)";
    $stmt = $db->prepare($sql);

    $vars = [$_POST['person_id'],
             $_POST['cert_id'],
             $_POST['date_obt'],
             $_POST['exp_date']];

    $stmt->execute($vars);
  }
  else{
    $sql1 = "INSERT INTO Cert_assoc (person_id, cert_id, date_obtained)
             VALUES (?, ?, ?)";

    $stmt1 = $db->prepare($sql1);
    $vars1 = [$_POST['person_id'], $_POST['cert_id'], $_POST['date_obt']];
    $stmt1->execute($vars1);
  }
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
