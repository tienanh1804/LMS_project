<?php
include_once "db_connection.php";
include_once "get_user.php";

// Kiểm tra nếu người dùng chưa đăng nhập
if ($_SESSION['user_id'] == 0) {
    echo json_encode('Please log in first');
    exit();
}

$book_id = $_GET['book_id'];

// Lấy thông tin của người dùng từ session
$user_id = $_SESSION['user_id'];

// Truy vấn cơ sở dữ liệu để lấy thông tin sách từ bảng book_detail và tác giả từ bảng author
$sql = "SELECT bd.title, bd.image, a.name AS author_name
        FROM book_detail bd
        INNER JOIN book_author ba ON bd.id = ba.book_id
        INNER JOIN author a ON ba.author_id = a.id
        WHERE bd.id = $book_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $title = $row['title'];
    $image = $row['image'];
    $author = $row['author_name'];

    // Tạo một kết nối tới MongoDB
    require 'C:\xampp\htdocs\project_DBMS\LMS_project\vendor\autoload.php';
    $connectionString = 'mongodb+srv://caovananhnd2021:6ZtSq8I3XDCcX2z2@cluster0.nurixz1.mongodb.net';
    $manager = new MongoDB\Client($connectionString);
    $mongoDB = $manager->selectDatabase('library');
    $mongoCollection = $mongoDB->selectCollection('wishlist');

    // Kiểm tra xem sách đã có trong wishlist của người dùng chưa
    $existingWishlist = $mongoCollection->findOne(['user_id' => $user_id, 'book_id' => $book_id]);

    if ($existingWishlist) {
        // Nếu sách đã có trong wishlist, xóa nó khỏi danh sách yêu thích
        $mongoCollection->deleteOne(['user_id' => $user_id, 'book_id' => $book_id]);
        echo json_encode("Book removed from wishlist.");
    } else {
        // Nếu sách chưa có trong wishlist, thêm vào
        $wishlistData = [
            'user_id' => $user_id,
            'book_id' => $book_id,
            'title' => $title,
            'image' => $image,
            'author' => $author
        ];
        $mongoCollection->insertOne($wishlistData);
        echo json_encode("Book added to wishlist successfully.");
    }
} else {
    echo json_encode("Book not found in the database.");
}