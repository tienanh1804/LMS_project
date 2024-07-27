document.addEventListener("DOMContentLoaded", (event) => {
    let modifyButton = document.querySelector("#modify_button");
    modifyButton.addEventListener("click", () => {
        let genre = parseInt(document.querySelector(".tooltip").id);
        let newTitle = document.querySelector("#new-title-1").value.trim();
        let newDescription = document.querySelector("#new-title-description-1").value.trim();

        if (genre && newTitle) {
            modifyButton.disabled = false;
            let genreData = new FormData();
            genreData.append('genre', genre);
            genreData.append('newTitle', newTitle);
            genreData.append('newDescription', newDescription);

            fetch('../php/change_genre.php', {
                method: "POST",
                body: genreData
            })
                .then(Response => Response.json())
                .then(data => {
                    if (data.success) {
                        console.log(data);
                        location.reload();
                    }
                    else if (data.error) {
                        console.log(data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            modifyButton.disabled = true;
            console.log("Either genre ID or new title is empty.");
        }
    });


    let addButton = document.querySelector("#add_button");
    addButton.addEventListener("click", () => {
        let newTitle = document.querySelector("#new-title-2").value.trim();
        let newDescription = document.querySelector("#new-title-description-2").value.trim();

        if (newTitle && newDescription) {
            addButton.disabled = false;
            let genreData = new FormData();
            genreData.append('newTitle', newTitle);
            genreData.append('newDescription', newDescription);

            fetch('../php/add_genre.php', {
                method: "POST",
                body: genreData
            })
                .then(Response => Response.json())
                .then(data => {
                    if (data.success) {
                        console.log(data);
                        location.reload();
                    }
                    else if (data.error) {
                        console.log(data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            addButton.disabled = true;
        }
    });
});