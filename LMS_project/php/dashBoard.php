<?php
include_once "db_connection.php";

// Truy vấn số lượng sách
$sql_books = "SELECT COUNT(*) as total_books FROM book";
$result_books = $conn->query($sql_books);
$total_books = $result_books->fetch_assoc()['total_books'];

// Truy vấn số lượng thể loại
$sql_genres = "SELECT COUNT(*) as total_genres FROM genre";
$result_genres = $conn->query($sql_genres);
$total_genres = $result_genres->fetch_assoc()['total_genres'];

// Truy vấn số lượng sách đã được mượn
$sql_issued = "SELECT COUNT(*) as total_issued FROM borrow";
$result_issued = $conn->query($sql_issued);
$total_issued = $result_issued->fetch_assoc()['total_issued'];

// Truy vấn số lượng sách quá hạn
$sql_overdue = "SELECT COUNT(*) as total_overdue FROM borrow 
                WHERE design_return_date < CURDATE() 
                and return_date is NULL;";
$result_overdue = $conn->query($sql_overdue);
$total_overdue = $result_overdue->fetch_assoc()['total_overdue'];


// Lấy danh sách today dues
$sql_today = "SELECT  ROW_NUMBER() OVER (ORDER BY borrow_date) AS number,
bd.title AS book_title, 
CONCAT(ap.firstname, ' ', ap.lastname) AS borrower, 
ap.gmail AS contact,borrow_date
FROM borrow b
JOIN book_detail bd ON b.book_id = bd.id
JOIN account_profile ap ON b.account_id = ap.id
WHERE DATE(b.design_return_date) = CURDATE() AND b.return_date IS NULL";
$result_today = mysqli_query($conn, $sql_today);
$today_dues = mysqli_fetch_all($result_today, MYSQLI_ASSOC);

// Lấy danh sách tomorrow dues
$sql_tomorrow = "SELECT  ROW_NUMBER() OVER (ORDER BY borrow_date) AS number,
bd.title AS book_title, 
CONCAT(ap.firstname, ' ', ap.lastname) AS borrower, 
ap.gmail AS contact,borrow_date
FROM borrow b
JOIN book_detail bd ON b.book_id = bd.id
JOIN account_profile ap ON b.account_id = ap.id
WHERE DATE(b.design_return_date) = CURDATE() + INTERVAL 1 DAY AND b.return_date IS NULL";
$result_tomorrow = mysqli_query($conn, $sql_tomorrow);
$tomorrow_dues = mysqli_fetch_all($result_tomorrow, MYSQLI_ASSOC);



// lấy danh sách các cuốn sách được mượn nhiều nhất
$sql_chart = "SELECT book_detail.title AS book_title, COUNT(borrow.book_id) AS borrow_count
                FROM borrow
                INNER JOIN book_detail ON borrow.book_id = book_detail.id
                GROUP BY borrow.book_id
                ORDER BY borrow_count DESC
                limit 10;";

$result_chart = mysqli_query($conn, $sql_chart);
$chart = mysqli_fetch_all($result_chart, MYSQLI_ASSOC);


// Gửi dữ liệu dưới dạng JSON
$data = array(
    'total_books' => $total_books,
    'total_genres' => $total_genres,
    'total_issued' => $total_issued,
    'total_overdue' => $total_overdue,
    "today_dues" => $today_dues,
    "tomorrow_dues" => $tomorrow_dues,
    "chart" => $chart
);
echo json_encode($data);
?>
