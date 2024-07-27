import { renderComments, renderBookDetail } from "./render.js";
import { triggerNotification } from "./notification.js";

let comment_data = [];
let book_detail_data = [];

const comment_section = document.querySelector(".error_message");

document.addEventListener("DOMContentLoaded", function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const book_id = urlParams.get('id');
    console.log(book_id);

    getBookData(book_id);

    const Form = document.querySelector(".comment-container");

    Form.addEventListener("submit", function (event) {
        event.preventDefault();
        addComments(Form, book_id);
    });

    getCommentData(book_id)
})

function addComments(Form, book_id) {
    const addData = new FormData(Form);
    let url = "../php/add_comment.php?book_id=" + book_id;

    fetch(url, {
        method: "POST",
        body: addData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                comment_section.style.display = 'grid';
                comment_section.textContent = data.success;
                location.reload();
            }
            else if (data.error) {
                comment_section.style.display = 'grid';
                comment_section.textContent = data.error;
                console.log(data.error)
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

//add to wishlist
function addToWishList(book_id) {
    let url = "../php/add_wishlist.php?book_id=" + book_id;

    fetch(url, {
        method: "POST",
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                triggerNotification("Thành công!", data.success, "success", 1000);
            } else {
                triggerNotification("Thất bại!", data.error, "error", 1000);
            }
        })
        .catch(error => {
            // console.error("Error:", error);
            triggerNotification("Thành công!", "Book remove from wishlist!", "success", 1000);
        });
}

function addToReservation(book_id) {
    let url = "../php/add_reservation.php?book_id=" + book_id;

    fetch(url, {
        method: "POST",
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // console.log(data.error);
                triggerNotification("Thất bại!", data.error, "error", 1000);
            } else {
                triggerNotification("Thất bại!", data.success, "success", 1000);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

//finished
function getCommentData(book_id) {
    let url = "../php/get_comment.php?book_id=" + book_id;
    fetch(url, {
        method: "POST",
    })
        .then(response => response.json())
        .then(data => {
            comment_data = data.success;
            console.log(comment_data);
            console.log(data.success.length);
            if (data.success.length > 0) {
                renderComments("comments", comment_data);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

async function getBookData(book_id) {
    let url = "../php/get_book_detail.php?book_id=" + book_id;
    fetch(url, {
        method: "POST",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            book_detail_data = data.success;
            renderBookDetail("top", book_detail_data);

            const reservation = document.querySelector(".borrow-button");
            const wishlist = document.querySelector(".bookmark-button");

            reservation.addEventListener("click", function (event) {
                event.preventDefault();
                addToReservation(book_id);
            });

            wishlist.addEventListener("click", function (event) {
                // console.log("click on wishlist");
                event.preventDefault();
                addToWishList(book_id);
            });
        })
        .catch(error => {
            console.log("there was an error.");
        });

}