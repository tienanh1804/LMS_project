<?php
include_once "db_connection.php";
include_once "get_user.php";

if ($_SESSION['user_id'] == 0) {
    echo json_encode(array('error' => 'Please log in first.'));
    exit();
}

// Get the book ID from the query string
$book_id = $_GET['book_id'];

// Check the request method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $queryCheckBorrow = "SELECT return_date FROM borrow WHERE book_id = ? AND account_id = ? AND return_date IS NULL";
    $stmtCheckBorrow = $conn->prepare($queryCheckBorrow);
    $stmtCheckBorrow->bind_param("ii", $book_id, $user_id);
    $stmtCheckBorrow->execute();
    $resultBorrow = $stmtCheckBorrow->get_result();
    
    if ($resultBorrow->num_rows > 0) {
        // The user is still borrowing the book
        echo json_encode(array('error' => 'You are currently borrowing this book.'));
        exit();
    }

    $queryCheckBorrow = "SELECT id FROM reservation WHERE book_id = ? AND account_id = ? AND reservation_status_id = 1";
    $stmtCheckBorrow = $conn->prepare($queryCheckBorrow);
    $stmtCheckBorrow->bind_param("ii", $book_id, $user_id);
    $stmtCheckBorrow->execute();
    $resultBorrow = $stmtCheckBorrow->get_result();
    
    if ($resultBorrow->num_rows > 0) {
        // The user is still borrowing the book
        $changing_status_query = "UPDATE reservation SET reservation_status_id = 4 WHERE book_id = ? AND account_id = ? AND reservation_status_id = 1";
        $stmtChangeReservation = $conn ->prepare($changing_status_query);
        $stmtChangeReservation -> bind_param("ii", $book_id, $user_id);
        $stmtChangeReservation->execute();
        echo json_encode(array('error' => 'reservation cancelled'));
        exit();
    }

    // Check if the book is available (owned > 0)
    $queryCheck = "SELECT (owned > 0) AS is_owned FROM book WHERE id = ?";
    $stmtCheck = $conn->prepare($queryCheck);
    $stmtCheck->bind_param("i", $book_id);
    $stmtCheck->execute();
    $result = $stmtCheck->get_result();
    $row = $result->fetch_assoc();

    if (!$row || $row['is_owned'] == 0) {
        echo json_encode(array('error' => 'There is no book left.'));
        exit();
    }

    // Insert reservation
    $query = "INSERT INTO reservation (book_id, account_id, reservation_date, `reservation_status_id`) VALUES (?, ?, NOW(), ?)";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        echo json_encode(array('error' => 'Failed to prepare statement: ' . $conn->error));
        exit();
    }

    $status = 1;
    $stmt->bind_param("iii", $book_id, $user_id, $status);

    if ($stmt->execute()) {
        echo json_encode(array('success' => 'Reservation successful.'));
    } else {
        echo json_encode(array('error' => 'Failed to make reservation: ' . $stmt->error));
    }

    // Close the prepared statement and the database connection
    $stmt->close();
    $stmtCheck->close();
    $conn->close();
    exit();
}
