import { renderLibAllforAdmin } from "./render.js";
document.addEventListener('DOMContentLoaded', function (event) {
    let bookData = [];

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchData = urlParams.get('data');

    const databox = document.getElementById('search-results');
    const errorline = document.getElementById('error_message');

    console.log(searchData);

    event.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt

    const formData = new FormData();
    formData.append('searchData', searchData);

    fetch('../php/search.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json()) // Chuyển đổi phản hồi thành dạng văn bản
        .then(data => {
            if (data.error) {
                databox.style.display = 'none';
                errorline.textContent = data.error;
            } else {
                // Hiển thị kết quả trong phần tử có ID là "search-results"
                console.log(data);
                errorline.style.display = 'none';
                bookData = data;
                console.log(bookData);
                renderLibAllforAdmin("search-results", bookData);
            }
            // document.getElementById('search-results').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // document.addEventListener('DOMContentLoaded', function (event) {
    // });
});

