$(document).ready(function() {
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const newYear = new Date(now.getFullYear() + 1, 0, 1); // Next New Year
        const diff = newYear - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update countdown display
        $('.countdown-item .number').each(function(index) {
            const values = [
                days.toString().padStart(2, '0'),
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ];
            $(this).text(values[index]);
        });
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial update

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

    // Reserve button click handler
    $('.reserve-btn').click(function() {
        window.location.href = '../reservation/reservation.html'; // Chuyển hướng đến trang đặt chỗ
    });

    // Category card hover effect
    $('.category-card').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );

    // Update footer copyright year
    const currentYear = new Date().getFullYear();
    $('.copyright p').text(`COPYRIGHT©ELAMORHUYANH ${currentYear}`);
});