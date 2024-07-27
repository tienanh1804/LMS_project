<?php
//cần sửa lại
include_once "db_connection.php";

$filter = $_GET['filter'];

// Xây dựng truy vấn dựa trên giá trị của $filter
if ($filter === 'all') {
    $sql = "SELECT ROW_NUMBER() OVER (ORDER BY borrow.borrow_date) AS number,
    borrow.id,
    book_detail.title,
    CONCAT(account_profile.firstname, ' ', account_profile.lastname) AS borrower_name,
    borrow.borrow_date,
    borrow.design_return_date,
    borrow.return_date,
    CASE
        WHEN borrow.return_date IS NOT NULL THEN 'Returned'
        WHEN borrow.design_return_date < NOW() THEN 'Overdue'
        ELSE 'Issued'
    END AS status,
    reservation.reservation_status_id, 
    reservation.reservation_date AS reservation_date,
    reservation_status.value AS reservation_status
    FROM borrow
    INNER JOIN book_detail ON borrow.book_id = book_detail.id
    INNER JOIN account_profile ON borrow.account_id = account_profile.id
    LEFT JOIN reservation ON borrow.book_id = reservation.book_id
    LEFT JOIN reservation_status ON reservation.reservation_status_id = reservation_status.id;";
} elseif ($filter === 'issued') {
    $sql = "SELECT ROW_NUMBER() OVER (ORDER BY borrow.borrow_date) AS number,
    borrow.id,
    book_detail.title,
    CONCAT(account_profile.firstname, ' ', account_profile.lastname) AS borrower_name,
    borrow.borrow_date,
    borrow.design_return_date,
    borrow.return_date,
    CASE
        WHEN borrow.return_date IS NOT NULL THEN 'Returned'
        WHEN borrow.design_return_date < NOW() THEN 'Overdue'
        ELSE 'Issued'
    END AS status,
    reservation.reservation_status_id, 
    reservation.reservation_date AS reservation_date,
    reservation_status.value AS reservation_status
    FROM borrow
    INNER JOIN book_detail ON borrow.book_id = book_detail.id
    INNER JOIN account_profile ON borrow.account_id = account_profile.id
    LEFT JOIN reservation ON borrow.book_id = reservation.book_id
    LEFT JOIN reservation_status ON reservation.reservation_status_id = reservation_status.id
    WHERE borrow.return_date IS NULL
";
} elseif ($filter === 'overdue') {
    $sql = "SELECT ROW_NUMBER() OVER (ORDER BY borrow.borrow_date) AS number,
    borrow.id,
    book_detail.title,
    CONCAT(account_profile.firstname, ' ', account_profile.lastname) AS borrower_name,
    borrow.borrow_date,
    borrow.design_return_date,
    borrow.return_date,
    CASE
        WHEN borrow.return_date IS NOT NULL THEN 'Returned'
        WHEN borrow.design_return_date < NOW() THEN 'Overdue'
        ELSE 'Issued'
    END AS status,
    reservation.reservation_status_id, 
    reservation.reservation_date AS reservation_date,
    reservation_status.value AS reservation_status
    FROM borrow
    INNER JOIN book_detail ON borrow.book_id = book_detail.id
    INNER JOIN account_profile ON borrow.account_id = account_profile.id
    LEFT JOIN reservation ON borrow.book_id = reservation.book_id
    LEFT JOIN reservation_status ON reservation.reservation_status_id = reservation_status.id
    WHERE borrow.design_return_date < NOW() AND borrow.return_date IS NULL";
}

$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);

