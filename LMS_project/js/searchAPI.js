document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.querySelector('.book-search');
    var searchResults = document.querySelector('.book3');
    var searchButton = document.querySelector('.Search-button');
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

    searchButton.addEventListener('click', function () {
        var query = searchInput.value.trim();
        if (query.length > 0) {
            searchBooks(query);
        } else {
            searchResults.innerHTML = '';
        }
    });
    // console.log('tong sach:', totalBooks);
    function searchBooks(query) {
        var url = 'https://www.googleapis.com/books/v1/volumes?q=' + query;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                var booksJSON = [];
                data.items.forEach(book => {
                    var title = book.volumeInfo.title;
                    var authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
                    var thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
                    var description = book.volumeInfo.description ? book.volumeInfo.description : 'No description available';
                    var isbn = book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_10') : '';
                    isbn = isbn ? isbn.identifier : 'N/A';

                    var bookJSON = {
                        // id: id,
                        title: title,
                        authors: authors,
                        thumbnail: thumbnail,
                        description: description,
                        isbn: isbn
                    };

                    booksJSON.push(bookJSON);
                });
                console.log(booksJSON); // In ra dữ liệu JSON vào console để kiểm tra
                displayResults(data.items);
            })
            .catch(error => console.error('Error:', error));
    }

    function getValidId(str) {
        // Loại bỏ các ký tự không hợp lệ từ id
        return str.replace(/[^a-zA-Z0-9-_]/g, '_');
    }

    function displayResults(books) {
        searchResults.innerHTML = '';

        books.forEach(book => {
            var id = book.id;
            var title = book.volumeInfo.title;
            var authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
            var thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
            var description = book.volumeInfo.description ? book.volumeInfo.description : 'No description available';
            var isbn = book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13') : '';
            isbn = isbn ? isbn.identifier : 'N/A';

            var bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <div class="book-left">
                    <img class="book-cover" src="${thumbnail}" alt="Book Cover" width="120px" height="160px">
                    <button data-id="${id}" class="add-book-button">
                        Add book
                    </button>
                </div>
                <div class="book-right">
                    <div class="book-name">${title}</div>
                    <div class="book-author">${authors}</div>
                    <div class="book-isbn">ISBN: ${isbn}</div>
                    <div class="book-description">${description}</div>
                </div>
            `;
            searchResults.appendChild(bookElement);

            var addButton = bookElement.querySelector(`[data-id="${id}"]`);
            addButton.addEventListener('click', function () {

                var genreDivs = document.querySelectorAll('.tooltip');
                // Khai báo một mảng để lưu trữ các genre_id
                var genreIds = [];

                genreDivs.forEach(function (genreDiv) {
                    // Lấy genre_id từ id của mỗi thẻ div
                    var genreId = genreDiv.id;
                    genreIds.push(genreId);
                });

                // console.log(genreIds);

                // Thực hiện hành động khi người dùng nhấp vào nút "Add book"
                // Ví dụ: Hiển thị thông báo hoặc thêm sách vào danh sách sách đã thêm
                var bookId = Number(totalBooks) + 1;
                var title = book.volumeInfo.title;
                var authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
                var thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
                var description = book.volumeInfo.description ? book.volumeInfo.description : 'No description available';
                var isbn = book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13') : '';
                isbn = isbn ? isbn.identifier : 'N/A';
                // var genreId = selectedGenreId; // Lấy genre_id đã chọn từ biến nào đó

                // Tạo đối tượng chứa thông tin sách và genre_id
                var bookData = {
                    bookId: bookId,
                    title: title,
                    authors: authors,
                    thumbnail: thumbnail,
                    description: description,
                    isbn: isbn,
                    genreId: genreIds
                };

                //Gửi dữ liệu lên máy chủ
                fetch('../php/add_book.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookData)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            console.log(data.error);
                        } else {
                            location.reload();
                        }
                    })
                    .catch(error => console.error('Error:', error));

                console.log('book', bookData);
                console.log('totalBooks', totalBooks);
            });
        });
    }
});