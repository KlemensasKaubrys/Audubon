let isSidebarVisible = true; // Track the visibility state of the sidebar

function loadPage(page) {
    const mainContent = document.getElementById('main-content');

    if (page === 'home') {
        mainContent.innerHTML = `
            <h1>Dashboard Home</h1>
            <p>Welcome to the dashboard!</p>
        `;
    } else if (page === 'sine-wave') {
        fetch('/sine_wave.html')  // Ensure this path is correct
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                mainContent.innerHTML = data;
            })
            .catch(error => {
                mainContent.innerHTML = `<p>Error loading the sine wave page: ${error.message}</p>`;
            });
    }
}

function toggleSidebar() {
    const sidePanel = document.querySelector('.side-panel');
    const toggleIcon = document.getElementById('toggle-icon');

    sidePanel.classList.toggle('hidden');
    isSidebarVisible = !isSidebarVisible; // Toggle the state

    if (isSidebarVisible) {
        toggleIcon.className = 'fa-solid fa-circle-arrow-left'; // Icon for hiding
    } else {
        toggleIcon.className = 'fa-solid fa-circle-arrow-right'; // Icon for showing
    }
}
