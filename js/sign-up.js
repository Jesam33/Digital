// Function to handle registration form submission
async function submitRegistration() {
    try {
        // Get user-entered values for registration
        const registrationFullName = document.getElementById('full-name').value;
        const registrationEmail = document.getElementById('email').value;
        const registrationPhone = document.getElementById('phone').value;
        const registrationPassword = document.getElementById('password').value;

        // Validate input fields
        if (!registrationFullName || !registrationEmail || !registrationPhone || !registrationPassword) {
            alert('Please fill in all required fields for registration.');
            return;
        }

        // API endpoint for registration
        const registrationEndpoint = 'https://riderider.onrender.com/api/v1/auth/register';

        // Make a POST request to the registration endpoint
        const registrationResponse = await fetch(registrationEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: registrationFullName,
                email: registrationEmail,
                phone: registrationPhone,
                password: registrationPassword,
            }),
        });

        // Log the entire registration response to the console
        console.log('Registration Response:', registrationResponse);

        // Check if the registration response is successful (status code 2xx)
        if (!registrationResponse.ok) {
            const registrationErrorMessage = await registrationResponse.text();
            throw new Error(`HTTP error during registration! Status: ${registrationResponse.status}. Message: ${registrationErrorMessage}`);
        }

        // Parse the JSON registration response
        const registrationData = await registrationResponse.json();


        // Log the registration data to the console
        console.log('Registration Data:', registrationData);
        localStorage.setItem("token", registrationData.token)

        // Handle the registration success as needed
        // For example, display a success message or redirect to a login page
        alert('Registration successful! Please log in.');
            // Redirect to another page after a successful login
            window.location.href = 'otp-users-verification.html';

    } catch (registrationError) {
        console.error('Registration failed:', registrationError.message);
        // Display a pop-up or handle the error in a way appropriate for your application
        alert('An error occurred during registration. Please try again.');
    }
}

// Add an event listener to the registration form to call the submitRegistration function on submission
document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    submitRegistration(); // Call the submitRegistration function
});
