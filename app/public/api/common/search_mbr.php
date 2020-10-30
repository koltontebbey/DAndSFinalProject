<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Search if search term is set
if (isset($_POST['searchTerm'])) {

  /*
     SQL statement: temp -> gets person_id, and concats first and last into full
     name. Outer statment selects all where the search term is contained in the
     name.
  */

  $sql = addslashes("SELECT *
          FROM (
          SELECT person_id, CONCAT(first_name, ' ', last_name) AS full_name
          FROM Person
          ) AS temp
          WHERE full_name LIKE CONCAT('%', ?, '%')");


  $stmt = $db->prepare(stripslashes($sql));
  $vars = [$_POST['searchTerm']];
  $stmt->execute($vars);

  $results = $stmt->fetchAll();

  $json = json_encode($results, JSON_PRETTY_PRINT);

  // 200 OK
  http_response_code(200);
  header('Content-Type: application/json');

  echo $json;

}
else{
  // returns 400 bad request error if no param is entered.
  http_response_code(400);
}
