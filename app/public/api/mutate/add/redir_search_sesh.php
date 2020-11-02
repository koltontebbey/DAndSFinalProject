<?php
session_start();

// retrieve from session
if(isset($_GET['getinfo'])){
  $results = array();
  if(isset($_SESSION["cert_name"])){
    $results += array('cert_name' => $_SESSION['cert_name']);
    unset($_SESSION['cert_name']);
  }
  if(isset($_SESSION["default_exp"])){
    $results += array('default_exp' => $_SESSION['default_exp']);
    unset($_SESSION['default_exp']);
  }
  $json = json_encode($results, JSON_PRETTY_PRINT);
  // 200 OK
  http_response_code(200);
  header('Content-Type: application/json');
  echo $json;
}
// set on session
else{
  if(isset($_POST['cert_name'])){
    $_SESSION["cert_name"] = $_POST['cert_name'];
  }
  if(isset($_POST['default_exp'])){
    $_SESSION["default_exp"] = $_POST['default_exp'];
  }
  $status = array("status" => "ok");
  $json = json_encode($_POST, JSON_PRETTY_PRINT);
  // 200 OK
  http_response_code(200);
  header('Content-Type: application/json');
  echo $json;
}
