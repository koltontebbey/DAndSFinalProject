DELETE FROM table_name WHERE condition;
<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Check for inputs
$mbrset = isset($_POST['mbrSelected']);
$certset = isset($_POST['certSelected']);
$dateset = isset($_POST['date_obt']);
$attempt = $mbrset && $certset && $dateset;

if ($attempt) {
  $sql = "DELETE FROM Cert_assoc WHERE cert_id = ; ##cannot find the right database
  $stmt = $db->prepare($sql);
  $vars = [$_POST['mbrSelected'], $_POST['certSelected'], $_POST['date_obt']];
  $stmt->execute($vars);

  $json = json_encode(json_decode ("{}"), JSON_PRETTY_PRINT);

  echo $json;
}
