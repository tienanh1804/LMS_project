<?php
include_once 'db_connection.php';
include_once 'get_user.php';

if ($_SESSION['user_role'] != '0') {
    echo json_encode(array("error" => "You don't have permission to access this page."));
    exit();
}

if (isset($_POST['genre_text'])) {
    // Lấy từ khóa tìm kiếm từ dữ liệu POST
    $keyword = $_POST['genre_text'];

    $query = "SELECT `id`, `title` 
    FROM `genre`
    WHERE `title` LIKE ? LIMIT 5";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        // Xử lý lỗi nếu prepare statement không thành công
        die("Error: " . $conn->error);
    }

    // Bind parameter và thiết lập giá trị của $keyword
    $keyword = trim($keyword);
    $searchKeyword = "%$keyword%";
    $stmt->bind_param("s", $searchKeyword);

    // Thực thi truy vấn
    if (!$stmt->execute()) {
        // Xử lý lỗi nếu không thể thực thi truy vấn
        die("Error: " . $stmt->error);
    }

    // Lấy kết quả của truy vấn
    $result = $stmt->get_result();

    $data = array();
    // Tạo biến lưu trữ kết quả dưới dạng HTML
    // $html_output = '';

    // Đọc từng dòng dữ liệu từ kết quả truy vấn và tạo HTML tương ứng
    while ($row = $result->fetch_assoc()) {
        $data[] = [
            'id' => $row['id'],
            'title' => $row['title']
        ];
    };
    $return = ['success' => $data];

    // Đóng prepared statement
    $stmt->close();

    // Đóng kết nối cơ sở dữ liệu
    $conn->close();

    // Trả về kết quả dưới dạng HTML
    // return $html_output;
    echo json_encode($return);
}
