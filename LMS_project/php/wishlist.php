<?php
// Kết nối đến MongoDB
include 'get_user.php';
require 'C:\xampp\htdocs\project_DBMS\LMS_project\vendor\autoload.php';
$connectionString = 'mongodb+srv://caovananhnd2021:6ZtSq8I3XDCcX2z2@cluster0.nurixz1.mongodb.net';
$manager = new MongoDB\Client($connectionString);
$mongoDB = $manager->selectDatabase('library');
$mongoCollection = $mongoDB->selectCollection('wishlist');

// Lấy thông tin từ MongoDB
$user_id = $_SESSION['user_id'];

// Tạo một query để lấy dữ liệu từ MongoDB
$query = [
    'user_id' => $user_id
];

$cursor = $mongoCollection->find($query);

$wishlistData = array();

// Duyệt qua các tài liệu trả về
foreach ($cursor as $document) {
    $wishlistData[] = [
        'id' => $document['book_id'],
        'name' => $document['title'],
        'author' => $document['author'],
        'imageSrc' => $document['image']
    ];
}

// Trả về kết quả dưới dạng JSON
echo json_encode($wishlistData);
?>