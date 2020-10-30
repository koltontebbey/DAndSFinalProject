<?php

require 'common.php';


// Get connection from helper
$db = DbConnection::getConnection();

if (isset($_GET['mbrId'])) {

  $vars = [$_GET['mbrId']];

  /*
    SQL statement: Gets member details
  */
  $sql1 = 'SELECT Person.first_name, Person.last_name, Person.gender,
            Ranks.rank_name, Person.is_active, start_date, street_address, city,
            state_abbr, zip, contact_email, home_phone, work_phone, mobile_phone
          FROM  Person, Ranks
          WHERE Person.rank_id = Ranks.rank_id AND Person.person_id = ?';

  $stmt1 = $db->prepare($sql1);
  $stmt1->execute($vars);
  $details = $stmt1->fetchAll();

  /*
    SQL statement: Gets member's certification
  */
  $sql2 = 'SELECT cert_name, date_obtained, exp_date ,
            CASE WHEN delta < 0 THEN \'Expired\' ELSE \'Valid\' END AS \'status\'
                FROM(
                	SELECT cert_name, date_obtained, exp_date,
                    DATEDIFF(exp_date, CURDATE()) AS delta
                	FROM(
                		(
                	SELECT cert_name, date_obtained,
                    CASE
                      WHEN exp_date_ovr IS NULL THEN exp_date_calc
                      ELSE exp_date_ovr
                    END AS exp_date
                	FROM(
                			(
                	SELECT cert_name, date_obtained,
                  STR_TO_DATE(
                    CONCAT(exp_yr,\'-\', LPAD(MONTH(date_obtained), 2,\'00\')
                    ,\'-\', LPAD(DAY(date_obtained), 2,\'00\')), \'%Y-%m-%d\')
                  AS exp_date_calc, exp_date_ovr
                	FROM(
                				(
                	SELECT Certification.cert_name, date_obtained,
                    YEAR(Cert_assoc.date_obtained) +
                    Certification.default_exp AS exp_yr,
                    exp_date AS exp_date_ovr
                	FROM Person, Cert_assoc, Certification
                	WHERE Person.person_id = Cert_assoc.person_id AND
                    Certification.cert_id = Cert_assoc.cert_id AND
                    Person.person_id = ?) AS temp
                			)) AS temp2
                		)) AS temp3
                	)
                ) AS temp4
                ORDER BY cert_name
              ';

    $stmt2 = $db->prepare(stripslashes($sql2));
    $stmt2->execute($vars);
    $certs = $stmt2->fetchAll();

    $result = [
      "mbr_details" => $details,
      "certs" => $certs
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
