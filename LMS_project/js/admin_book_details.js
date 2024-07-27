import { renderComments, renderBookDetailAdmin } from "./render.js";

let comment_data = [];
let book_detail_data = [];

const comment_section = document.querySelector(".error_message");

document.addEventListener("DOMContentLoaded", function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const book_id = urlParams.get('id');
    console.log(book_id);

    getBookData(book_id);

    getCommentData(book_id)
})

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
            renderBookDetailAdmin("top", book_detail_data);
        })
        .catch(error => {
            console.log(error.message);
        });

}