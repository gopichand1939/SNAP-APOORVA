// Login credentials - support multiple users
const USER_CREDENTIALS = {
    // Existing user - supports multiple passwords
    '260104275': {
        passwords: ['Apoorva11', 'Apoorva@2005'],
        pdfPaths: {
            'Apoorva11': 'SNAP.pdf',
            'Apoorva@2005': 'showCardApoorva.pdf'
        }
    },
    // Add new user here - replace with actual username and password
    // Example:
    // 'NEW_USERNAME': {
    //     passwords: ['NEW_PASSWORD'],
    //     pdfPaths: {
    //         'NEW_PASSWORD': 'SNAP.pdf' // or path to their PDF
    //     }
    // }
};

function handleLogin(event) {
    event.preventDefault();
    
    const snapId = document.getElementById('snapId').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Clear previous error
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    // Validate credentials - check if user exists and password matches
    const user = USER_CREDENTIALS[snapId];
    if (user && user.passwords.includes(password)) {
        // Store which password was used to determine which PDF to show
        sessionStorage.setItem('userPassword', password);
        sessionStorage.setItem('snapId', snapId);
        // Credentials are correct, redirect to results page
        window.location.href = 'results.html';
    } else {
        // Show error message
        errorMessage.textContent = 'Invalid SNAP ID or Password. Please try again.';
        errorMessage.classList.add('show');
        
        // Shake animation for error
        const loginBox = document.querySelector('.login-box');
        loginBox.style.animation = 'shake 0.5s';
        setTimeout(() => {
            loginBox.style.animation = '';
        }, 500);
    }
}

// Add shake animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Auto-focus on password field if SNAP ID is pre-filled
document.addEventListener('DOMContentLoaded', function() {
    const snapIdField = document.getElementById('snapId');
    const passwordField = document.getElementById('password');
    
    if (snapIdField.value) {
        passwordField.focus();
    }
    
    // Allow Enter key to submit
    document.getElementById('scorecardLoginForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    });
});

