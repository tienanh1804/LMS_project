document.addEventListener("DOMContentLoaded", function () {
    const editSubmitButton = document.getElementById("edit-submit");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const book_id = urlParams.get('id');
    // console.log(book_id);

    const newTitle = document.getElementById("newTitle");
    const newAuthor = document.getElementById("newAuthor");
    const newInstock = document.getElementById("newInstock");
    const newISBN = document.getElementById("newISBN");
    const newDescription = document.getElementById("newDescription");

    let url = "../php/get_edit_book.php?book_id=" + book_id;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                newTitle.value = data.success['title'];
                newAuthor.value = data.success['authors'];
                newInstock.value = data.success['instock'];
                newDescription.value = data.success['description'];
                newISBN.value = data.success['ISBN'];
            }
        })
        .catch(err => {
            console.error(err);
        });

    function areAllFieldsEmpty() {
        return !newTitle.value.trim() && !newAuthor.value.trim() && !newInstock.value.trim() && !newISBN.value.trim() && !newDescription.value.trim();
    }

    function toggleSubmitButton() {
        if (areAllFieldsEmpty()) {
            editSubmitButton.disabled = true;
        } else {
            editSubmitButton.disabled = false;
        }
    }

    toggleSubmitButton();

    const inputFields = document.querySelectorAll(".edit_container input, .edit_container textarea");
    inputFields.forEach(function (inputField) {
        inputField.addEventListener("input", toggleSubmitButton);
    });

    editSubmitButton.addEventListener("click", function () {
        const newTitle = document.getElementById("newTitle").value.trim();
        const newAuthorString = document.getElementById("newAuthor").value.trim();
        const newAuthors = newAuthorString.split(';').map(author => author.trim());
        const newInstock = document.getElementById("newInstock").value;
        const newISBN = document.getElementById("newISBN").value.trim();
        const newDescription = document.getElementById("newDescription").value.trim();

        // console.log(newTitle, newAuthors, newISBN, newDescription, newInstock);

        var editData = new FormData();
        editData.append('newTitle', newTitle);
        for (var i = 0; i < newAuthors.length; i++) {
            editData.append('newAuthors[]', newAuthors[i]);
        }
        editData.append('newInstock', parseInt(newInstock));
        editData.append('newISBN', newISBN);
        editData.append('newDescription', newDescription);

        // console.log(book_id);

        let url = "../php/edit_book.php?book_id=" + book_id;
        fetch(url, {
            method: "POST",
            body: editData
        })
            .then(Response => Response.json())
            .then(data => {
                if (data.success) {
                    console.log(data.success);
                }
                else {
                    console.log(data.error);
                }
            })
            .catch(err => {
                console.log(err);
            })
    });

    let moveButton = document.querySelector(".move-button2");
    moveButton.addEventListener("click", () => {
        // Select all elements with class "tooltip"
        const tooltipElements = document.querySelectorAll('.tooltip');

        // Initialize an array to store the IDs
        const tooltipIDs = [];

        // Loop through each tooltip element and extract its ID
        tooltipElements.forEach(element => {
            tooltipIDs.push(element.id);
        });

        // console.log(tooltipIDs);

        if (tooltipIDs.length > 0) {
            const data = JSON.stringify({ tooltipIDs: tooltipIDs });
            let url = "../php/edit_book_genre.php?book_id=" + book_id;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // console.log(data.success);
                        location.reload();
                    }
                    else {
                        console.log(data.error);
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    });

    let deleteButton = document.querySelector('#delete-button');
    deleteButton.addEventListener('click', () => {
        let url = "../php/delete_book.php?book_id=" + book_id;
        fetch(url, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data.success);
                    // location.reload();
                }
                else {
                    console.log(data.error);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });
});
