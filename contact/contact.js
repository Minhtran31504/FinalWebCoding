$(document).ready(function() {
    // Modal functions
    function openModal() {
        $('#thankYouModal').css('display', 'flex');
        $('body').css('overflow', 'hidden'); // Prevent scrolling while modal is open
    }
    
    function closeModal() {
        $('#thankYouModal').css('display', 'none');
        $('body').css('overflow', 'auto'); // Restore scrolling
    }
    
    // Close modal when clicking the X button
    $('.close-modal').on('click', function() {
        closeModal();
    });
    
    // Close modal when clicking the OK button
    $('.modal-btn').on('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside the modal content
    $('#thankYouModal').on('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Form submission handling
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const source = $('#source').val();
        
        // Basic validation
        if (!name || !phone) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^\d{10,}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // Show success message using modal instead of alert
        openModal();
        
        // Reset form
        this.reset();
    });

    // Update footer copyright year
    const currentYear = new Date().getFullYear();
    $('.copyright p').text(`COPYRIGHT©ELAMORHUYANH ${currentYear}`);

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        const target = $($.attr(this, 'href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800);
        }
    });
});