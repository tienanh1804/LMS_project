<?php
//cần check lại
session_start();
include_once "db_connection.php";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $id = $_SESSION['user_id'];
  
    $sql = "SELECT firstName, lastName, age, gender, gmail, phone_number FROM account_profile WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        echo json_encode(array(
            'firstName' => $row['firstName'],
            'lastName' => $row['lastName'],
            'age' => $row['age'],
            'gender' => $row['gender'],
            'email' => $row['gmail'],
            'phoneNumber' => $row['phone_number']
        ));
    } else {
        echo json_encode(array('error' => 'Không tìm thấy thông tin người dùng.'));
    }

    $conn->close();
}