<?php
include_once "db_connection.php";
include_once "get_user.php";

if ($_SESSION['user_id'] == 0) {
    echo json_encode(array('error' => 'Please log in first'));
    exit();
}

$book_id = $_GET['book_id'];


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $comment = $_POST['comment'];

    if (strlen($comment) > 3) {
        try {
            $addCommentQuery = "INSERT INTO `comment` (account_id, book_id, `comment`) VALUES ('$user_id', '$book_id', '$comment')";
            
            if ($conn->query($addCommentQuery) === TRUE) {
                echo json_encode(array('success' => "Comment added successfully."));
            } else {
                throw new Exception("Error adding comment: " . $conn->error);
            }
        } catch (Exception $e) {
            if ($conn->errno == 1062) { //check duplicate
                echo json_encode(array('error' => 'You have already commented on this book.'));
            } else {
                echo "An error occurred while adding the comment: " . $e->getMessage();
            }
        }
    } else {
        echo json_encode(array('error' => "The comment should be at least 4 characters long."));
    }
}