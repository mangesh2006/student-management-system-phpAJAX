<?php
$username = 'root';
$password = '';
$hostname = 'localhost';
$database = 'students';

$conn = mysqli_connect($hostname, $username, $password, $database) or die("Connection Failed");
$input = file_get_contents("php://input");
$decode = json_decode($input, true);
$rollno = $decode['rollno'];
$name = $decode['name'];
$mobile = $decode['mobileno'];
$course = $decode['course'];
$semester = $decode['semester'];
$email = $decode['email'];

$sql = "Insert into students values('$rollno', '$name', '$mobile', '$course', '$semester', '$email')" or die("SQL Failed");
$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode(array("insert" => "success"));
} else {
    echo json_encode(array("insert" => "error"));
}
