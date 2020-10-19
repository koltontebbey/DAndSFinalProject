<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$querystr = 'SELECT Person.first_name, Person.last_name, Person.is_active, Certification.cert_name, assoc.exp_date
FROM(
	(SELECT person_id, cert_id, exp_date,DATEDIFF(exp_date, CURDATE()) AS delta
	FROM(
		(SELECT person_id, cert_id, STR_TO_DATE(CONCAT(exp_yr,\'-\',LPAD(MONTH(date_obtained), 2 ,\'00\'),\'-\',LPAD(DAY(date_obtained), 2 ,\'00\')), \'%Y-%m-%d\') AS exp_date
		FROM(
			(SELECT person_id, Certification.cert_id, Cert_assoc.date_obtained,YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr
			FROM Cert_assoc, Certification
			WHERE Certification.cert_id = Cert_assoc.cert_id) AS temp
		)) AS temp2
	)
	HAVING delta < 0) AS assoc, Person, Certification
)
WHERE assoc.person_id = Person.person_id AND Certification.cert_id = assoc.cert_id
ORDER BY exp_date';

$stmt = $db->prepare(stripslashes($querystr));
$stmt->execute();

$comments = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($comments, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
