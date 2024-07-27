<?php
include_once "db_connection.php";
include_once "get_user.php";

if ($_SESSION['user_role'] != '0') {
    echo json_encode(array("error" => "You don't have permission to access this page."));
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $genre = $_POST['genre'];
    $newTitle = $_POST['newTitle'];
    $newDescription = strlen($_POST['newDescription']) > 0 ? $_POST['newDescription'] : "NULL";

    // Prepare and execute the SQL statement
    $sql = "UPDATE genre SET title = ?, `description` = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $newTitle, $newDescription, $genre);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to update genre']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
