import { getData } from "../js/authGraphQL.js";

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {

        const token = await getData(username, password);
        localStorage.setItem('token', token);

        // Redirect to another page (e.g., profile page)
        window.location.href = '../html/profile.html';
        // Redirect to another page or perform additional actions
    } catch (error) {

        // Redirect to the same page (login page)
        window.location.href = '/login.html';
        console.error('Login failed: ' + error);
    }
});