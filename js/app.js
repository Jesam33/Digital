// Function to submit login form
async function submitLogin() {
    try {
        // Get user-entered values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // API endpoint for login
        const loginEndpoint = 'https://riderider.onrender.com/api/v1/auth/login';

        // Make a POST request to the authentication endpoint
        const response = await fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Log the entire response to the console
        console.log('Response:', response);

        // Check if the response is successful (status code 2xx)
        if (!response.ok) {
            const errorMessage = await response.text(); // Get the error message from the response
            throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorMessage}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Log the data to the console
        console.log('Data:', data);

        // Check if the response contains a message property
        if (data.message) {
            // Display a pop-up or handle the success in a way appropriate for your application
            alert('Login successful');
            window.location.href = "users-dashboard.html";
            return; // Exit the function if login is successful
        }

        // Extract the token
        const token = data.token;

        // Store the token securely (consider using HttpOnly cookies or other secure storage methods)
        localStorage.setItem('token', token);

        // Redirect to another page after a successful login
        window.location.href = "users-dashboard.html";
    } catch (error) {
        console.error('Login failed:', error.message);
        // Display a pop-up or handle the error in a way appropriate for your application
        alert('An error occurred during login. Please try again.');
    }
}

// Add an event listener to the login form to call the submitLogin function on submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    submitLogin(); // Call the submitLogin function
});
