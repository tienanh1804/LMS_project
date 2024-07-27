<?php
//ok
include_once "db_connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $json_data = file_get_contents('php://input');
    $data_array = json_decode($json_data, true); 

    if (is_array($data_array)) {
        $book_id = $data_array['book_id'];
        echo "Book ID: " . $book_id;
    } else {
        echo "Error decoding JSON data.";
    }

    $sql_update = "UPDATE borrow SET return_date = NOW(), borrow_status = 1 WHERE id = ?";
    
    $stmt = $conn->prepare($sql_update);
    $stmt->bind_param("i", $book_id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }


    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false]);
}
