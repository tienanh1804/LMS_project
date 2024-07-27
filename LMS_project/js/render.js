function renderBook(bookData) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const img = document.createElement("img");
    img.classList.add("book_cover");
    img.src = bookData.imageSrc;
    img.width = "120";
    img.height = "160";
    img.loading = "lazy";
    img.alt = bookData.id

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.title = bookData.name;
    nameDiv.textContent = bookData.name;

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.textContent = bookData.author;

    bookDiv.addEventListener("click", function () {
        window.location.href = `bookDetail.html?id=${bookData.id}`;
    });

    bookDiv.appendChild(img);
    bookDiv.appendChild(nameDiv);
    bookDiv.appendChild(authorDiv);

    return bookDiv;
}

function renderBookAdmin(bookData) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const img = document.createElement("img");
    img.classList.add("book_cover");
    img.src = bookData.imageSrc;
    img.width = "120";
    img.height = "160";
    img.loading = "lazy";
    img.alt = bookData.id

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name");
    nameDiv.title = bookData.name;
    nameDiv.textContent = bookData.name;

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.textContent = bookData.author;
    authorDiv.style.overflowX = "hidden";

    bookDiv.addEventListener("click", function () {
        window.location.href = `adminBookDetail.html?id=${bookData.id}`;
    });

    bookDiv.appendChild(img);
    bookDiv.appendChild(nameDiv);
    bookDiv.appendChild(authorDiv);

    return bookDiv;
}
function renderComment(comment_data) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment-section");

    const avatar = document.createElement('div');
    avatar.classList.add("cmt-ava");

    const info = document.createElement('div');
    info.classList.add("info");

    const cmt_name = document.createElement('div');
    cmt_name.classList.add("cmt-name");
    cmt_name.textContent = comment_data.username;

    const cmt = document.createElement("div");
    cmt.classList.add("comment");
    cmt.textContent = comment_data.comment;

    info.appendChild(cmt_name);
    info.appendChild(cmt);
    commentDiv.appendChild(avatar);
    commentDiv.appendChild(info);

    return commentDiv;
}

export function renderLib(divID, bookData) {
    let minlen = Math.min(bookData.length, 5);
    for (let i = 0; i < minlen; i++) {
        let bookElement = renderBook(bookData[i]);
        document.getElementById(divID).appendChild(bookElement);
    }
}

export function renderLibAll(divID, bookData) {
    for (let i = 0; i < bookData.length; i++) {
        let bookElement = renderBook(bookData[i]);
        document.getElementById(divID).appendChild(bookElement);
    }
}

export function renderLibAllforAdmin(divID, bookData) {
    for (let i = 0; i < bookData.length; i++) {
        let bookElement = renderBookAdmin(bookData[i]);
        document.getElementById(divID).appendChild(bookElement);
    }
}

export function renderComments(divID, commentData) {
    for (let i = 0; i < commentData.length; i++) {
        let commentElement = renderComment(commentData[i]);
        document.getElementById(divID).appendChild(commentElement);
    }
    document.getElementById(divID).appendChild(commentElement);
}

export function renderBookDetail(divID, bookDataDetail) {
    if (bookDataDetail.length === 0) {
        bookDataDetail.push(getEmptyBookDetail());
    }
    const topDiv = document.getElementsByClassName(divID)[0]; // Access the first element in the HTMLCollection

    const borrowButton = document.createElement("button");
    borrowButton.classList.add("borrow-button");
    borrowButton.textContent = " + ";

    const bookmarkButton = document.createElement("button");
    bookmarkButton.classList.add("bookmark-button");
    const bookmarkIcon = document.createElement("img");
    bookmarkIcon.src = "../img/icons8-bookmark-96.png";
    bookmarkIcon.style.width = "30px";
    bookmarkIcon.style.height = "30px";
    bookmarkButton.appendChild(bookmarkIcon);

    const coverImg = document.createElement("img");
    coverImg.classList.add("book_cover");
    coverImg.src = bookDataDetail[0].imageSrc;
    coverImg.alt = "Book Cover";

    const rightColumnDiv = document.createElement("div");
    rightColumnDiv.classList.add("right-column");

    const genreDiv = document.createElement("div");
    genreDiv.classList.add("genre");

    const genreIcon = document.createElement("img");
    genreIcon.src = "../img/icons8-book-96.png";
    genreIcon.style.width = "25px";
    genreIcon.style.height = "25px";

    const genreText = document.createElement("p");
    genreText.classList.add("genre-text");
    genreText.textContent = bookDataDetail[0].genreText;

    genreDiv.appendChild(genreIcon);
    genreDiv.appendChild(genreText);

    const bookName = document.createElement("p");
    bookName.classList.add("book-name");
    bookName.textContent = bookDataDetail[0].bookName;

    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = bookDataDetail[0].author;

    const isbnDiv = document.createElement("p");
    isbnDiv.classList.add("isbn");
    isbnDiv.textContent = "Release year: " + bookDataDetail[0].releaseYear;

    const instock = document.createElement("p");
    instock.textContent = " Instock: " + bookDataDetail[0].instockCount;

    const description = document.createElement("p");
    description.classList.add("description", "no-text-cursor");
    description.textContent = bookDataDetail[0].description;

    rightColumnDiv.appendChild(genreDiv);
    rightColumnDiv.appendChild(bookName);
    rightColumnDiv.appendChild(author);
    rightColumnDiv.appendChild(isbnDiv);
    // isbnDiv.appendChild(isbnNumber);
    rightColumnDiv.appendChild(instock);
    // instock.appendChild(instockNumber);
    rightColumnDiv.appendChild(description);

    topDiv.appendChild(borrowButton);
    topDiv.appendChild(bookmarkButton);
    topDiv.appendChild(coverImg);
    topDiv.appendChild(rightColumnDiv);

    // return topDiv;
}

