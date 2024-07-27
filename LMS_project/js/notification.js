export function triggerNotification(title, message, type, duration) {
    // Ensure the DOM element #toast exists
    const main = document.querySelector('#toast');
    if (main) {
        const toast = document.createElement("div");
        toast.style = "display: fixed; "

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fas fa-check-circle success",
            info: "fas fa-info-circle info",
            warning: "fas fa-exclamation-circle warning",
            error: "fas fa-exclamation-circle error"
        };
        const icon = icons[type];
        const delay = (duration / 2000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">${title}</h3>
            <p class="toast__msg">${message}</p>
        </div>
        <div class="toast__close">
            <i class="fas fa-times"></i>
        </div>
      `;
        main.appendChild(toast);
    }
}


