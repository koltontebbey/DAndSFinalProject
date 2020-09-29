<?php
// PHP Data Objects(PDO) Sample Code:
try {
    $conn = new PDO("sqlsrv:server = tcp:dssvr.database.windows.net,1433; Database = OCFR", "team23admin", "bala!bipin2020");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "team23admin", "pwd" => "bala!bipin2020", "Database" => "OCFR", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:dssvr.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);
?>
