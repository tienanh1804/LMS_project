<?php
include_once "db_connection.php";
include_once "get_user.php";

if ($_SESSION['user_id'] == 0) {
    echo json_encode(array('error' => 'Please log in first'));
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    
    // Validate and sanitize inputs
    $firstName = isset($_GET['firstName']) ? $_GET['firstName'] : '';
    $lastName = isset($_GET['lastName']) ? $_GET['lastName'] : '';
    $age = isset($_GET['age']) ? $_GET['age'] : 0;
    $gender = isset($_GET['gender']) ? $_GET['gender'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : '';
    $phoneNumber = isset($_GET['phoneNumber']) ? $_GET['phoneNumber'] : '';

    // Convert gender to integer value
    $genderValue = 0;
    if ($gender === 'Female') {
        $genderValue = 1;
    } elseif ($gender === 'Male') {
        $genderValue = 2;
    }

    $sql = "UPDATE account_profile SET firstName=?, lastName=?, age=?, gender=?, gmail=?, phone_number=? WHERE id=?";


    $stmt = $conn->prepare($sql);

    // Bind parameters with correct types
    $stmt->bind_param("ssiissi", $firstName, $lastName, $age, $genderValue, $email, $phoneNumber, $user_id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(array('success' => 'Success to update profile'));
    } else {
        echo json_encode(array('error' => 'Failed to update profile.'));
    }
} else {
    echo json_encode(array('error' => 'Invalid request method.'));
}

$stmt->close();
$conn->close();
