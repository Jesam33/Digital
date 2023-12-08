// Variable to track whether the modal is displayed
let isModalDisplayed = false;

// Function to submit login form
async function submitLogin() {
    try {
        // Get user-entered values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validate input fields
        if (!email || !password) {
            if (!isModalDisplayed) {
                alert('Please enter both email and password.'); // Display an alert for missing input
            }
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

        // Log the entire response to the console
        console.log('Response:', response);

        // Check if the response is successful (status code 2xx)
        if (!response.ok) {
            const errorMessage = await response.text(); // Get the error message from the response

            // Check if the error message indicates that the email is not registered
            if (errorMessage.includes('Email not registered')) {
                showAlert('Email not registered. Please sign up.');
                return;
            }

            // If login fails, do not show the modal
            console.error(`Login failed! Status: ${response.status}. Message: ${errorMessage}`);
            showAlert('Login failed. Please check your credentials.');
            return;
        }

        // Parse the JSON response
        const data = await response.json();

        // Log the data to the console
        console.log('Data:', data);

        // Check if the response contains a message property
        if (data.message) {
            // Check if the status is true
            if (data.status === true) {
                // Display a success modal for successful login
                showModal('Login successful');
                // Redirect to another page after a successful login
                window.location.href = 'users-dashboard.html';
            } else {
                // Display a modal for unsuccessful login
                showModal('Login unsuccessful. Please check your credentials.');
            }
            return; // Exit the function if login is successful or unsuccessful
        }

        // Extract the token
        const token = data.token;

        // Store the token securely (consider using HttpOnly cookies or other secure storage methods)
        localStorage.setItem('token', token);

        // Redirect to another page after a successful login
        window.location.href = 'users-dashboard.html';
    } catch (error) {
        console.error('Login failed:', error.message);
        // Display a pop-up or handle the error in a way appropriate for your application
        showAlert('An error occurred during login. Please try again.');
    }
}

// Function to show modal
function showModal(message) {
    isModalDisplayed = true;
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const modalMessage = document.getElementById('modal-message');

    modalMessage.textContent = message;
    modal.style.display = 'block';
    overlay.style.display = 'block';

    // Close the modal after 3 seconds (adjust as needed)
    setTimeout(() => {
        closeModal();
    }, 3000);
}

// Function to close modal
function closeModal() {
    isModalDisplayed = false;
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');

    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Function to show alert
function showAlert(message) {
    alert(message);
}

// Add an event listener to the login form to call the submitLogin function on submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    submitLogin(); // Call the submitLogin function
});

// REGISTER ENDPOINT
// ... (if there's more code related to the registration endpoint)
