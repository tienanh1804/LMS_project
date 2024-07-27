<?php
// Kết nối tới cơ sở dữ liệu MySQL
$servername = "localhost";
$username = "root"; 
$password = getenv('mySQLPass'); 
$dbname = "project_DBMS"; 

// Tạo kết nối
$conn = new mysqli($servername, $username, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
