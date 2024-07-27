<?php
include_once "db_connection.php";
include_once "get_user.php";

if ($_SESSION['user_role'] != '0') {
    echo json_encode(array("error" => "You don't have permission to access this page."));
    exit();
}

// Nhận dữ liệu từ yêu cầu POST
$data = json_decode(file_get_contents('php://input'), true);

// Trích xuất dữ liệu từ đối tượng JSON và escape các ký tự đặc biệt
$id = $data['id'];
$title = mysqli_real_escape_string($conn, $data['title']);
$thumbnail = mysqli_real_escape_string($conn, $data['image']);
$description = mysqli_real_escape_string($conn, $data['description']);
$isbn = mysqli_real_escape_string($conn, $data['isbn']);
$genreIDs = $data['genreId'];



// Thêm thông tin sách vào bảng book
$sql_book = "INSERT INTO book(id, owned) VALUES ($id, 0)";

if ($conn->query($sql_book) === true) {
    $sql = "INSERT INTO book_genre (book_id, genre_id) VALUES (?, ?)";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("ii", $id, $genre_id);

    foreach ($genreIDs as $genreID) {
        $genre_id = $genreID;
        $stmt->execute();
    }

    // Lấy id của bản ghi mới thêm vào bảng book
    $bookId = $conn->insert_id;

    // Thêm thông tin sách vào bảng book_detail với id của bản ghi mới trong bảng book
    $sql_detail = "UPDATE book_detail SET `title` = '$title', `image` = '$thumbnail', `description` = '$description', isbn = '$isbn' WHERE id = $id";

    if ($conn->query($sql_detail) === true) {
        echo json_encode(array("success" => "Book added successfully"));
    } else {
        echo json_encode(array("error" => "Error adding book details: " . $conn->error)); // Trả về thông báo lỗi nếu có lỗi
    }
} else {
    echo json_encode(array("error" => "Error adding book: " . $conn->error)); // Trả về thông báo lỗi nếu có lỗi
}

// Đóng kết nối cơ sở dữ liệu
$conn->close();