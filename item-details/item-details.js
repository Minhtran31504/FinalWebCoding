$(document).ready(function () {
    // Lấy thông tin món ăn từ localStorage
    const itemData = JSON.parse(localStorage.getItem('selectedItem'));

    if (itemData) {
        // Cập nhật thông tin món ăn trên trang
        updateItemDetails(itemData);
    } else {
        // Nếu không có dữ liệu, chuyển hướng về trang menu
        window.location.href = '../menu/menu.html';
    }

    // Đảm bảo người dùng không thể nhập số lượng nhỏ hơn 1
    $('.quantity-input').on('input change', function () {
        let quantity = parseInt($(this).val()) || 1;
        if (quantity < 1) quantity = 1;
        $(this).val(quantity);
        updateTotalPrice();
    });

    // Xử lý nút yêu thích
    $('.favorite-btn').click(function () {
        $(this).find('i').toggleClass('far fas');
    });

    // Xử lý nút đặt hàng
    $('.order-btn').click(function () {
        // Lấy thông tin món ăn từ localStorage
        const itemData = JSON.parse(localStorage.getItem('selectedItem'));
        if (!itemData) return;

        // Thêm vào giỏ hàng
        addToCart(itemData);
    });

    // Xử lý nút chia sẻ
    $('.share-btn').click(function () {
        // Hiển thị tùy chọn chia sẻ (có thể mở rộng sau này)
        if (itemData && itemData.language === 'vi') {
            alert('Chức năng chia sẻ sẽ được phát triển trong tương lai!');
        } else {
            alert('Sharing functionality will be developed in the future!');
        }
    });

    // Cập nhật năm bản quyền
    const currentYear = new Date().getFullYear();
    $('.copyright p').text(`COPYRIGHT©ELAMORHUYANH ${currentYear}`);

    // Cập nhật badge giỏ hàng
    updateCartBadge();
});

// Hàm cập nhật thông tin chi tiết món ăn
function updateItemDetails(item) {
    // Cập nhật tiêu đề trang
    document.title = `El Amor Huy Anh - ${item.name}`;

    // Cập nhật hình ảnh
    $('#item-image').attr('src', item.image);
    $('#item-image').attr('alt', item.name);

    // Cập nhật tên món ăn
    $('#item-name').text(item.name);

    // Cập nhật giá
    $('#item-price').text(item.price);

    // Cập nhật mô tả
    $('#item-description').text(item.description);

    // Cập nhật đánh giá sao
    const fullStars = Math.max(0, Math.min(5, Math.floor(item.rating)));
    const emptyStars = Math.max(0, 5 - fullStars);
    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '★';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '☆';
    }
    $('.stars').html(starsHtml);

    // Cập nhật ngôn ngữ nút đặt hàng nếu cần
    if (item.language === 'vi') {
        $('.order-btn').text('ĐẶT NGAY');
        $('.back-button a').html('<i class="fas fa-arrow-left"></i> Quay lại Menu');
        $('.bon-appetit').text('Chúc ngon miệng!');
    } else {
        $('.order-btn').text('ADD TO CART');
        $('.back-button a').html('<i class="fas fa-arrow-left"></i> Back to Menu');
        $('.bon-appetit').text('Buon Appetito!');
    }

    // Khởi tạo giá trị số lượng ban đầu
    $('.quantity-input').val(1);

    // Đảm bảo các nút tăng/giảm hoạt động
    setupQuantityButtons();
}

// Thiết lập lại các nút tăng/giảm số lượng
function setupQuantityButtons() {
    // Xóa các event handler cũ để tránh trùng lặp
    $('.minus-btn, .plus-btn').off('click');

    // Thiết lập lại event handler cho nút giảm
    $('.minus-btn').on('click', function () {
        let quantity = parseInt($('.quantity-input').val());
        if (quantity > 1) {
            quantity -= 1;
            $('.quantity-input').val(quantity);
            updateTotalPrice();
        }
        console.log("Giảm số lượng: " + quantity);
    });

    // Thiết lập lại event handler cho nút tăng
    $('.plus-btn').on('click', function () {
        let quantity = parseInt($('.quantity-input').val());
        quantity += 1;
        $('.quantity-input').val(quantity);
        updateTotalPrice();
        console.log("Tăng số lượng: " + quantity);
    });
}

// Hàm cập nhật tổng giá tiền dựa trên số lượng
function updateTotalPrice() {
    // Chức năng này có thể được phát triển trong tương lai
    // Ví dụ: Tính tổng giá = đơn giá * số lượng
    // const price = parseFloat($('#item-price').text().replace(/[^0-9.-]+/g, ''));
    // const quantity = parseInt($('.quantity-input').val());
    // const totalPrice = price * quantity;
    // $('#total-price').text(`$${totalPrice.toFixed(2)}`);
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(item) {
    // Lấy giỏ hàng hiện tại từ localStorage hoặc tạo mới nếu chưa có
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra xem món ăn đã có trong giỏ hàng chưa
    const existingItemIndex = cart.findIndex(cartItem =>
        cartItem.name === item.name && cartItem.price === item.price
    );

    if (existingItemIndex !== -1) {
        // Nếu đã có, tăng số lượng
        cart[existingItemIndex].quantity += 1;
    } else {
        // Nếu chưa có, thêm món ăn mới vào giỏ hàng
        item.quantity = 1;
        cart.push(item);
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Cập nhật số lượng hiển thị trên biểu tượng giỏ hàng
    updateCartBadge();

    // Hiển thị thông báo
    const message = item.language === 'vi' ?
        'Thêm vào giỏ hàng thành công' :
        'Successfully added to cart';
    showToast(message);
}

// Hàm hiển thị thông báo toast
function showToast(message) {
    // Tạo toast nếu chưa tồn tại
    if ($('#toast-container').length === 0) {
        $('body').append('<div id="toast-container"></div>');
    }

    // Tạo toast mới
    const toast = $(`<div class="toast" style="background-color: green;">${message}</div>`);
    $('#toast-container').append(toast);

    // Hiển thị và xóa sau 3 giây
    setTimeout(function () {
        toast.addClass('show');
        setTimeout(function () {
            toast.removeClass('show');
            setTimeout(function () {
                toast.remove();
            }, 300);
        }, 3000);
    }, 10);
}

// Cập nhật số lượng trên biểu tượng giỏ hàng
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Nếu đã có badge thì cập nhật, nếu chưa thì tạo mới
    if ($('.cart-badge').length === 0) {
        $('.fa-shopping-cart').after('<span class="cart-badge"></span>');
    }

    if (totalItems > 0) {
        $('.cart-badge').text(totalItems).show();
    } else {
        $('.cart-badge').hide();
    }
}

// Xử lý khi người dùng nhấn vào biểu tượng giỏ hàng
$(document).on('click', '.fa-shopping-cart', function () {
    // Chuyển hướng đến trang payment.html
    window.location.href = '../payment/payment.html';
});

// Thêm CSS cho toast
$('head').append(`
    <style>
        #toast-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        }
        
        .toast {
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            margin-top: 10px;
            opacity: 0;
            transform: translateY(100px);
            transition: all 0.3s;
        }
        
        .toast.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .cart-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: #e74c3c;
            color: white;
            font-size: 12px;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        
        .social-icon {
            position: relative;
        }
    </style>
`);