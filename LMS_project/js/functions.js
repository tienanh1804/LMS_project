function goToBookshelf() {
    window.location.href = "bookShelf.html";
}

function goToWishlist() {
    window.location.href = "wishList.html";
}

function logOut() {
    fetch("../php/log_out.php");
    window.location.href = "login.html";
}

function goToHome() {
    window.location.href = "home.html";
}

function goToActiveBorrowed() {
    window.location.href = "ActiveBorrowed.html";
}

function goToBorrowed() {
    window.location.href = "Borrowed.html";
}

function goToLogIn() {
    window.location.href = "login.html";
}

function goToSignUp() {
    window.location.href = "signUp.html";
}
function showError() {
    document.getElementById("error_message").style.display = "block";
}
function goToIssued()
{
    window.location.href = "issued.html";
}
function goToUser()
{
    window.location.href = "adminUsers.html";
}
function goToAddBook() {
    window.location.href = "addBook.html";
}
function goToGenre() {
    window.location.href = "adminGenre.html";
}
function goToManual() {
    document.querySelector(".manual-container").style.display = "block";
    document.querySelector(".white_container").style.display = "none";
}
function goToSearch() {
    document.querySelector(".manual-container").style.display = "none";
    document.querySelector(".white_container").style.display = "block";
}
function goToModify() {
    document.querySelector(".white_container").style.display = "block";
    document.querySelector(".add-container").style.display = "none";
    document.querySelector("#new-title-2").value = "";
    document.querySelector("#new-title-description-2").value = "";

}
function goToAdd() {
    document.querySelector(".add-container").style.display = "block";
    document.querySelector(".white_container").style.display = "none";
    document.querySelector("#new-title-1").value = "";
    document.querySelector("#new-title-description-1").value = "";
}
function goToUserProfile() {
    window.location.href = "userProfile.html";
}
function goToChangePassword() {
    window.location.href = "changePassword.html";
}
function goToDashboard() {
    window.location.href = "adminDashboard.html";
}

function goToDetail() {
    document.querySelector(".add-container").style.display = "none";
}

function showBookDetail() {
    document.querySelector(".white_container .top .right-column").style.display = "block";
    document.querySelector(".top .book_cover").style.display = "block";
    document.querySelector(".bottom").style.display = "block";
}

function hideBookDetail() {
    document.querySelector(".white_container .top .right-column").style.display = "none";
    document.querySelector(".top .book_cover").style.display = "none";
    document.querySelector(".bottom").style.display = "none";
    document.querySelector(".comments").style.display = "none";
}

function backToBookDetail() {
    showBookDetail()
    document.querySelector(".edit_container").style.display = "none";
    document.querySelector(".delete-container").style.display = "none";
    document.querySelector(".move-container").style.display = "none";
    document.querySelector(".details-container").style.display = "none";
    document.querySelector(".blur").style.display = "none";
    document.querySelector(".choose_action_bar").style.display = "block";
    document.querySelector(".comments").style.display = "flex";
}

function goToEdit() {
    hideBookDetail();
    document.querySelector(".edit_container").style.display = "inline-block";
    document.querySelector(".delete-container").style.display = "none";
    document.querySelector(".move-container").style.display = "none";
    document.querySelector(".details-container").style.display = "none";
    document.querySelector(".blur").style.display = "none";
    document.querySelector(".choose_action_bar").style.display = "none";
}
function goToDelete() {
    showBookDetail();
    document.querySelector(".delete-container").style.display = "block";
    document.querySelector(".blur").style.display = "flex";
    document.querySelector(".edit_container").style.display = "none";
    document.querySelector(".move-container").style.display = "none";
    document.querySelector(".details-container").style.display = "none";
    document.querySelector(".choose_action_bar").style.display = "none";
}
function goToMove() {
    showBookDetail()
    document.querySelector(".move-container").style.display = "block";
    document.querySelector(".blur").style.display = "block";
    document.querySelector(".delete-container").style.display = "none";
    document.querySelector(".edit_container").style.display = "none";
    document.querySelector(".details-container").style.display = "none";
    document.querySelector(".choose_action_bar").style.display = "none";
}
function goToDetails() {
    hideBookDetail();
    document.querySelector(".edit_container").style.display = "none";
    document.querySelector(".details-container").style.display = "block";
    document.querySelector("blur").style.display = "none";
    document.querySelector(".move-container").style.display = "none";
    document.querySelector(".delete-container").style.display = "none";
    document.querySelector(".choose_action_bar").style.display = "none";
}
function drop_down_menu() {
    var dropdown = document.querySelector('.ava-dropdown');
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}
function editProfile() {
    document.querySelector(".edit").style.display = "none";
    document.querySelector(".infor-input-panel").style.display = "inline";
    document.querySelector(".infor-panel").style.display = "none"
}