export function renderBookDetailAdmin(divID, bookDataDetail) {
    if (bookDataDetail.length === 0) {
        bookDataDetail.push(getEmptyBookDetail());
    }

    const topDiv = document.getElementsByClassName(divID)[0]; // Access the first element in the HTMLCollection

    const coverImg = document.createElement("img");
    coverImg.classList.add("book_cover");
    coverImg.src = bookDataDetail[0].imageSrc;
    coverImg.alt = "Book Cover";

    const rightColumnDiv = document.createElement("div");
    rightColumnDiv.classList.add("right-column");

    const genreDiv = document.createElement("div");
    genreDiv.classList.add("genre");

    const genreIcon = document.createElement("img");
    genreIcon.src = "../img/icons8-book-96.png";
    genreIcon.style.width = "25px";
    genreIcon.style.height = "25px";

    const genreText = document.createElement("p");
    genreText.classList.add("genre-text");
    genreText.textContent = bookDataDetail[0].genreText;

    genreDiv.appendChild(genreIcon);
    genreDiv.appendChild(genreText);

    const bookName = document.createElement("p");
    bookName.classList.add("book-name");
    bookName.textContent = bookDataDetail[0].bookName;

    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = bookDataDetail[0].author;

    const isbnDiv = document.createElement("p");
    isbnDiv.classList.add("isbn");
    isbnDiv.textContent = "Release year: " + bookDataDetail[0].releaseYear;

    const instock = document.createElement("p");
    instock.textContent = " Instock: " + bookDataDetail[0].instockCount;

    const description = document.createElement("p");
    description.classList.add("description", "no-text-cursor");
    description.textContent = bookDataDetail[0].description;

    // Add edit button
    const editButton = createButton("edit-button", goToEdit, "../img/edit-button.png", "Edit");

    // Add details button
    const detailsButton = createButton("details-button", goToDetails, "../img/details-button.png", "Details");

    // Add move button
    const moveButton = createButton("move-button", goToMove, "../img/move-button.png", "Move");

    // Add delete button
    const deleteButton = createButton("delete-button", goToDelete, "../img/delete-button.png", "Delete");

    const actionBar = document.createElement("div");
    actionBar.classList.add("choose_action_bar");

    rightColumnDiv.appendChild(genreDiv);
    rightColumnDiv.appendChild(bookName);
    rightColumnDiv.appendChild(author);
    rightColumnDiv.appendChild(isbnDiv);
    rightColumnDiv.appendChild(instock);
    rightColumnDiv.appendChild(description);
    actionBar.appendChild(editButton);
    actionBar.appendChild(detailsButton);
    actionBar.appendChild(moveButton);
    actionBar.appendChild(deleteButton);

    topDiv.appendChild(actionBar);
    topDiv.appendChild(coverImg);
    topDiv.appendChild(rightColumnDiv);
}

function createButton(className, onClick, imgSrc, buttonText) {
    const button = document.createElement("button");
    button.classList.add(className);

    const img = document.createElement("img");
    img.src = imgSrc;
    img.width = "20";
    img.height = "20";

    button.appendChild(img);

    const textNode = document.createTextNode(buttonText);
    button.appendChild(textNode);

    button.addEventListener("click", onClick);

    return button;
}

function getEmptyBookDetail() {
    return {
        imageSrc: "../img/this-image-has-been-removed.png",
        genreText: "N/A",
        bookName: "N/A",
        author: "N/A",
        releaseYear: "N/A",
        instockCount: "N/A",
        description: "N/A"
    };
}
