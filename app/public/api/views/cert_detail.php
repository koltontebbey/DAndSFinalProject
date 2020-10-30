<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

if (isset($_GET['certId'])) {
  $vars = [$_GET['certId']];

  /*
    SQL statement: Gets certification details
  */
  $sql1 = 'SELECT cert_name, default_exp, Agency.agency_name,
              Agency.street_address, Agency.city, Agency.state_abbr,
              Agency.zip, Agency.email, Agency.phone_num
            FROM Certification, Agency
            WHERE Certification.cert_agency_id = Agency.agency_id AND
              Certification.cert_id = ?
          ';

  $stmt1 = $db->prepare($sql1);
  $stmt1->execute($vars);
  $details = $stmt1->fetchAll();


  /*
    SQL statement: Gets members with this certification
  */
  $sql2 = 'SELECT person_id, first_name, last_name, date_obtained, exp_date,
            CASE
              WHEN delta < 0 THEN \'Expired\'
              ELSE \'Valid\'
              END AS \'status\'
            FROM(
              SELECT person_id, first_name, last_name, date_obtained, exp_date,
                DATEDIFF(exp_date, CURDATE()) AS delta
                FROM(
            		    (
                      SELECT person_id, first_name, last_name, date_obtained,
                        CASE
                        WHEN exp_date_ovr IS NULL THEN exp_date_calc
                        ELSE exp_date_ovr END AS exp_date
                        FROM(
            			           (
                               SELECT person_id, first_name, last_name, date_obtained,
                                exp_date_ovr, STR_TO_DATE(CONCAT(exp_yr,\'-\',
                                  LPAD(MONTH(date_obtained), 2,\'00\'),\'-\',
                                  LPAD(DAY(date_obtained), 2,\'00\')),
                                  \'%Y-%m-%d\') AS exp_date_calc
                               FROM(
            				                 (
                                       SELECT Person.person_id,first_name, last_name,
                                       date_obtained, exp_date AS exp_date_ovr,
                                       YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr
                                       FROM Person, Cert_assoc, Certification
                                       WHERE Person.person_id = Cert_assoc.person_id AND
                                       Certification.cert_id = Cert_assoc.cert_id AND
                                       Certification.cert_id = ?) AS temp
            			                  )) AS temp2
            		            )) AS temp3
            	       )
                   ) AS temp4
            ORDER BY person_id
  ';

  $stmt2 = $db->prepare(stripslashes($sql2));
  $stmt2->execute($vars);
  $mbrs = $stmt2->fetchAll();

  $result = [
    "cert_details" => $details,
    "members" => $mbrs
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