function cancelEditProfile() {
    document.querySelector(".edit").style.display = "block";
    document.querySelector(".infor-input-panel").style.display = "none";
    document.querySelector(".infor-panel").style.display = "block"
}
function showAvaPanel() {
    document.querySelector(".change-ava").style.display = "block";
    document.querySelector(".ava-panel").style.display = "grid";
}

function hideAvaPanel() {
    document.querySelector(".change-ava").style.display = "none";
    document.querySelector(".ava-panel").style.display = "none";
}

function selectAvatar(avatarId) {
    const avatars = document.querySelectorAll(".ava-panel img");
    avatars.forEach(avatar => {
        avatar.classList.remove("selected");
    });
    const selectedAvatar = document.querySelector(`.ava-panel .${avatarId}`);
    selectedAvatar.classList.add("selected");
}
function toggleAddPanel() {
    const addPanel = document.querySelector('.add-panel');
    if (addPanel.style.display === 'block') {
        addPanel.style.display = 'none';
    } else {
        addPanel.style.display = 'block';
    }
}
function editProfile() {
    document.querySelector(".edit").style.display = "none";
    document.querySelector(".infor-input-panel").style.display = "inline";
    document.querySelector(".infor-panel").style.display = "none"
}

function cancelEditProfile() {
    document.querySelector(".edit").style.display = "block";
    document.querySelector(".infor-input-panel").style.display = "none";
    document.querySelector(".infor-panel").style.display = "block"
}
function showAvaPanel() {
    document.querySelector(".change-ava").style.display = "block";
    document.querySelector(".ava-panel").style.display = "grid";
}

function hideAvaPanel() {
    document.querySelector(".change-ava").style.display = "none";
    document.querySelector(".ava-panel").style.display = "none";
}

function selectAvatar(avatarId) {
    const avatars = document.querySelectorAll(".ava-panel img");
    avatars.forEach(avatar => {
        avatar.classList.remove("selected");
    });
    const selectedAvatar = document.querySelector(`.ava-panel .${avatarId}`);
    selectedAvatar.classList.add("selected");
}
function toggleAddPanel() {
    const addPanel = document.querySelector('.add-panel');
    if (addPanel.style.display === 'block') {
        addPanel.style.display = 'none';
    } else {
        addPanel.style.display = 'block';
    }
}


document.addEventListener("DOMContentLoaded", userCheck);

function userCheck() {
    fetch("../php/user_now.php")
        .then(response => response.json())
        .then(data => {
            changeAva(data);

        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function changeAva(data) {
    var avatarImg = document.querySelector('.ava');
    avatarImg.innerHTML = '';
    var avatarImg = document.querySelector('.ava');
    avatarImg.innerHTML = '';
    avatarImg.src = "../img/81nq+ewtkcL._AC_UF1000,1000_QL80_.jpg";

    var accountNameDiv = document.querySelector('.account_name');
    accountNameDiv.innerHTML = ' ';
    var accountNameDiv = document.querySelector('.account_name');
    accountNameDiv.innerHTML = ' ';
    accountNameDiv.textContent = data.username;
}

function goToPopular() {
    location.href = "../html/Popular.html";
}

function goToSuggestion() {
    location.href = "../html/Suggestion.html";
}