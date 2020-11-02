<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

if (isset($_GET['agencyId'])) {
  $vars = [$_GET['agencyId']];

  /*
    SQL statement: Gets agency details
  */
  $sql1 = 'SELECT Agency.agency_name,
              Agency.street_address, Agency.city, Agency.state_abbr,
              Agency.zip, Agency.email, Agency.phone_num
            FROM Agency
            WHERE Agency.agency_id = ?
          ';

  $stmt1 = $db->prepare($sql1);
  $stmt1->execute($vars);
  $details = $stmt1->fetchAll();


  $result = [
    "agency_details" => $details,
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
