<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query

// to update: calculated field for expiry.

$sql = 'SELECT first_name, last_name, is_active, Certification.cert_name
FROM Person, Cert_assoc, Certification
WHERE Person.person_id = Cert_assoc.person_id AND Certification.cert_id = Cert_assoc.cert_id AND Person.person_id = ?';

if (isset($_GET['personId'])) {
  $stmt = $db->prepare($sql);
  $stmt->execute();
  $vars = [$_GET['personId']];
  $details = $stmt->fetchAll();

  // Step 3: Convert to JSON
  $json = json_encode($details, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
}
