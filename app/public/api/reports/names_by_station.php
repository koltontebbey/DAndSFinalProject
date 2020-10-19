<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$querystr = 'SELECT Station.station_name, Person.radio_number, Person.first_name, Person.last_name, Person.contact_email
FROM Person, Station, Station_assoc
WHERE Person.person_id = Station_assoc.person_id AND Station_assoc.station_id = Station.station_id
ORDER BY station_name, radio_number';

$stmt = $db->prepare($querystr);
$stmt->execute();

$comments = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($comments, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
