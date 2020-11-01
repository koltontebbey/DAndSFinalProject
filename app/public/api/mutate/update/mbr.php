<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Check for inputs
$memIdSet = isset($_POST['person_id'])
$firstNameSet = isset($_POST['first_name']);
$lastNameSet = isset($_POST['last_name']);
$genderSet = isset($_POST['gender']);
$radioNumSet = isset($_POST['radio_number']);
$rankIdSet = isset($_POST['rank_id']);
$isActiveSet = isset($_POST['is_active']);
$dobSet = isset($_POST['date_of_birth']);
$startDateSet = isset($_POST['start_date']);
$streetAddSet = isset($_POST['street_address']);
$citySet = isset($_POST['city']);
$stateAbbrSet = isset($_POST['state_abbr']);
$zipSet = isset($_POST['zip']);
$contactEmailSet = isset($_POST['contact_email']);
$homePhoneSet = isset($_POST['home_phone']);
$workPhoneSet = isset($_POST['work_phone']);
$mobilePhoneSet = isset($_POST['mobile_phone']);
$attempt = $firstNameSet && $lastNameSet && $genderSet && $radioNumSet && $rankIdSet
                && $isActiveSet && $dobSet && $startDateSet && $streetAddSet &&
                $citySet && $stateAbbrSet && $zipSet && $contactEmailSet
                && $homePhoneSet && $workPhoneSet && $mobilePhoneSet && $memIdSet;

if ($attempt) {
  $sql = "UPDATE Person
          SET first_name = ?,
              last_name = ?,
              gender = ?,
              radio_number = ?,
              rank_id = ?,
              is_active = ?,
              date_of_birth = ?,
              start_date = ?,
              street_address = ?,
              city = ?,
              state_abbr = ?,
              zip = ?,
              contact_email = ?,
              home_phome = ?,
              work_phone = ?,
              mobile_phone = ?
          WHERE person_id = ?";

  $stmt = $db->prepare($sql);
  $vars = [$_POST['first_name'],
           $_POST['last_name'],
           $_POST['gender'],
           $_POST['rank_id'],
           $_POST['radio_number'],
           $_POST['is_active'],
           $_POST['date_of_birth'],
           $_POST['start_date'],
           $_POST['street_address'],
           $_POST['city'],
           $_POST['state_abbr'],
           $_POST['zip'],
           $_POST['contact_email'],
           $_POST['home_phone'],
           $_POST['work_phone'],
           $_POST['mobile_phone'],
           $_POST['person_id']
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
