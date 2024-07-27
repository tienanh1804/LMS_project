<?php
include_once "db_connection.php";
include_once "get_user.php";

if ($_SESSION['user_role'] != '0') {
    echo json_encode(array("error" => "You don't have permission to access this page."));
    exit();
}

if(isset($_GET['book_id'])) {
    // Retrieve the book_id value
    $book_id = $_GET['book_id'];
} else {
    echo json_encode(array("error" => "something went wrong"));
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $newTitle = $_POST['newTitle'];
    $newDescription = strlen($_POST['newDescription']) > 0 ? $_POST['newDescription'] : "NULL";

    $sql = "INSERT INTO genre (id, title, `description`) VALUES ((select max(id) + 1 from genre g), ?, ?)";
    
    // Prepare and execute the SQL statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $newTitle, $newDescription);
    if ($stmt->execute()) {
        echo json_encode(array("success" => "Genre added successfully."));
    } else {
        echo json_encode(array("error" => "Error adding genre."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method."));
}
