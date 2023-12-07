// Function to submit login form
async function submitLogin() {
    try {
        // Get user-entered values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validate input fields
        if (!email || !password) {
            alert('Please enter both email and password.'); // Display an alert for missing input
            return;
        }

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

        // ... (rest of the code remains unchanged)
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
