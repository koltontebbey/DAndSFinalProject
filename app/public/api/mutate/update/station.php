<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Check for inputs
$stationIdSet = isset($_POST['station_id'])
$stationNameSet = isset($_POST['station_name']);
$streetAddSet = isset($_POST['street_address']);
$citySet = isset($_POST['city']);
$stateAbbrSet = isset($_POST['state_abbr']);
$zipSet = isset($_POST['zip']);
$stationContactSet = isset($_POST['station_contact_num']);
$attempt = $stationNameSet && $streetAddSet && $citySet && $stateAbbrSet &&
            $zipSet && $stationContactSet && $stationIdSet;

if ($attempt) {
  $sql = "UPDATE Station
          SET station_name = ?, street_address = ?, city = ?, state_abbr = ?,
              zip = ?, station_contact_num = ?
          WHERE station_id = ?";

  $stmt = $db->prepare($sql);
  $vars = [$_POST['station_name'],
           $_POST['street_address'],
           $_POST['city'],
           $_POST['state_abbr'],
           $_POST['zip'],
           $_POST['station_contact_num'],
           $_POST['station_id']
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
