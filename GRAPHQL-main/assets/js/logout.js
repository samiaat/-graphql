function logout() {
    localStorage.removeItem('token');
    window.location.href = '../html/index.html'; 
}
document.getElementById('logoutButton').addEventListener('click', logout);

