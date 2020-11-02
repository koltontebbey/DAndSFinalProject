<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Check for inputs
$agencyIdSet = isset($_POST['agency_id']);
$nameSet = isset($_POST['agency_name']);
$streetAddSet = isset($_POST['street_address']);
$citySet = isset($_POST['city']);
$stateAbbrSet = isset($_POST['state_abbr']);
$zipSet = isset($_POST['zip']);
$emailSet = isset($_POST['email']);
$phoneNumSet = isset($_POST['phone_num']);
$attempt = $nameSet && $streetAddSet && $citySet && $stateAbbrSet && $zipSet
                && $emailSet && $phoneNumSet && $agencyIdSet;

if ($attempt) {
  $sql = "UPDATE Agency
          SET agency_name = ?,
              street_address = ?,
              city = ?,
              state_abbr = ?,
              zip = ?,
              email = ?,
              phone_num = ?
          WHERE agency_id = ?";

  $stmt = $db->prepare($sql);
  $vars = [$_POST['agency_name'],
           $_POST['street_address'],
           $_POST['city'],
           $_POST['state_abbr'],
           $_POST['zip'],
           $_POST['email'],
           $_POST['phone_num'],
           $_POST['agency_id']
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
