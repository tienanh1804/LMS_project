<?php
include_once 'db_connection.php';
include_once 'get_user.php';

// Database query to retrieve book data for the specified user ID
$query = "call CreatePopularList()";

// Prepare the query

// Fetch all the results as an associative array
if ($result = $conn->query($query)) {
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

// Close the database connection
$conn->close();
