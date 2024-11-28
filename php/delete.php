<?php
$username = 'root';
$password = '';
$hostname = 'localhost';
$database = 'students';

$conn = mysqli_connect($hostname, $username, $password, $database) or die("Connection Failed");
$rollno = $_GET['del'];

$sql = "Delete from students where rollno = '$rollno'" or die("SQL Failed");
$result = mysqli_query($conn, $sql);

if($result){
    echo json_encode(array("Delete" => "success"));
}else{
    echo json_encode(array("Delete" => "error"));
}
