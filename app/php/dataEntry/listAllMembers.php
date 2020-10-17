<?php

require 'common.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT first_name, last_name, is_active, radio_number, station_name, contact_email, Person.street_address, Person.city, Person.state_abbr
From Person, Position, Station_assoc, Station
Where Person.position_id = Position.position_id AND Person.person_id = Station_assoc.person_id AND Station_assoc.station_id = Station.station_id';

$stmt = $db->prepare($sql);
$stmt->execute();

$comments = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($comments, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
