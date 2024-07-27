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
    
    $json_data = file_get_contents('php://input');
    
    $data = json_decode($json_data, true);
    
    if (isset($data['tooltipIDs'])) {
        $tooltipIDs = $data['tooltipIDs'];
        
        $delete_query = "DELETE FROM book_genre WHERE book_id = ?";
        $stmt_delete = $conn->prepare($delete_query);
        $stmt_delete->bind_param("i", $book_id);
        if (!$stmt_delete->execute()) {
            echo json_encode(array('error' => 'problem arise when delete previous data.\n'));
            exit();
        }
        $stmt_delete->close();
        
        $sql = "INSERT INTO book_genre (book_id, genre_id) VALUES (?, ?)";
        
        $stmt = $conn->prepare($sql);
        
        $stmt->bind_param("ii", $book_id, $genre_id);
        
        foreach ($tooltipIDs as $tooltipID) {
            $genre_id = $tooltipID;
            $stmt->execute();
        }
        
        $stmt->close();
        echo json_encode(array('success' => "finish change genre of the book."));
    } else {
        
        echo json_encode(array('error' => 'Tooltip IDs not found in JSON data'));
    }
} else {
    
    echo json_encode(array('error' => 'Invalid request method'));
}
