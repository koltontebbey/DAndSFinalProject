<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$querystr = 'SELECT Person.first_name, Person.last_name, Person.is_active, Certification.cert_name, assoc.exp_date, DATEDIFF(assoc.exp_date, CURDATE()) AS delta
							FROM(
								(
									SELECT person_id, cert_id,
									 CASE
									 WHEN exp_date_ovr IS NULL THEN exp_date_calc
									 ELSE exp_date_ovr
									 END AS exp_date
									FROM(
									(
										SELECT person_id, cert_id, exp_date AS exp_date_ovr,
										STR_TO_DATE(CONCAT(exp_yr,\'-\',
											LPAD(MONTH(date_obtained), 2,\'00\'),\'-\',
											LPAD(DAY(date_obtained), 2,\'00\')), \'%Y-%m-%d\') AS exp_date_calc
										FROM(
										(
											SELECT person_id, Certification.cert_id, Cert_assoc.date_obtained,
											 Cert_assoc.exp_date,
											 YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr
											FROM Cert_assoc, Certification
											WHERE Certification.cert_id = Cert_assoc.cert_id) AS temp
										)) AS temp2
									)
								) AS assoc,
								 Person,
								 Certification
							)
							WHERE assoc.person_id = Person.person_id AND
								Certification.cert_id = assoc.cert_id
							HAVING delta < 0
							';

$stmt = $db->prepare(stripslashes($querystr));
$stmt->execute();

$results = $stmt->fetchAll();

$json = json_encode($results, JSON_PRETTY_PRINT);

// 200 OK
http_response_code(200);
header('Content-Type: application/json');

echo $json;
