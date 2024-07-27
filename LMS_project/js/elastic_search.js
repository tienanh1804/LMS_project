// document.addEventListener("DOMContentLoaded", function() {
//     var searchResults = document.querySelector('#search-results');
//     var searchInput = document.querySelector('#searchForm');

//     searchInput.addEventListener('submit', function () {
//         var query = searchInput.value.trim();
//         if (query.length > 0) {
//             searchBooks(query);
//         } else {
//             searchResults.innerHTML = '';
//         }
//     });

// function searchBooks(query) {
//     var url = 'Zmk4YVRZOEJTQTNRdmVHNW9QUWg6eTdaRXloWmxTTG1pdzI0NFVORkpzZw==' + query;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             var booksJSON = [];
//             data.hits.forEach(book => {
//                 var id = book._source.id;
//                 var title = book._source.title;
//                 var authors = book._source.author ? book._source.author.join(', ') : 'Unknown Author';
//                 var thumbnail = book._source.image ? book._source.image : '';
//                 var description = book._source.description ? book._source.description : 'No description available';
//                 var isbn = book._source.ibsn ? book._source.ibsn : 'N/A';
        

//                 var bookJSON = {
//                     id: id,
//                     title: title,
//                     authors: authors,
//                     thumbnail: thumbnail,
//                     description: description,
//                     isbn: isbn
//                 };

//                 booksJSON.push(bookJSON);
//             });
//             console.log(booksJSON); // In ra dữ liệu JSON vào console để kiểm tra
//             var encodedQuery = encodeURIComponent(query);
//             window.location.href = "../html/FilteredBooks.html?data=" + encodedQuery;
//             displayResults(data.items);
//         })
//         .catch(error => console.error('Error:', error));
// }

// function getValidId(str) {
//     // Loại bỏ các ký tự không hợp lệ từ id
//     return str.replace(/[^a-zA-Z0-9-_]/g, '_');
// }

// function displayResults(books) {
//     searchResults.innerHTML = '';

//     books.forEach(book => {
//         var id = book._source.id;
//         var title = book._source.title;
//         var authors = book._source.author ? book._source.author.join(', ') : 'Unknown Author';
//         var thumbnail = book._source.image ? book._source.image : '';
//         var description = book._source.description ? book._source.description : 'No description available';
//         var isbn = book._source.ibsn ? book._source.ibsn : 'N/A';

//         var bookElement = document.createElement('div');
//         bookElement.classList.add('book');
//         bookElement.innerHTML = `
//             <div class="book-left">
//                 <img class="book-cover" src="${thumbnail}" alt="Book Cover" width="120px" height="160px">
//             </div>
//             <div class="book-right">
//                 <div class="book-name">${title}</div>
//                 <div class="book-author">${authors}</div>
//                 <div class="book-isbn">ISBN: ${isbn}</div>
//                 <div class="book-description">${description}</div>
//             </div>
//         `;
//         searchResults.appendChild(bookElement);
//     });
// }
// });