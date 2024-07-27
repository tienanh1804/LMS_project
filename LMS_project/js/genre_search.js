let genre_result = [];
let genre = [];

document.addEventListener("DOMContentLoaded", function () {
    let genre_text_1 = document.getElementById("genre_text_1");
    let genre_text_2 = document.getElementById("genre_text_2");
    let result_box_1 = document.getElementById("result-box-1");
    let result_box_2 = document.getElementById("result-box-2");
    let genreTagsContainer1 = document.getElementById('genre-tags-container-1');
    let genreTagsContainer2 = document.getElementById('genre-tags-container-2');

    const pathname = window.location.pathname;

    if (pathname.includes("adminGenre.html")) {
        console.log("we in adminGenre.html");
        document.addEventListener('genreChange', () => {
            if (genre.length > 1) {
                genre.shift();
            }
        });
    }

    // Add an event listener to the input element
    genre_text_1.addEventListener("input", function () {
        // Trigger genre result fetch if there is some text
        if (genre_text_1.value.trim().length > 0) {
            get_genre_result(genre_text_1, result_box_1, genreTagsContainer1);
        } else {
            result_box_1.style.display = "none";
        }
    });

    genre_text_2.addEventListener("input", function () {
        // Trigger genre result fetch if there is some text
        if (genre_text_2.value.trim().length > 0) {
            get_genre_result(genre_text_2, result_box_2, genreTagsContainer2);
        } else {
            result_box_2.style.display = "none";
        }
    });

    function get_genre_result(genre_text, result_box, tag_box) {
        // Prepare data for fetch
        const formData = new FormData();
        formData.append('genre_text', genre_text.value);

        // Perform fetch request
        fetch('../php/genre_search.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json()) // Parse JSON response
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                    genre_result = [];
                } else {
                    // Update genre_result with the data received
                    genre_result = data.success;
                    // console.log(genre_result);
                    displayResults(result_box, genre_text, tag_box);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    // Initialize the genre array

    function displayResults(result_box, genre_text, tag_box) {
        // Display results based on genre_result array
        if (genre_result.length > 0) {
            result_box.style.display = "block";
            let contents = "<ul>";

            for (let i = 0; i < genre_result.length; i++) {
                const genreItem = genre_result[i].title;
                const genreId = genre_result[i].id;
                // Create an <li> element
                contents += `<li id="${genreId}">${genreItem}</li>`;
            }

            contents += "</ul>";
            result_box.innerHTML = contents;

            // Add click event listeners to the list items
            const listItems = result_box.querySelectorAll("li");

            listItems.forEach(function (listItem) {
                listItem.addEventListener("click", function () {
                    const selectedGenre = listItem.textContent;
                    const selectedGenreId = listItem.id;

                    // Check if the selected genre is already in the genre array
                    const genreExists = genre.some(item => item.genreText === selectedGenre);

                    if (!genreExists) {
                        // Add the selected genre to the genre array
                        genre.push({ 'genreId': selectedGenreId, 'genreText': selectedGenre });
                        handleGenreChange();

                        // Update the genre_text input to display the selected genres as tags
                        updateGenreText(tag_box);
                        genre_text.value = '';
                        // console.log(genre);

                        // Hide the result_box
                        result_box.style.display = "none";
                    }
                });
            });

        } else {
            result_box.style.display = "none";
        }
    }

    // Function to update the genre_text input to display the selected genres as tags
    function updateGenreText(tag_box) {
        // Clear the tag box before adding new tags
        tag_box.innerHTML = '';

        // Iterate over each genre item in the genre array
        genre.forEach(function (genreItem, index) {
            // Create a new span element for the tag
            const tag = document.createElement('div');
            tag.className = 'tooltip';
            tag.id = genreItem.genreId;
            const text_part = document.createElement('p');
            text_part.textContent = genreItem.genreText;
            text_part.classList.add('tooltip-text');
            tag.appendChild(text_part);

            const newTooltip = document.createElement('span');
            newTooltip.className = 'tooltiptext';
            newTooltip.textContent = genreItem.genreText;
            // Append the tag to the tag box
            tag.appendChild(newTooltip);
            tag_box.appendChild(tag);

            // Add an event listener to the close button
            tag.addEventListener('click', function () {
                // Remove the tag from the tag box
                tag_box.removeChild(tag);

                // Remove the genre from the genre array
                genre.splice(index, 1);

                // Call the function again to update the tag box
                updateGenreText(tag_box);
            });
        });
    }

    function handleGenreChange() {
        const genreChangeEvent = new Event('genreChange');
        document.dispatchEvent(genreChangeEvent);
        // console.log('a change in genre');
    }
});


function removeGenreList() {
    genre = [];
    console.log('removing genre list');
}
