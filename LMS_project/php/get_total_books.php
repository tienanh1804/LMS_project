<?php

include 'db_connection.php';

// Thực hiện truy vấn để lấy tổng số cuốn sách từ bảng book_detail
// Thực hiện truy vấn để lấy tổng số cuốn sách từ bảng book_detail
$sql = "SELECT COUNT(*) AS totalBooks FROM book_detail";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Trả về kết quả dưới dạng JSON
    header('Content-Type: application/json');
    $row = $result->fetch_assoc();
    $totalBooks = $row["totalBooks"];
    echo json_encode(array("totalBooks" => $totalBooks));
} else {
    // Trường hợp không có cuốn sách nào trong cơ sở dữ liệu
    echo json_encode(array("totalBooks" => 0));
}

// Đóng kết nối
$conn->close();
?>