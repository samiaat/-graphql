export async function getData(username, password) {
    const url = 'https://learn.zone01oujda.ma/api/auth/signin';
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(username + ":" + password)}`
        },
    });

    const resultat = await response.json();
    if (!response.ok) {
        showError(resultat.message || 'Login failed: wrong username or password.');
        console.error('error:', errorData.message);
        throw new Error("Wrong credentials");
    }

    return resultat; 
}

// Function to show error
function showError(message) {
  const errorDiv = document.getElementById('login-error'); 
  const errorMessage = document.getElementById('error-message');

  errorMessage.textContent = message; 
  errorDiv.style.display = 'block';

  const closeButton = document.getElementById('error-close');
  closeButton.addEventListener('click', function() {
      errorDiv.style.display = 'none'; 
  });
}
