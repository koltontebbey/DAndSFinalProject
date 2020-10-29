<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

/*
  SQL Statement: Gets list of station and people in them, lists details
*/
$querystr = 'SELECT Station.station_name, Person.radio_number, Person.first_name,
              Person.last_name, Ranks.rank_name, Person.contact_email
              FROM Person, Station, Station_assoc, Ranks
              WHERE Person.person_id = Station_assoc.person_id AND
                Station_assoc.station_id = Station.station_id AND
                Person.rank_id = Ranks.rank_id
              ORDER BY station_name, radio_number';

$stmt = $db->prepare($querystr);
$stmt->execute();

$results = $stmt->fetchAll();

$json = json_encode($results, JSON_PRETTY_PRINT);

// 200 OK
http_response_code(200);
header('Content-Type: application/json');

echo $json;
