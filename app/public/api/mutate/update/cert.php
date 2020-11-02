<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Check for inputs
$certIdSet = isset($_POST['cert_id']);
$certNameSet = isset($_POST['cert_name']);
$agencyIdSet = isset($_POST['cert_agency_id']);
$defaultExpSet = isset($_POST['default_exp']);
$attempt = $certNameSet && $agencyIdSet && $defaultExpSet && $certIdSet;

if ($attempt) {
  $sql = "UPDATE Certification
          SET cert_name = ?,
              cert_agency_id = ?,
              default_exp = ?
          WHERE cert_id = ?";

  $stmt = $db->prepare($sql);
  $vars = [$_POST['cert_name'],
           $_POST['cert_agency_id'],
           $_POST['default_exp'],
           $_POST['cert_id']
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
