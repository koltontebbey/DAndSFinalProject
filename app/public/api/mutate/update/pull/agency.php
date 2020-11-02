<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

if (isset($_GET['agencyId'])) {
  $vars = [$_GET['agencyId']];

  /*
    SQL statement: Gets member details by id
  */
  $sql = 'SELECT agency_id, agency_name, street_address, city,
            Agency.state_abbr, zip, email, phone_num
          FROM Agency
          WHERE Agency.agency_id = ?
          ';

  $stmt = $db->prepare($sql);
  $stmt->execute($vars);
  $result = $stmt->fetchAll();

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
