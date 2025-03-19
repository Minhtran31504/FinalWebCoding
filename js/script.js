$(document).ready(function() {
    // Mobile Menu Toggle
    $('.mobile-menu-toggle').click(function() {
        $('.mobile-menu').slideToggle(300);
    });
    
    // Close mobile menu when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.mobile-menu-toggle, .mobile-menu').length) {
            $('.mobile-menu').slideUp(300);
        }
    });
    
    // Carousel functionality
    function setupCarousel() {
        const track = $('.carousel-track');
        const slides = $('.carousel-slide');
        const dotsContainer = $('.carousel-dots');
        const slideWidth = slides.first().width();
        let currentIndex = 0;
        let slideInterval;
        
        // Create dots for each slide
        slides.each(function(index) {
            dotsContainer.append(`<div class="carousel-dot ${index === 0 ? 'active' : ''}"></div>`);
        });
        
        const dots = $('.carousel-dot');
        
        // Function to move to a specific slide
        function moveToSlide(index) {
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }
            
            currentIndex = index;
            track.css('transform', `translateX(-${currentIndex * 100}%)`);
            
            // Update active dot
            dots.removeClass('active');
            dots.eq(currentIndex).addClass('active');
        }
        
        // Auto advance slides
        function startSlideshow() {
            slideInterval = setInterval(function() {
                moveToSlide(currentIndex + 1);
            }, 3000); // Change slide every 5 seconds
        }
        
        // Click on dots to navigate
        dots.on('click', function() {
            const dotIndex = $(this).index();
            moveToSlide(dotIndex);
            
            // Reset the interval when manually changing slides
            clearInterval(slideInterval);
            startSlideshow();
        });
        
        // Start the slideshow
        startSlideshow();
        
        // Pause slideshow on hover
        $('.carousel-container').hover(
            function() { clearInterval(slideInterval); },
            function() { startSlideshow(); }
        );
        
        // Handle window resize
        $(window).resize(function() {
            moveToSlide(currentIndex);
        });
    }
    
    // Initialize carousel
    setupCarousel();
    
    // Countdown Timer
    function updateCountdown() {
        // Set the date we're counting down to (New Year's Eve)
        const countdownDate = new Date("Dec 31, 2025 23:59:59").getTime();
        
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countdownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        $('#days').text(days < 10 ? '0' + days : days);
        $('#hours').text(hours < 10 ? '0' + hours : hours);
        $('#minutes').text(minutes < 10 ? '0' + minutes : minutes);
        $('#seconds').text(seconds < 10 ? '0' + seconds : seconds);
        
        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            $('#days').text('00');
            $('#hours').text('00');
            $('#minutes').text('00');
            $('#seconds').text('00');
        }
    }
    
    // Update the countdown every 1 second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 800);
    });
    
    // Placeholder images fallback
    $('img').on('error', function() {
        $(this).attr('src', 'https://via.placeholder.com/400x300?text=Image+Not+Found');
    });
    
    // Animation on scroll (simple fade-in effect)
    $(window).scroll(function() {
        $('.fade-in').each(function() {
            const bottom_of_element = $(this).offset().top + $(this).outerHeight() / 3;
            const bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if (bottom_of_window > bottom_of_element) {
                $(this).animate({'opacity':'1'}, 700);
            }
        });
    });
    
    // Add fade-in class to elements
    $('.section-title, .category-card, .recommendation-content, .event-banner').addClass('fade-in').css('opacity', '0');
});