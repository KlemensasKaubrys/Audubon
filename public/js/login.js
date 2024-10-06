document.addEventListener("DOMContentLoaded", function() {
    // Get elements
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

    // Handle form submission (just an example, not functional)2
    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission for demo purposes
        alert('Login submitted!'); // Replace with your authentication logic
        loginPopup.style.display = 'none'; // Hide the popup after submission
    });
});