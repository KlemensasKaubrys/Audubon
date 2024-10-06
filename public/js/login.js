document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.querySelector('.login-button');
    const loginPopup = document.getElementById('loginPopup');
    const closePopup = document.getElementById('closePopup');

    loginBtn.addEventListener('click', () => {
        loginPopup.style.display = 'flex'; 
    });

    closePopup.addEventListener('click', () => {
        loginPopup.style.display = 'none'; 
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginPopup) {
            loginPopup.style.display = 'none';
        }
    });

    document.getElementById('loginForm').addEventListener('submit', (event) => {
        loginPopup.style.display = 'none'; // Hide the popup after submission
    });
});