async function submitRegistration() {
    try {
        // Get user-entered values
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate input fields
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            // Display an alert for missing input
            alert('Please fill in all the fields.');
            return;
        }

        // API endpoint for registration
        const registrationEndpoint = 'https://riderider.onrender.com/api/v1/auth/register';

        // Create a URLSearchParams object to encode the form data
        const formData = new URLSearchParams();
        formData.append('name', fullName); // Adjusted field name to 'name'
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        // formData.append('confirmPassword', confirmPassword);

        // Make a POST request to the registration endpoint with CORS headers
        const response = await fetch(registrationEndpoint, {
            method: 'GET',
            // mode: 'cors', // Add CORS mode
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Access-Control-Allow-Origin': '*', // Replace with the actual allowed origin(s)
            },
             body: formData
        });

        // Check if the response is successful (status code 2xx)
        if (!response.ok) {
            const errorMessage = await response.text(); // Get the error message from the response
            throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorMessage}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Log the entire data to the console
        console.log('Data:', data);

        // Display the message from the server
        alert(data.message);

        // Redirect to OTP verification page if needed
        if (data.message.includes('user has been created, an OTP has been sent to your email for verification')) {
            window.location.href = 'otp-users-verification-page.html';
        }

          // Extract the token
      const token = data.token;

      // Store the token securely (consider using HttpOnly cookies or other secure storage methods)
      localStorage.setItem('token', token);

      // Redirect to another page after a successful login
      window.location.href = "otp-users-verification.html";

    } catch (error) {
        console.error('Registration failed:', error.message);
        alert('Registration failed. Please try again.');
    }
}

// Add event listener to form submission
document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
    submitRegistration(); // Call your registration function
});