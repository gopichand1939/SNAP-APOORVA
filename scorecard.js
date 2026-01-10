// Login credentials
const CORRECT_SNAP_ID = '260104275';
const CORRECT_PASSWORD = 'Apoorva11';
const PDF_PATH = 'SNAP.pdf';

function handleLogin(event) {
    event.preventDefault();
    
    const snapId = document.getElementById('snapId').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Clear previous error
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    // Validate credentials
    if (snapId === CORRECT_SNAP_ID && password === CORRECT_PASSWORD) {
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

