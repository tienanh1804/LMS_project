<?php
include_once "db_connection.php";
include_once "user_now.php";

// Retrieve current password hash from the database
$stmt = $conn->prepare("SELECT password FROM `account` WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Check if the user exists and retrieve the hashed password
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $currentPasswordHash = $row['password'];
} else {
    echo json_encode(array("error" => "User not found"));
    exit();
}

$stmt->close();

// Validate the current password
$currentPass = $_POST['currentPass']; // Access the current password from POST data
if (!password_verify($currentPass, $currentPasswordHash)) {
    echo json_encode(array("error" => "Current password is incorrect"));
    exit();
}

// Validate the new password
$newPassword = $_POST['newPass'];
$confirmPassword = $_POST['confirmPass'];
if ($newPassword != $confirmPassword) {
    echo json_encode(array("error" => "Passwords do not match"));
    exit();
}

if ($newPassword == $currentPass) {
    echo json_encode(array("error" =>"nothing to change"));
    exit();
}

if (strlen($newPassword) < 8) {
    echo json_encode(array("error" => "New password must be at least 8 characters long"));
    exit();
}

// Hash the new password
$newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

// Update the password in the database
$updateStmt = $conn->prepare("UPDATE `account` SET password = ? WHERE id = ?");
$updateStmt->bind_param("si", $newPasswordHash, $user_id);
if ($updateStmt->execute()) {
    echo json_encode(array("success" => "Password changed successfully"));
} else {
    echo json_encode(array("error" => "Failed to update password"));
}

$updateStmt->close();
$conn->close();
