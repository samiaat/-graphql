import { getData } from "../js/authGraphQL.js";

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {

        const token = await getData(username, password);
        localStorage.setItem('token', token);
        window.location.href = '../html/profile.html';
        
    } catch (error) {
        console.error('Login failed: ' + error);
    }
});