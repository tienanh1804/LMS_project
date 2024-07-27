document.addEventListener("DOMContentLoaded", function() {
    const changePasswordForm = document.getElementById("changePasswordForm");
    const changeButton = document.getElementById("now-change");

    changeButton.addEventListener("click", function(event) {
        event.preventDefault();

        const currentPass = document.getElementById("currentPass").value;
        const newPass = document.getElementById("newPass").value;
        const confirmPass = document.getElementById("confirmPass").value;

        // Client-side validation
        if (!currentPass || !newPass || !confirmPass) {
            alert("Please fill in all fields.");
            return;
        }

        if (newPass !== confirmPass) {
            alert("New password and confirm password do not match.");
            return;
        }

        var passData = new FormData();
        passData.append('currentPass', currentPass);
        passData.append('newPass', newPass);
        passData.append('confirmPass', confirmPass);

        // Send request to change password
        fetch("../php/changePassword.php", {
            method: "POST",
            body: passData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Password changed successfully.");
            } else {
                alert("Failed to change password. " + data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            // alert("An error occurred. Please try again later.");
        });
    });
});
