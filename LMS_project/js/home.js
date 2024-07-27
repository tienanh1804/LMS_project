import { renderLib } from './render.js';

document.addEventListener("DOMContentLoaded", function () {
    let bookData1 = [];
    fetch('../php/get_popular.php', {
        method: 'POST',
    })
        .then(response => response.json()) // Chuyển đổi phản hồi thành dạng văn bản
        .then(data => {
            if (data.error) {

            } else {
                // Hiển thị kết quả trong phần tử có ID là "search-results"
                console.log(data);
                // errorline.style.display = 'none';
                bookData1 = data.success;
                console.log(bookData1);
                renderLib("popular_book", bookData1);
            }
            // document.getElementById('search-results').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    let bookData2 = [];
    fetch('../php/get_suggestion.php', {
        method: 'POST',
    })
        .then(response => response.json()) // Chuyển đổi phản hồi thành dạng văn bản
        .then(data => {
            if (data.error) {

            } else {
                // Hiển thị kết quả trong phần tử có ID là "search-results"
                console.log(data);
                // errorline.style.display = 'none';
                bookData2 = data.success;
                console.log(bookData2);
                renderLib("suggest_book", bookData2);
            }
            // document.getElementById('search-results').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
