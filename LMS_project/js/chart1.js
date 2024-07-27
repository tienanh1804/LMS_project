document.addEventListener("DOMContentLoaded", function() {
    
    fetch("../php/dashBoard.php")
        .then(response => response.json())
        .then(data => {
            displayMostBorrowedBooks(data.chart);
        })
        .catch(error => {
            console.error("Error:", error);
        });

    function displayMostBorrowedBooks(mostBorrowedBooks) {
        
        const bookTitles = mostBorrowedBooks.map(book => book.book_title);
        const borrowCounts = mostBorrowedBooks.map(book => book.borrow_count);

        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bookTitles,
                datasets: [{
                    label: '# of Borrows',
                    data: borrowCounts,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Borrows',// Tiêu đề trục y
                    },
                    stepSize: 1
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Book Title'
                        // Tiêu đề trục x
                    }
                  }
                }
            }
        });
    }
});
