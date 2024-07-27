<?php
include_once "db_connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $json_data = file_get_contents('php://input');
    $data_array = json_decode($json_data, true); 

    if (is_array($data_array)) {
        $book_id = $data_array['book_id'];
        echo "re_id: " . $book_id;
    } else {
        echo "Error decoding JSON data.";
    }

    $sql = "UPDATE reservation SET reservation_status_id = 3 WHERE book_id = ?";
    $stmt = $conn->prepare($sql);
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
?>
