<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

/*
  SQL Statement: Gets a list of certifications, default expiry and cert. agency.
*/
$sql = 'SELECT cert_name, default_exp, Agency.agency_name
FROM Certification, Agency
WHERE Certification.cert_agency_id = Agency.agency_id';

$stmt = $db->prepare($sql);
$stmt->execute();

$certs = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($certs, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
