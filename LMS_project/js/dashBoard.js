document.addEventListener("DOMContentLoaded", function() {
    fetch("../php/dashBoard.php")
    .then(response => response.json())
    .then(data => {
        document.querySelector('.book-number .number').textContent = data.total_books;
        document.querySelector('.genre-number .number').textContent = data.total_genres;
        document.querySelector('.issued-number .number').textContent = data.total_issued;
        document.querySelector('.overdue-number .number').textContent = data.total_overdue;

        displayDues(data.today_dues, "Today-dues");
        displayDues(data.tomorrow_dues, "Tomorrow-dues");
    })
    .catch(error => console.error("Error:", error));


    function displayDues(dues, tableId) {
        const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ""; // Xóa dữ liệu cũ trong bảng
        dues.forEach(due => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${due.number}</td>
                <td>${due.book_title}</td>
                <td>${due.borrower}</td>
                <td>${due.borrow_date}</td>
                <td>${due.contact}</td>
            `;
        });
    }
});
