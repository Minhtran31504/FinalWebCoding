/**
 * Cart Badge - Hiển thị số lượng sản phẩm trong giỏ hàng
 * Sử dụng trên tất cả các trang để đảm bảo tính nhất quán
 */
(function() {
    // Chờ document sẵn sàng
    document.addEventListener('DOMContentLoaded', function() {
        // Kiểm tra jQuery đã được tải
        if (typeof jQuery === 'undefined') {
            console.error('Cart Badge requires jQuery');
            return;
        }
        
        // Thêm CSS cho badge
        addBadgeStyles();
        
        // Cập nhật badge
        updateCartBadge();
        
        // Xử lý sự kiện click vào biểu tượng giỏ hàng
        setupCartIconClick();
    });
    
    /**
     * Thêm CSS cho badge
     */
    function addBadgeStyles() {
        const css = `
            .cart-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                background-color: #e74c3c;
                color: white;
                font-size: 12px;
                min-width: 18px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                padding: 0 4px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }
            
            .fa-shopping-cart {
                position: relative;
            }
            
            .social-icon {
                position: relative;
            }
            
            .icon-circle {
                position: relative;
                display: inline-block;
            }
        `;
        
        $('<style>').text(css).appendTo('head');
    }
    
    /**
     * Cập nhật số hiển thị trên badge giỏ hàng
     */
    function updateCartBadge() {
        // Lấy dữ liệu giỏ hàng từ localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Tính tổng số lượng sản phẩm
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        // Xóa tất cả badge hiện tại
        $('.cart-badge').remove();
        
        // Nếu có sản phẩm trong giỏ hàng, hiển thị badge
        if (totalItems > 0) {
            // Thêm badge cho tất cả biểu tượng giỏ hàng
            $('.fa-shopping-cart').after(`<span class="cart-badge">${totalItems}</span>`);
        }
    }
    
    /**
     * Xử lý sự kiện khi nhấp vào biểu tượng giỏ hàng
     */
    function setupCartIconClick() {
        $(document).on('click', '.fa-shopping-cart, .cart-badge', function(e) {
            e.preventDefault();
            
            // Chuyển hướng đến trang payment
            window.location.href = getPaymentPath();
        });
    }
    
    /**
     * Lấy đường dẫn tới trang payment dựa trên vị trí hiện tại
     */
    function getPaymentPath() {
        // Lấy URL hiện tại
        const currentPath = window.location.pathname;
        
        // Phân tích URL để xác định vị trí tương đối
        if (currentPath.includes('/index.html') || currentPath.endsWith('/')) {
            return 'payment/payment.html';
        } else if (currentPath.includes('/menu/') || 
                  currentPath.includes('/about/') || 
                  currentPath.includes('/events/') || 
                  currentPath.includes('/reservation/') ||
                  currentPath.includes('/contact/')) {
            return '../payment/payment.html';
        } else {
            // Trường hợp mặc định
            return '../payment/payment.html';
        }
    }
    
    // Xuất các hàm để có thể truy cập từ bên ngoài
    window.CartBadge = {
        update: updateCartBadge
    };
})(); 