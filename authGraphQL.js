export async function getData(username, password) {
    const url = 'https://learn.zone01oujda.ma/api/auth/signin';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${btoa(username + ":" + password)}`
        },
    });

    const errorData = await response.json();
    if (!response.ok) {
        showError(errorData.message || 'Login failed: wrong username or password.');
        //console.error('error:', errorData.message);
        //throw new Error("Wrong credentials");
    }

    //console.log('Login response:', errorData);
    return errorData; // Returning the full errorData for debug purposes
}

// Function to show error
function showError(message) {
  const errorDiv = document.getElementById('login-error'); // Container for the error
  const errorMessage = document.getElementById('error-message'); // Element for the error message

  errorMessage.textContent = message; // Set the error message text
  errorDiv.style.display = 'block'; // Make the error div visible

  // Add event listener to close the error message when the close button is clicked
  const closeButton = document.getElementById('error-close');
  closeButton.addEventListener('click', function() {
      errorDiv.style.display = 'none'; // Hide the error div
  });
}
