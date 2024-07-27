let userText = document.querySelector(".userSearch");
let searchButton = document.querySelector('.addUser');

document.addEventListener("DOMContentLoaded", function () {
    getUsers();

    searchButton.addEventListener("click", function () {
        getUsers(userText.value);
    });
    userText.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default form submission behavior
            getUsers(userText.value);
        }
    });
});

function getUsers(username = "") {
    let url = '../php/admin_get_user.php?username=' + username;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var tableBody = document.querySelector('#issuedBookTable tbody');
            tableBody.innerHTML = '';

            let i = 1;
            data.forEach(user => {
                const uniqueStatuses = new Set();
                uniqueStatuses.add(user.status_name);
                user.available_statuses.forEach(status => uniqueStatuses.add(status));
                let uniqueStatusesArray = [...uniqueStatuses];

                var row = document.createElement('tr');
                row.innerHTML = `
                    <td>${i}</td>
                    <td>${user.username}</td>
                    <td>${user.full_name}</td>
                    <td>${user.gmail}</td>
                    <td>${user.gender_name}</td>
                    <td>
                        <select class="statusSelect" id="${user.account_id}">
                            ${uniqueStatusesArray.map(status => `<option>${status}</option>`).join('')}
                        </select>
                    </td>
                    <td class="action">
                        <button class="deleteButton" onclick="deleteUser(${user.account_id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
                i++;
            });
            changeStatus();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function deleteUser(user) {
    let url = "../php/delete_user.php?user=" + user;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log(data.success);
            getUsers();
        } else {
            console.log(data.error);
        }
    })
}

function changeStatus() {
    const statusSelects = document.querySelectorAll('.statusSelect');

    statusSelects.forEach(statusSelect => {
        statusSelect.addEventListener('change', function () {
            const selectedStatus = statusSelect.value;
            const selectedId = statusSelect.id;
            fetch(`../php/change_status.php?status=${selectedStatus}&user=${selectedId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log(data.success);
                    } else {
                        console.log(data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    });
}