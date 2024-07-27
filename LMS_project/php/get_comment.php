<?php 
include_once "db_connection.php";
include_once "get_user.php";

$book_id = $_GET['book_id'];

$sql = "SELECT username, `comment`.`comment` FROM 
`comment` INNER JOIN `account` ON `account`.id = `comment`.account_id
WHERE `book_id` = $book_id
ORDER BY 
    CASE 
        WHEN account_id = $user_id THEN 0
        ELSE 1
    END,
    posting_time";
    
$result = $conn->query($sql);

$response = array(); 

if ($result->num_rows > 0) {
    $comments = array(); 
    while ($row = $result->fetch_assoc()) {
        $comment = array(
            'username' => $row['username'],
            'comment' => $row['comment']
        );
        $comments[] = $comment;
    }
    $response['success'] = $comments; 
} else {
    $response['success'] = array(); 
}

echo json_encode($response); 
