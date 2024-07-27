<?php
include_once "db_connection.php";
include_once "get_user.php";

if ($_SESSION['user_role'] != 0) {
    echo json_encode(array("error" => "You don't have permission to access this page."));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_GET['book_id'])) {
        echo json_encode(array("error" => "Book ID is missing.\n"));
        exit();
    } else {
        $book_id = $_GET['book_id'];
    }

    // Prepare and execute the call to the stored procedure
    $stmt = $conn->prepare("CALL DeleteBook(?)");
    $stmt->bind_param("i", $book_id);

    if ($stmt->execute()) {
        // If execution is successful, fetch the result
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        
        // Output the success message
        echo json_encode(array("success" => $row['message']));
    } else {
        // If execution fails, output an error message
        echo json_encode(array("error" => "Failed to delete book."));
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
