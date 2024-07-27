<?php
include_once "db_connection.php";
include_once "get_user.php";

if ($_SESSION['user_role'] != 0) {
    echo json_encode(array("error" => "You don't have permission to access this page."));
    exit();
}

$dataLog = "";

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        if (!isset($_GET['book_id'])) {
            echo json_encode(array("error" => $dataLog .= "Book ID is missing.\n"));
            exit();
        } else {
            $dataLog .= "Book ID is ok\n";
            $book_id = $_GET['book_id'];
        }

        if (!empty($_POST['newInstock'])) {
            $in_stock = $_POST['newInstock'];
            $query = "UPDATE book SET owned = ? WHERE id = ?";

            $stmt = $conn->prepare($query);

            $stmt->bind_param("ii", $in_stock, $book_id);

            $stmt->execute();

            if ($stmt->affected_rows == 0) {
                echo json_encode(array("error" => "Failed to update stock.\n"));
                exit();
            } else {
                $dataLog .= "update stock is ok.\n";
            }
            $stmt->close();
        }

        if (!empty($_POST['newAuthors'])) {
            // Get the book ID from GET request
            $book_id = $_GET['book_id'];

            // Check if newAuthors is not null
            if ($_POST['newAuthors'] !== '') {
                // Delete existing entries in book_author table for the given book_id
                $delete_query = "DELETE FROM book_author WHERE book_id = ?";
                $stmt_delete = $conn->prepare($delete_query);
                $stmt_delete->bind_param("i", $book_id);
                if (!$stmt_delete->execute()) {
                    echo json_encode(array('error' => $dataLog .= 'problem arise when delete previous data.\n'));
                    exit();
                } else {
                    $dataLog .= "delete is ok.\n";
                }
                $stmt_delete->close();

                if (isset($_POST['newAuthors'])) {
                    $authors_array = $_POST['newAuthors'];
                }

                foreach ($authors_array as $author_name) {
                    // Trim whitespace from author name
                    $author_name = trim($author_name);

                    // Check if author exists in the author table
                    $author_query = "SELECT id FROM author WHERE `name` = ? LIMIT 1";
                    $stmt_author = $conn->prepare($author_query);
                    $stmt_author->bind_param("s", $author_name);
                    $stmt_author->execute();
                    $stmt_author->store_result();

                    if ($stmt_author->num_rows > 0) {
                        // Author exists, fetch author_id
                        $dataLog .= "there is an author we known.\n";
                        $stmt_author->bind_result($author_id);
                        $stmt_author->fetch();
                        $stmt_author->close();

                        $insert_book_author_query = "INSERT INTO book_author (book_id, author_id) VALUES (?, ?)";
                        $stmt_book_author = $conn->prepare($insert_book_author_query);
                        $stmt_book_author->bind_param("ii", $book_id, $author_id);
                        if (!$stmt_book_author->execute()) {
                            echo json_encode(array('error' => $dataLog .= 'problem arise when insert book_author'));
                            exit();
                        } else {
                            $dataLog .= "insert book_author ok.\n";
                        }
                        $stmt_book_author->close();
                    } else if ($stmt_author->num_rows == 0) {
                        // Author does not exist, insert into author table
                        $insert_query = "INSERT INTO author (id, `name`, `description`) VALUES ((select max(id) + 1 from author au), ?, 'NULL')";
                        $stmt_insert = $conn->prepare($insert_query);
                        $stmt_insert->bind_param("s", $author_name);
                        if (!$stmt_insert->execute()) {
                            echo json_encode(array('error' => $dataLog .= 'problem arise when insert new author'));
                            exit();
                        } else {
                            $dataLog .= "insert new author ok.\n";
                        }
                        $stmt_insert->close();

                        $insert_book_author_query = "INSERT INTO book_author (book_id, author_id) VALUES (?, (select max(id) from author au))";
                        $stmt_book_author = $conn->prepare($insert_book_author_query);
                        $stmt_book_author->bind_param("i", $book_id);
                        if (!$stmt_book_author->execute()) {
                            echo json_encode(array('error' => $dataLog .= 'problem arise when insert book_author'));
                            exit();
                        } else {
                            $dataLog .= "insert book_author ok.\n";
                        }
                        $stmt_book_author->close();
                    }
                }
            }
        }


        $sql = "UPDATE book_detail SET ";
        $bind = ""; // Initialize the parameter binding string
        $params = array(); // Initialize the array to store parameter values
        $updates = array();

        // Check each POST parameter and add it to the SQL statement and binding string
        if (!empty(trim($_POST['newTitle']))) {
            $updates[] = "title = ?";
            $bind .= "s";
            $params[] = $_POST['newTitle'];
        }
        if (!empty(trim($_POST['newISBN']))) {
            $updates[] = "isbn = ?";
            $bind .= "s";
            $params[] = $_POST['newISBN'];
        }
        if (!empty(trim($_POST['newDescription']))) {
            $updates[] = "description = ?";
            $bind .= "s";
            $params[] = $_POST['newDescription'];
        }

        if (!empty($updates)) {
            $sql = "UPDATE book_detail SET " . implode(', ', $updates) . " WHERE id = ?";

            $stmt = $conn->prepare($sql);
            $bind .= "i"; // Concatenate the type specifier for integer parameter
            $params[] = $book_id;

            // Dynamically bind parameters based on the types
            $stmt->bind_param($bind, ...$params); // Using the splat operator to pass array elements as arguments
            if (!$stmt->execute()) {
                echo json_encode(array('error' => $dataLog .= 'Problem arose when updating book'));
                exit();
            } else {
                $dataLog .= 'updating book ok.\n';
            }
        }

        echo json_encode(array("success" => "Book updated successfully."));
    } else {
        echo json_encode(array("error" => "Invalid request method."));
    }
} catch (\Exception $e) {
    echo json_encode(array("error" => $dataLog));
}
