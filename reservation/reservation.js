$(document).ready(function() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    $('#date').attr('min', today);

    // Set time range (11:30 AM - 10:00 PM)
    $('#time').attr('min', '11:30');
    $('#time').attr('max', '22:00');

    // Calendar functionality
    let currentDate = new Date();
    let selectedDate = null;

    function generateCalendar(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startingDay = firstDay.getDay() || 7; // Convert Sunday from 0 to 7
        
        $('.month-year').text(date.toLocaleString('default', { month: 'short', year: 'numeric' }));
        
        const calendarDates = $('.calendar-dates');
        calendarDates.empty();
        
        // Add empty cells for days before the first day of the month
        for (let i = 1; i < startingDay; i++) {
            calendarDates.append('<div></div>');
        }
        
        // Add days of the month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dateDiv = $('<div>', {
                class: 'calendar-date',
                text: i
            });
            
            if (i === currentDate.getDate() && 
                date.getMonth() === currentDate.getMonth() && 
                date.getFullYear() === currentDate.getFullYear()) {
                dateDiv.addClass('today');
            }
            
            if (selectedDate && 
                i === selectedDate.getDate() && 
                date.getMonth() === selectedDate.getMonth() && 
                date.getFullYear() === selectedDate.getFullYear()) {
                dateDiv.addClass('selected');
            }
            
            calendarDates.append(dateDiv);
        }
    }

    // Show calendar on input or wrapper click
    $('.date-picker-wrapper').on('click', function(e) {
        e.stopPropagation();
        $('.time-popup').hide(); // Hide time popup if open
        $('.calendar-popup').show();
        generateCalendar(currentDate);
    });

    // Show time picker on input or wrapper click
    $('.time-picker-wrapper').on('click', function(e) {
        e.stopPropagation();
        $('.calendar-popup').hide(); // Hide calendar if open
        $('.time-popup').show();
    });

    // Prevent popup from closing when clicking inside it
    $('.calendar-popup, .time-popup').on('click', function(e) {
        e.stopPropagation();
    });

    // Close popups when clicking outside
    $(document).on('click', function() {
        $('.calendar-popup, .time-popup').hide();
    });

    // Navigate months
    $('.prev-month').click(function(e) {
        e.stopPropagation();
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    $('.next-month').click(function(e) {
        e.stopPropagation();
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    // Select date
    $(document).on('click', '.calendar-date', function() {
        const day = parseInt($(this).text());
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        
        // Format date as DD/MM/YYYY
        const formattedDate = selectedDate.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric'
        });
        
        $('#date').val(formattedDate);
        $('.calendar-date').removeClass('selected');
        $(this).addClass('selected');
        $('.calendar-popup').hide();
    });

    // Time picker functionality
    let selectedHour = 12;
    let selectedMinute = 0;
    let selectedPeriod = 'AM';

    $('.hour-input').on('input', function() {
        let value = parseInt($(this).val());
        if (isNaN(value)) value = 12;
        if (value < 1) value = 1;
        if (value > 12) value = 12;
        $(this).val(value);
        selectedHour = value;
    });

    $('.minute-input').on('input', function() {
        let value = parseInt($(this).val());
        if (isNaN(value)) value = 0;
        if (value < 0) value = 0;
        if (value > 59) value = 59;
        $(this).val(value.toString().padStart(2, '0'));
        selectedMinute = value;
    });

    $('.period-btn').click(function() {
        $('.period-btn').removeClass('active');
        $(this).addClass('active');
        selectedPeriod = $(this).data('period');
    });

    $('.time-ok').click(function() {
        // Format time as HH:MM AM/PM
        const timeString = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
        $('#time').val(timeString);
        $('.time-popup').hide();
    });

    $('.time-cancel').click(function() {
        $('.time-popup').hide();
    });

    // Prevent form submission when clicking buttons inside popups
    $('.calendar-nav button, .period-btn, .time-cancel, .time-ok').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    // Thêm xử lý sự kiện cho nút "Book Now"
    $('.book-now-btn').click(function(e) {
        e.preventDefault();
        
        // Reset error states
        $('.form-group').removeClass('error');
        $('.error-message').remove();
        
        let isValid = true;
        
        // Validate date
        if (!$('#date').val()) {
            showError($('#date'), 'Please select a date');
            isValid = false;
        } else {
            const selectedDate = new Date($('#date').val());
            const todayDate = new Date(today);
            if (selectedDate < todayDate) {
                showError($('#date'), 'Please select a date in the future');
                isValid = false;
            }
        }
        
        // Validate time
        if (!$('#time').val()) {
            showError($('#time'), 'Vui lòng chọn giờ');
            isValid = false;
        } else {
            const timeValue = $('#time').val();
            const [hours, minutes] = timeValue.split(':');
            const timeInMinutes = parseInt(hours) * 60 + parseInt(minutes);
            
            if (timeInMinutes < 11 * 60 + 30 || timeInMinutes > 22 * 60) {
                showError($('#time'), 'Vui lòng chọn giờ từ 11:30 đến 22:00');
                isValid = false;
            }
        }
        
        // Validate guests
        const guests = $('#guests').val();
        if (!guests || guests < 1) {
            showError($('#guests'), 'Please enter number of guests');
            isValid = false;
        }
        
        // Validate name
        if (!$('#firstName').val().trim()) {
            showError($('#firstName'), 'Please enter your first name');
            isValid = false;
        }
        if (!$('#lastName').val().trim()) {
            showError($('#lastName'), 'Please enter your last name');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test($('#email').val())) {
            showError($('#email'), 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate phone
        const phoneRegex = /^\d{10,}$/;
        if (!phoneRegex.test($('#phone').val().replace(/\D/g, ''))) {
            showError($('#phone'), 'Please enter a valid phone number');
            isValid = false;
        }
        
        if (isValid) {
            // Thêm hiệu ứng fade out cho form
            $('#bookingForm').addClass('fade-transition fade-out');
            
            // Sau khi hiệu ứng hoàn thành, ẩn form và hiển thị thông báo
            setTimeout(function() {
                $('#bookingForm').hide();
                $('.confirmation-message').addClass('fade-transition').show();
            }, 500);
            
            // Bạn có thể lưu dữ liệu vào localStorage hoặc gửi đến server ở đây
            console.log('Reservation submitted successfully');
        }
    });

    // Giữ nguyên các hàm hiện có
    function showError(element, message) {
        const formGroup = element.closest('.form-group');
        formGroup.addClass('error');
        formGroup.append(`<div class="error-message">${message}</div>`);
    }

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