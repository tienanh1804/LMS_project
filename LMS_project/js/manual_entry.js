document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.querySelector('.submit');
    var totalBooks = 0;

    fetch('../php/get_total_books.php')
        .then(response => response.json())
        .then(data => {
            totalBooks = data.totalBooks;
            console.log('Total number of books:', totalBooks);
            console.log('tong sach', Number(totalBooks) + 1);
            console.log();

            // Tiếp tục thực hiện các hành động khác ở đây sau khi lấy được tổng số cuốn sách
        })
        .catch(error => console.error('Error:', error));

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        var genreDivs = document.querySelectorAll('.tooltip');
                // Khai báo một mảng để lưu trữ các genre_id
                var genreIds = [];

                genreDivs.forEach(function (genreDiv) {
                    // Lấy genre_id từ id của mỗi thẻ div
                    var genreId = genreDiv.id;
                    genreIds.push(genreId);
                });

        // Lấy dữ liệu từ các trường input
        const id = Number(totalBooks) + 1;
        const title = document.querySelector('input[name="title"]').value;
        const author = document.querySelector('input[name="author"]').value;
        const isbn = document.querySelector('input[name="isbn"]').value;
        const description = document.querySelector('textarea[name="description"]').value;
        const image = document.querySelector('input[name="image"]').value;

        // Gửi dữ liệu đến máy chủ bằng AJAX hoặc Fetch API
        fetch('../php/manual_entry.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                title: title,
                author: author,
                isbn: isbn,
                description: description,
                image: image,
                genreId: genreIds
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // In ra kết quả từ máy chủ (có thể thay đổi)
            // Xử lý kết quả nếu cần
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
