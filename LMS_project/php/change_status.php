<?php
include_once "db_connection.php";
include_once "get_user.php";

if ($_SESSION['user_role'] != '0') {
    echo json_encode(array("error" => "You don't have permission to access this page."));
    exit();
}

$user_to_change = $_GET['user'];
$change_to = $_GET['status'];

// Ensure $change_to is safe for use in the SQL query to prevent SQL injection
$change_to_safe = mysqli_real_escape_string($conn, $change_to);

$sql = "UPDATE `account` SET `status` = (SELECT id FROM `status` WHERE `name` = '$change_to_safe') WHERE id = $user_to_change";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("success" => "User role updated successfully."));
} else {
    echo json_encode(array("error" => "Error updating user role: " . $conn->error));
}

$conn->close();
