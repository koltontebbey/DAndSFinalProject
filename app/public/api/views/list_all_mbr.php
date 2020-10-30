<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

/*
  SQL Statement: Grabs list of members and their details
*/
$sql = 'SELECT first_name, last_name, gender, date_of_birth, is_active, radio_number, station_name,
            Ranks.rank_id, Ranks.rank_name, contact_email, Person.street_address,
            Person.city, Person.state_abbr
            FROM Person, Ranks, Station_assoc, Station
            WHERE Person.rank_id = Ranks.rank_id
                AND Person.person_id = Station_assoc.person_id
                AND Station_assoc.station_id = Station.station_id;';

$stmt = $db->prepare($sql);
$stmt->execute();

$mbrs = $stmt->fetchAll();

$json = json_encode($mbrs, JSON_PRETTY_PRINT);

// 200 OK
http_response_code(200);
header('Content-Type: application/json');

echo $json;
