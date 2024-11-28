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

$sql = "Update students set rollno = '$rollno', name = '$name', mobileno = '$mobile', course = '$course', semester = '$semester', email = '$email' where rollno = '$rollno'" or die("SQL Failed");
$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode(array("update" => "success"));
} else {
    echo json_encode(array("update" => "error"));
}
