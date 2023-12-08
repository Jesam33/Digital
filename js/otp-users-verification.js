// Function to handle OTP input and change focus
function handleOtpInput(inputElement) {
    const maxLength = parseInt(inputElement.getAttribute('maxlength'));
    const currentLength = inputElement.value.length;

    if (currentLength >= maxLength) {
        // Move focus to the next input
        const nextInputId = inputElement.getAttribute('data-next-input');
        if (nextInputId) {
            const nextInput = document.getElementById(nextInputId);
            if (nextInput) {
                nextInput.focus();
            }
        }
    }
}

// Add event listeners to each OTP input to handle input changes
document.getElementById('otp-input-1').addEventListener('input', function () {
    handleOtpInput(this);
});

document.getElementById('otp-input-2').addEventListener('input', function () {
    handleOtpInput(this);
});

document.getElementById('otp-input-3').addEventListener('input', function () {
    handleOtpInput(this);
});

document.getElementById('otp-input-4').addEventListener('input', function () {
    handleOtpInput(this);
});

// Add an event listener to the OTP verification form to call the verifyOTP function on submission


// Function to handle OTP verification
// Function to handle OTP verification
// Function to handle OTP verification
// Function to handle OTP verification form submission
// Function to handle OTP verification form submission
async function submitOtpVerification() {
    try {
        // Get user-entered values for OTP verification
        const otpInput1 = document.getElementById('otp-input-1').value;
        const otpInput2 = document.getElementById('otp-input-2').value;
        const otpInput3 = document.getElementById('otp-input-3').value;
        const otpInput4 = document.getElementById('otp-input-4').value;

        // Combine the OTP digits
        const enteredOTP = `${otpInput1}${otpInput2}${otpInput3}${otpInput4}`;

        // Validate OTP input
        if (!/^\d{4}$/.test(enteredOTP)) {
            alert('Please enter a valid 4-digit OTP.');
            return;
        }

        // Get the token from local storage
        const token = localStorage.getItem('token');
        console.log(token)

        // Validate the presence of the token
        if (!token) {
            alert('Token not found. Please register or log in.');
            return;
        }

        // API endpoint for OTP verification
        const otpVerificationEndpoint = 'https://riderider.onrender.com/api/v1/auth/verify'; // Replace with the actual OTP verification endpoint

        // Prepare the data for x-www-form-urlencoded format
        const formData = new URLSearchParams();
        formData.append('otp', enteredOTP);
        formData.append('token', token); // Include the token in the form data
        console.log(formData)

        

        // Make a POST request to the OTP verification endpoint
        const otpVerificationResponse = await fetch(otpVerificationEndpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData, // Convert the form data to a URL-encoded string
        });

        // Log the entire OTP verification response to the console
        console.log('OTP Verification Response:', otpVerificationResponse);

        // Check if the OTP verification response is successful (status code 2xx)
        if (!otpVerificationResponse.ok) {
            const otpVerificationErrorMessage = await otpVerificationResponse.text();
            throw new Error(`HTTP error during OTP verification! Status: ${otpVerificationResponse.status}. Message: ${otpVerificationErrorMessage}`);
        }

        // Parse the JSON OTP verification response
        const otpVerificationData = await otpVerificationResponse.json();

        // Log the OTP verification data to the console
        console.log('OTP Verification Data:', otpVerificationData);

        // Check if the status is true
        if (otpVerificationData.status === true) {
            // Handle the OTP verification success as needed
            // For example, display a success message or redirect to a dashboard page
            alert('OTP verification successful! Redirecting to login.');
            window.location.href = 'index.html'; // Replace with the actual dashboard page
        } else {
            // Status is false, handle accordingly (show an error message, etc.)
            alert('OTP verification unsuccessful. Please try again.');
        }

    } catch (otpVerificationError) {
        console.error('OTP verification failed:', otpVerificationError.message);
        // Display a pop-up or handle the error in a way appropriate for your application
        alert('An error occurred during OTP verification. Please try again.');
    }
}

// Add an event listener to the OTP verification form to call the submitOtpVerification function on submission
document.getElementById('otp-verification-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    submitOtpVerification(); // Call the submitOtpVerification function
});


// Add an event listener to the OTP verification form to call the submitOtpVerification function on submission
document.getElementById('otp-verification-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    submitOtpVerification(); // Call the submitOtpVerification function
});


document.getElementById('otp-verification-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    verifyOTP(); // Call the verifyOTP function
});