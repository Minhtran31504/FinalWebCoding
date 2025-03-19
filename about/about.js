$(document).ready(function() {
    // Testimonials Slider with enhanced animations
    let currentSlide = 0;
    const testimonials = $('.testimonial-item');
    const dots = $('.dot');
    const totalSlides = testimonials.length;

    function showSlide(index) {
        // Xóa tất cả các class
        testimonials.removeClass('active prev next');
        
        // Class mới cho slide hiện tại
        $(testimonials[index]).addClass('active');
        
        // Class cho slide trước đó
        const prevIndex = (index - 1 + totalSlides) % totalSlides;
        $(testimonials[prevIndex]).addClass('prev');
        
        // Class cho slide tiếp theo
        const nextIndex = (index + 1) % totalSlides;
        $(testimonials[nextIndex]).addClass('next');
        
        // Cập nhật dots
        dots.removeClass('active');
        $(dots[index]).addClass('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Khởi tạo slider
    showSlide(currentSlide);

    // Auto advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Click handlers for dots
    dots.click(function() {
        clearInterval(slideInterval);
        currentSlide = $(this).index();
        showSlide(currentSlide);
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Animation khi scroll
    function checkScroll() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        
        // Navbar animation khi scroll
        if (scrollTop > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        
        // Animation cho About section
        const aboutSection = $('.about-section');
        if (aboutSection.length && scrollTop > aboutSection.offset().top - windowHeight + 200) {
            aboutSection.addClass('about-animated');
        }
        
        // Animation cho Mission section
        const missionSection = $('.mission-section');
        if (missionSection.length && scrollTop > missionSection.offset().top - windowHeight + 200) {
            missionSection.addClass('mission-animated');
        }
        
        // Animation cho Testimonials section
        const testimonialsSection = $('.testimonials-section');
        if (testimonialsSection.length && scrollTop > testimonialsSection.offset().top - windowHeight + 200) {
            testimonialsSection.addClass('testimonials-animated');
        }
    }
    
    // Kiểm tra scroll khi trang tải và khi cuộn
    $(window).on('scroll', checkScroll);
    checkScroll();

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

    // Animation khi hover lên mission images
    $('.mission-images img').hover(
        function() {
            $(this).css({
                'transform': 'scale(1.05) rotate(1deg)',
                'box-shadow': '0 10px 20px rgba(0,0,0,0.1)'
            });
        },
        function() {
            $(this).css({
                'transform': 'scale(1) rotate(0deg)',
                'box-shadow': 'none'
            });
        }
    );
});