<?php
include_once "db_connection.php";
include_once "get_user.php";

if ($_SESSION['user_role'] != '0') {
    echo json_encode(array("error" => "You don't have permission to access this page."));
    exit();
}

$user_to_delete = $_GET['user'];

$sql = "DELETE FROM `account` WHERE id = $user_to_delete";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("success" => "User deleted successfully."));
} else {
    echo json_encode(array("error" => "Error deleting user: " . $conn->error));
}

$conn->close();
