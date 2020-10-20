<?php

require 'common.php';


// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

if (isset($_GET['mbrId'])) {
  $vars = [$_GET['mbrId']];
  $sql1 = 'SELECT Person.first_name, Person.last_name, Ranks.rank_name, Person.is_active, start_date, street_address, city, state_abbr, zip, contact_email, home_phone, work_phone, mobile_phone
  FROM  Person, Ranks
  WHERE Person.rank_id = Ranks.rank_id AND Person.person_id = ?
    ';
    $stmt1 = $db->prepare($sql1);
    $stmt1->execute($vars);
    $details = $stmt1->fetchAll();

    $sql2 = 'SELECT cert_name, date_obtained, exp_date,
              CASE
              	WHEN delta < 0 THEN \'Expired\'
              	ELSE \'Valid\'
              END AS \'expired\'
              FROM(
              	(SELECT cert_name, date_obtained, exp_date, DATEDIFF(exp_date, CURDATE()) AS delta
              	FROM(
              		(SELECT cert_name, date_obtained, STR_TO_DATE(CONCAT(exp_yr,\'-\',LPAD(MONTH(date_obtained), 2 ,\'00\'),\'-\',LPAD(DAY(date_obtained), 2 ,\'00\')), \'%Y-%m-%d\') AS exp_date
              		FROM(
              			(SELECT Certification.cert_name, date_obtained, YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr
              			FROM Person, Cert_assoc, Certification
              			WHERE Person.person_id = Cert_assoc.person_id AND Certification.cert_id = Cert_assoc.cert_id AND Person.person_id = ?) AS temp
              		)) AS temp2
              	)) AS temp3
              )
              ORDER BY cert_name
    ';
    $stmt2 = $db->prepare(stripslashes($sql2));
    $stmt2->execute($vars);
    $certs = $stmt2->fetchAll();

    $result = [
      "mbr_details" => $details,
      "certs" => $certs
    ];
    // Step 3: Convert to JSON
    $json = json_encode($result, JSON_PRETTY_PRINT);

    // Step 4: Output
    header('Content-Type: application/json');
    echo $json;
}
