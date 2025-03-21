$(document).ready(function () {
    // Mobile Menu Toggle
    $('.mobile-menu-toggle').click(function (event) {
        event.stopPropagation();
        $('.mobile-menu').addClass('active');
        $('.menu-overlay').addClass('active');
        $('body').css('overflow', 'hidden'); // Ngăn cuộn trang khi mở sidebar
    });

    // Đóng mobile menu khi nhấp vào nút đóng
    $('.mobile-menu-close').click(function () {
        closeMenu();
    });

    // Đóng mobile menu khi nhấp vào overlay
    $('.menu-overlay').click(function () {
        closeMenu();
    });

    // Hàm đóng menu
    function closeMenu() {
        $('.mobile-menu').removeClass('active');
        $('.menu-overlay').removeClass('active');
        $('body').css('overflow', ''); // Cho phép cuộn trang lại
    }

    // Carousel functionality
    function setupCarousel() {
        const track = $('.carousel-track');
        const slides = $('.carousel-slide');
        const dotsContainer = $('.carousel-dots');
        const slideWidth = slides.first().width();
        let currentIndex = 0;
        let slideInterval;

        // Create dots for each slide
        slides.each(function (index) {
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
            slideInterval = setInterval(function () {
                moveToSlide(currentIndex + 1);
            }, 3000); // Change slide every 5 seconds
        }

        // Click on dots to navigate
        dots.on('click', function () {
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
            function () { clearInterval(slideInterval); },
            function () { startSlideshow(); }
        );

        // Handle window resize
        $(window).resize(function () {
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
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 800);
    });

    // Placeholder images fallback
    $('img').on('error', function () {
        $(this).attr('src', 'https://via.placeholder.com/400x300?text=Image+Not+Found');
    });

    // Animation on scroll (simple fade-in effect)
    $(window).scroll(function () {
        $('.fade-in').each(function () {
            const bottom_of_element = $(this).offset().top + $(this).outerHeight() / 3;
            const bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_element) {
                $(this).animate({ 'opacity': '1' }, 700);
            }
        });
    });

    // Add fade-in class to elements
    $('.section-title, .category-card, .recommendation-content, .event-banner').addClass('fade-in').css('opacity', '0');

    // Recommendation Carousel
    function setupRecommendationCarousel() {
        const track = $('.recommendation-track');
        const slides = $('.recommendation-slide');
        const dotsContainer = $('.recommendation-dots');
        const prevButton = $('.recommendation-prev');
        const nextButton = $('.recommendation-next');
        let currentIndex = 0;

        // Tạo dots cho từng món ăn
        slides.each(function (index) {
            dotsContainer.append(`<div class="recommendation-dot ${index === 0 ? 'active' : ''}"></div>`);
        });

        const dots = $('.recommendation-dot');

        // Hàm chuyển đến món ăn cụ thể
        function moveToSlide(index) {
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }

            currentIndex = index;
            track.css('transform', `translateX(-${currentIndex * 100}%)`);

            // Cập nhật trạng thái dot
            dots.removeClass('active');
            dots.eq(currentIndex).addClass('active');
        }

        // Xử lý sự kiện nút prev
        prevButton.on('click', function () {
            moveToSlide(currentIndex - 1);
        });

        // Xử lý sự kiện nút next
        nextButton.on('click', function () {
            moveToSlide(currentIndex + 1);
        });

        // Xử lý sự kiện click vào dot
        dots.on('click', function () {
            const dotIndex = $(this).index();
            moveToSlide(dotIndex);
        });

        // Xử lý sự kiện swipe trên thiết bị di động
        let touchStartX = 0;
        let touchEndX = 0;

        $('.recommendation-carousel').on('touchstart', function (event) {
            touchStartX = event.originalEvent.touches[0].clientX;
        });

        $('.recommendation-carousel').on('touchend', function (event) {
            touchEndX = event.originalEvent.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;

            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe sang trái -> Next slide
                moveToSlide(currentIndex + 1);
            }

            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe sang phải -> Prev slide
                moveToSlide(currentIndex - 1);
            }
        }

        // Tự động chuyển slide sau mỗi 5 giây
        let slideInterval = setInterval(function () {
            moveToSlide(currentIndex + 1);
        }, 5000);

        // Dừng tự động chuyển khi hover vào carousel
        $('.recommendation-carousel').hover(
            function () { clearInterval(slideInterval); },
            function () {
                slideInterval = setInterval(function () {
                    moveToSlide(currentIndex + 1);
                }, 5000);
            }
        );
    }

    // Initialize recommendation carousel
    setupRecommendationCarousel();
});