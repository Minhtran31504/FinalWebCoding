$(document).ready(function() {
    // Set dynamic page title
    document.title = "Login - El Amor Huy Anh Restaurant";

    // Toggle password visibility
    $('.toggle-password').click(function() {
        const passwordInput = $(this).siblings('input');
        const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
        passwordInput.attr('type', type);
        
        // Change icon
        $(this).toggleClass('fa-eye fa-eye-slash');
    });

    // Handle login form submission
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        // Reset error messages
        $('.error-message').text('');
        
        // Get input values
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        
        // Simulate successful login
        showToast('Login successful!', 'success');
        
        // Redirect to index.html after 2 seconds
        setTimeout(function() {
            window.location.href = '../index.html';
        }, 2000);
    });

    // Toast notification display function
    function showToast(message, type) {
        // Set content and type of notification
        $('#toast-message').text(message);
        
        if (type === 'success') {
            $('#toast-icon').attr('class', 'fas fa-check-circle');
        } else {
            $('#toast-icon').attr('class', 'fas fa-exclamation-circle');
        }
        
        // Show notification
        $('#toast').addClass('show');
        
        // Automatically hide after 5 seconds
        setTimeout(function() {
            $('#toast').removeClass('show');
        }, 5000);
    }

    // Check if user is already logged in (to auto-fill information)
    function checkLoggedInUser() {
        const user = JSON.parse(localStorage.getItem('user') || 'null') || 
                    JSON.parse(sessionStorage.getItem('user') || 'null');
        
        if (user && user.isLoggedIn) {
            // If logged in, redirect to main page or previous page
            const referrer = document.referrer || '../index.html';
            window.location.href = referrer;
        }
    }

    // Run check when page loads
    checkLoggedInUser();

    // Handle event when user clicks on shopping cart icon
    $(document).on('click', '.fa-shopping-cart', function() {
        // Redirect to payment.html
        window.location.href = '../payment/payment.html';
    });

    // Handle event when user clicks on user icon
    $(document).on('click', '.fa-user', function() {
        // If user is logged in, redirect to profile page
        // If not, stay on login page
        const user = JSON.parse(localStorage.getItem('user') || 'null') || 
                    JSON.parse(sessionStorage.getItem('user') || 'null');
        
        if (user && user.isLoggedIn) {
            window.location.href = '../profile/profile.html';
        }
    });
});