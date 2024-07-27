document.addEventListener("DOMContentLoaded", function() {

    fetch("../php/updateProfile.php", {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
       
        if (data.error) {
            console.error("Error:", data.error);
        } else {
            displayUserInfo(data);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });

    const saveButton = document.querySelector('.save');
    saveButton.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form

        // Gọi hàm để lưu thông tin
        saveProfileChanges();
    });

    
    function displayUserInfo(data) {

        const firstNameElement = document.querySelector(".profile-first-name");
        const lastNameElement = document.querySelector(".profile-last-name");
        const ageElement = document.querySelector(".profile-age");
        const genderElement = document.querySelector(".profile-gender");
        const emailElement = document.querySelector(".profile-email");
        const phoneNumberElement = document.querySelector(".profile-phoneNumber");

        const firstNameElementInput = document.querySelector(".input-first-name");
        const lastNameElementInput = document.querySelector(".input-last-name");
        const ageElementInput = document.querySelector(".input-age");
        const genderElementInput = document.querySelector(".input-gender");
        const emailElementInput = document.querySelector(".input-email");
        const phoneNumberElementInput = document.querySelector(".input-phoneNumber");

        // Gán thông tin người dùng vào các phần tử HTML tương ứng
        firstNameElement.textContent = data.firstName;
        lastNameElement.textContent = data.lastName;
        ageElement.textContent = data.age;
        emailElement.textContent = data.email;
        phoneNumberElement.textContent = data.phoneNumber;

        //firstNameElementInput.value = firstNameElement.textContent;
        lastNameElementInput.value = lastNameElement.textContent;
        ageElementInput.value = ageElement.textContent;
        if (data.gender == "1") {
            genderElementInput.selectedIndex = 0;
            genderElement.textContent = "Female";
        } else if (data.gender == "2") {
            genderElementInput.selectedIndex = 1;
            genderElement.textContent = "Male";
        } else {
            genderElementInput.selectedIndex = 2;
            genderElement.textContent = "Other";
        }
        emailElementInput.value = emailElement.textContent;
        phoneNumberElementInput.value = phoneNumberElement.textContent;
    }

    function saveProfileChanges() {
        // Lấy dữ liệu từ các trường input trong form
        const firstName = document.querySelector('.input-first-name').value;
        const lastName = document.querySelector('.input-last-name').value;
        const age = document.querySelector('.input-age').value;
        const gender = document.querySelector('.input-gender').value;
        const email = document.querySelector('.input-email').value;
        const phoneNumber = document.querySelector('.input-phoneNumber').value;
    
        // Xây dựng URL với các tham số dữ liệu
        const url = `../php/changeProfile.php?firstName=${firstName}&lastName=${lastName}&age=${age}&gender=${gender}&email=${email}&phoneNumber=${phoneNumber}`;
    
        // Gửi yêu cầu GET để cập nhật thông tin người dùng
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
            } else {
                displayUserInfo(data);
                console.log("Profile updated successfully!");
                location.href="../html/userProfile.html"
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
});
