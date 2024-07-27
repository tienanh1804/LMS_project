<?php
include_once "db_connection.php";
include_once "get_user.php";

if (!isset($_GET['book_id'])) {
    echo json_encode(array('error' => 'Book ID is required.'));
    exit();
}

// Get the book_id from the URL
$book_id = $_GET['book_id'];

$sql = "SELECT 
            title, ISBN, book_detail.description, owned AS instock, GROUP_CONCAT(author.name SEPARATOR ';') AS authors
        FROM
            book_author
                JOIN
            author ON author.id = book_author.author_id
                JOIN
            book_detail ON book_detail.id = book_author.book_id
                JOIN
            book ON book.id = book_detail.id
        WHERE
            book.id = $book_id
        GROUP BY
            book.id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $book_data = array(
        'title' => $row['title'],
        'authors' => $row['authors'],
        'instock' => $row['instock'],
        'description' => $row['description'],
        'ISBN' => $row['ISBN']
    );
    echo json_encode(array('success' => $book_data));
} else {
    echo json_encode(array('error' => 'Book not found.'));
}

$conn->close();