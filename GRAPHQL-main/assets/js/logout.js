function logout() {
    localStorage.removeItem('token');
    window.location.href = '../html/index.html'; // Redirect to the login page
}

// Add event listener to the logout button
document.getElementById('logoutButton').addEventListener('click', logout);

