<?php

require 'common.php';

// Get connection from helper
$db = DbConnection::getConnection();

// Search if search term is set
if (isset($_POST['searchTerm'])) {

  /*
     SQL statement: gets all certificates where the name matches search
  */
  $sql = addslashes("SELECT rank_id, rank_name
                      FROM Ranks
                      WHERE rank_name LIKE CONCAT('%', ?, '%')");


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
