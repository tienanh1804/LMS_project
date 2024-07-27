<?php
include_once 'db_connection.php';
include_once 'get_user.php';

// Database query to retrieve book data for the specified user ID
$query = "call CreateRecommendedList(?)";

// Prepare the query
$stmt = $conn->prepare($query);
if ($stmt) {
    // Bind parameters
    $stmt->bind_param('i', $user_id);

    // Execute the query
    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Fetch all the results as an associative array
    if ($result->num_rows > 0) {
        $books = array();
        while ($row = $result->fetch_assoc()) {
            $book = array(
                'id' => $row['the_book_id'],
                'imageSrc' => $row['book_image'],
                'author' => $row['book_author'],
                'name' => $row['book_name']
            );
            $books[] = $book;
        }
        $response['success'] = $books;
    } else {
        $response['success'] = array();
    }

    echo json_encode($response);

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(['error' => 'Failed to prepare the statement']);
}

// Close the database connection
$conn->close();
