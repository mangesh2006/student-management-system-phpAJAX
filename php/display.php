<?php
$username = 'root';
$password = '';
$hostname = 'localhost';
$database = 'students';

$conn = mysqli_connect($hostname, $username, $password, $database) or die("Connection Failed");
$sql = "Select * from students" or die("SQL Failed");
$result = mysqli_query($conn, $sql);
$output = [];

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $output[] = $row;
    }
} else {
    $output['empty'] = ['empty'];
}

mysqli_close($conn);
echo json_encode($output);
