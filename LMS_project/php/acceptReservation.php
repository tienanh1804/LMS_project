<?php
include_once "db_connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json_data = file_get_contents('php://input');
    $data_array = json_decode($json_data, true);

    if (is_array($data_array)) {
        $book_id = $data_array['book_id'];
        echo "book_id: " . $book_id;
    } else {
        echo "Error decoding JSON data.";
    }

    // Prepare SQL statements with placeholders for book_id
    $sql_reservation = "UPDATE reservation SET reservation_status_id = 2 WHERE book_id = ?";
    $sql_borrow = "UPDATE borrow SET borrow_date = NOW() WHERE book_id = ?";

    // Prepare and execute SQL statements
    $stmt_reservation = $conn->prepare($sql_reservation);
    $stmt_borrow = $conn->prepare($sql_borrow);

    // Bind parameters
    $stmt_reservation->bind_param("i", $book_id);
    $stmt_borrow->bind_param("i", $book_id);

    // Execute SQL statements
    $stmt_reservation->execute();
    $stmt_borrow->execute();

    // Check if both statements were successful
    if ($stmt_reservation->affected_rows > 0 && $stmt_borrow->affected_rows > 0) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false));
    }

    // Close statements and connection
    $stmt_reservation->close();
    $stmt_borrow->close();
    $conn->close();
} else {
    echo json_encode(['success' => false]);
}
?>
