async function submitLogin() {
    try {
        // Get user-entered values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Payload for the login request
        const payload = {
            email: email,
            password: password
        };

        // API endpoint for login
        const url = 'https://riderider.onrender.com/api/v1/auth/login';

        // Make the POST request
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // Add any additional headers if required
            },
            body: new URLSearchParams(payload).toString(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming the response is in JSON format
        const data = await response.json();
        const token = data.token;

        console.log('Login successful. Token:', token);

        // Redirect to another page
        window.location.href = "users-dashboard.html"; // Replace with your desired page URL
    } catch (error) {
        console.error('Login failed:', error.message);
        // Handle login failure (show error message, etc.)
    }
}



/ forget password

// JavaScript (Adjust as needed)
async function forgetPassword() {
    console.log('Forgot password called');
    try {
        const forgetEmail = document.getElementById('forget-input').value;

        // API endpoint for forget password
        const forgetPasswordEndpoint = 'https://riderider.onrender.com/api/v1/auth/forget-password';

        // Make a POST request to the forget password endpoint
        const response = await fetch(forgetPasswordEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(forgetEmail)}`, // Update to send as "email" form parameter
        });

        console.log('Response:', response);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorMessage}`);
        }

        const data = await response.json();

        console.log('Data:', data);

        if (data.status === true) {
            // Display success message
            alert(data.message);

            // Redirect to OTP verification page or handle as needed
            window.location.href = "otp-users-verification.html";

            // Optionally, you can store the OTP token securely if needed
            const otpToken = data.token;
            localStorage.setItem('otpToken', otpToken);

            return;
        }

        // Display error message
        alert(data.message);
    } catch (error) {
        console.error('Reset password failed:', error);
        alert('An error occurred. Please try again.');
    }
}

document.getElementById('forget-form').addEventListener('submit', function (event) {
    event.preventDefault();
    forgetPassword();
});




// reset password endpoint



// Replace any usage of eval() or new Function() with direct functions

// Function to handle the reset password process
// Function to handle the reset password process
// Function to handle the reset password process
async function handleResetLogin() {
    try {
        console.log('Resetting password...');

        // Combine the input values into a single number
        const otp = parseInt(
            document.getElementById('reset-one').value +
            document.getElementById('reset-two').value +
            document.getElementById('reset-three').value +
            document.getElementById('reset-four').value
        );

        console.log('otp:', otp);

        // Get the token (you need to implement how you retrieve the token)
        const token = localStorage.getItem('otpToken'); // Adjust this based on your token retrieval mechanism
        console.log('token:', token);

        // API endpoint for reset password
        const resetPasswordEndpoint = 'https://riderider.onrender.com/api/v1/auth/resetPassword-OTPVerify';

        // Create a URLSearchParams object to encode the data
        const formData = new URLSearchParams();
        formData.append('otp', otp);
        formData.append('token', token);

        // Make a POST request to the authentication endpoint
        const response = await fetch(resetPasswordEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });

        // Check if the response is successful (status code 2xx)
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorMessage}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Log the data to the console
        console.log('Data:', data);

        // Check if the response contains a status property
        if (data.status === true) {
            // Display a success message
            alert(data.message);

            // Redirect to the reset password page or handle as needed
            window.location.href = "users-reset-password.html";

            return;
        }

        // Display an error message
        alert(data.message);
    } catch (error) {
        console.error('Reset password failed:', error);

        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            alert('Network error. Please check your internet connection and try again.');
        } else {
            alert('An error occurred. Please try again.');
        }
    }
}

// Add an event listener to the form to call the handleResetLogin function on submission
document.getElementById('otp-verification-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    handleResetLogin(); // Call the handleResetLogin function
});


// sign up implementation



