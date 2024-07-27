document.addEventListener("DOMContentLoaded", function() {
    const signUpForm = document.querySelector(".signInForm");

    signUpForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(signUpForm);

        fetch("../php/signin_process.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const errorMessage = document.getElementById("error_message");
            errorMessage.style.display = "block";
            if (data.error) {
                errorMessage.textContent = data.error;
            } else {
                // Handle success messages and redirection
                if (data['success-1']) {
                    errorMessage.textContent = data['success-1'];
                    location.href = "../html/home.html";
                } else if (data['success-0']) {
                    errorMessage.textContent = data['success-0'];
                    location.href = "../html/adminDashBoard.html";
                } else {
                    // Handle unexpected responses
                    errorMessage.textContent = "An unexpected response occurred.";
                }
            }
        })
        .catch(error => {
            console.error("Error:",error);
            const errorMessage = document.getElementById("error_message");
            errorMessage.style.display = "block";
            errorMessage.textContent = "An unknown error occurred.";
        });
    });
});
