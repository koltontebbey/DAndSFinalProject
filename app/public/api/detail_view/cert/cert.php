<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

if (isset($_GET['certId'])) {
  $vars = [$_GET['certId']];

  $sql1 = 'SELECT cert_name, default_exp, Agency.agency_name, Agency.street_address, Agency.city, Agency.state_abbr, Agency.zip, Agency.email, Agency.phone_num
  FROM Certification, Agency
  WHERE Certification.cert_agency_id = Agency.agency_id AND Certification.cert_id = ?
  ';
  $stmt1 = $db->prepare($sql1);
  $stmt1->execute($vars);
  $details = $stmt1->fetchAll();

  $sql2 = 'SELECT person_id, first_name, last_name, date_obtained, exp_date,
  CASE
  	WHEN delta < 0 THEN \'Expired\'
  	ELSE \'Valid\'
  END AS \'Expired?\'
  FROM(
  	(SELECT person_id, first_name, last_name, date_obtained, exp_date, DATEDIFF(exp_date, CURDATE()) AS delta
  	FROM(
  		(SELECT person_id, first_name, last_name, date_obtained, STR_TO_DATE(CONCAT(exp_yr,\'-\',LPAD(MONTH(date_obtained), 2 ,\'00\'),\'-\',LPAD(DAY(date_obtained), 2 ,\'00\')), \'%Y-%m-%d\') AS exp_date
  		FROM(
  			(SELECT Person.person_id,first_name, Last_name, date_obtained, YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr
  			FROM Person, Cert_assoc, Certification
  			WHERE Person.person_id = Cert_assoc.person_id AND Certification.cert_id = Cert_assoc.cert_id AND Certification.cert_id = ?) AS temp
  		)) AS temp2
  	)) AS temp3
  )
  ';
  $stmt2 = $db->prepare(stripslashes($sql2));
  $stmt2->execute($vars);
  $mbrs = $stmt2->fetchAll();

  $result = [
    "cert_details" => $details,
    "members" => $mbrs
  ];
  // Step 3: Convert to JSON
  $json = json_encode($result, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
}
