<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT cert_name, default_exp, first_name, Last_name
FROM Person, Cert_assoc, Certification
WHERE Person.person_id = Cert_assoc.person_id AND Certification.cert_id = Cert_assoc.cert_id AND Certification.cert_id = ?';

if (isset($_GET['certId'])) {
  $stmt = $db->prepare($sql);
  $stmt->execute();
  $vars = [$_GET['certId']];
  $details = $stmt->fetchAll();

  // Step 3: Convert to JSON
  $json = json_encode($details, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
}
