document.addEventListener("DOMContentLoaded", function() {
    const filterForm = document.getElementById('searchForm');
    filterForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const formData = new FormData(filterForm);
        const searchValue = formData.get('search').trim().replace(/\s+/g, ' ');

        console.log(searchValue);

        const url = "../html/adminFilteredBooks.html?data=" + encodeURI(searchValue);
        console.log(url);
        window.location.href = url;
    });
});