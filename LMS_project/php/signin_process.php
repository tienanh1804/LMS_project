<?php
include_once "db_connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT password FROM `account` where username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows <= 0) {
        echo json_encode(array("error" => "Your username or password is incorrect!"));
        exit();
    }
    $row = $result->fetch_assoc();

    if (!password_verify($password, $row['password'])) {
        echo json_encode(array("error" => "Your username or password is incorrect!"));
        exit();
    }

    $sql = "CALL login(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    if (isset($row['response'])) {
        $response = json_decode($row['response'], true);
        if (isset($response['success'])) {
            session_start();
            $_SESSION['username'] = $username;
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['user_role'] = $row['role'];
            
            if ($_SESSION['user_role'] === 1) {
                echo json_encode(array('success-1' => 'success login into member'));
            }
            elseif ($_SESSION['user_role'] === 0) {
                echo json_encode(array('success-0' => 'success login into admin'));
            } 
        } elseif (isset($response['error'])) {
            echo json_encode(array('error' => $response['error']));
            exit();
        } else {
            echo json_encode(array('error' => 'Unexpected error occurred.'));
            exit();
        }
    }

    $conn->close();
}