import { renderLibAll } from "./render.js";

document.addEventListener("DOMContentLoaded", function () {
    let bookData = [];
    fetch('../php/get_borrowed_book.php', {
        method: 'POST',
    })
        .then(response => response.json()) // Chuyển đổi phản hồi thành dạng văn bản
        .then(data => {
            if (data.error) {

            } else {
                // Hiển thị kết quả trong phần tử có ID là "search-results"
                console.log(data);
                // errorline.style.display = 'none';
                bookData = data.success;
                console.log(bookData);
                renderLibAll("borrowed-book", bookData);
            }
            // document.getElementById('search-results').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // renderLibAll("borrowed-book", bookData);
});
