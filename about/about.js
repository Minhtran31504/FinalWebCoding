$(document).ready(function() {
    // Testimonials Slider
    let currentSlide = 0;
    const testimonials = $('.testimonial-item');
    const dots = $('.dot');
    const totalSlides = testimonials.length;

    function showSlide(index) {
        testimonials.removeClass('active');
        dots.removeClass('active');
        
        $(testimonials[index]).addClass('active');
        $(dots[index]).addClass('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Click handlers for dots
    dots.click(function() {
        clearInterval(slideInterval);
        currentSlide = $(this).index();
        showSlide(currentSlide);
        slideInterval = setInterval(nextSlide, 5000);
    });

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

    // Update footer copyright year
    const currentYear = new Date().getFullYear();
    $('.copyright p').text(`COPYRIGHT©ELAMORHUYANH ${currentYear}`);

    // Add hover effect for mission images
    $('.mission-images img').hover(
        function() {
            $(this).css('transform', 'scale(1.05)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );
});