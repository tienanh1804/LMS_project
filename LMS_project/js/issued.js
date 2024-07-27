
function filterBooks() {
    var filter = document.querySelector('.filterDropdown').value;

    
    fetch('../php/issued.php?filter=' + filter)
        .then(response => response.json())
        .then(data => {
            
            var tableBody = document.querySelector('#issuedBookTable tbody');
            tableBody.innerHTML = '';

            
            data.forEach(book => {
                var row = document.createElement('tr');
                row.innerHTML = `
                <td>${book.number}</td>
                <td>${book.title}</td>
                <td>${book.borrower_name}</td>
                <td>${book.borrow_date}</td>
                <td>${book.design_return_date}</td>
                <td>${book.status}</td>
                <td>${book.reservation_status}</td>
                <td>
                    ${book.status === 'Issued' || book.status === 'Overdue' ? 
                    <button onclick="returnBook(${book.id})">Returned</button> : ''}
                    ${book.reservation_status_id == 1 ? 
                    <button onclick="acceptReservation(${book.id})">Accept</button> : ''}
                    ${book.reservation_status_id == 1 ? 
                    <button onclick="rejectReservation(${book.id})">Reject</button> : ''}
                </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function returnBook(bookId) {
    fetch('../php/returnBook.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book_id: bookId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Book returned successfully');
            location.reload();
            
        } else {
            console.error('Failed to return book');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    var dropdown = document.querySelector('.filterDropdown');
    dropdown.selectedIndex = 0;
    filterBooks();
});