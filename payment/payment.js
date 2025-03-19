$(document).ready(function() {
    const messages = {
        'dine-in': {
            'cash': "The staff will arrive in a few minutes. We have received your order. Please wait a few minutes, we are preparing your dish now.",
            'card': "Your order has been received. Please allow us a few minutes as we prepare your meal with care.",
            'vnpay': "Your order has been received. Please allow us a few minutes as we prepare your meal with care."
        },
        'pickup': {
            'cash': "Please come to the counter to pick up your food when we call your name.",
            'card': "Please come to the counter to pick up your food when we call your name.",
            'vnpay': "Please come to the counter to pick up your food when we call your name."
        },
        'delivery': {
            'cash': null, // Không chấp nhận tiền mặt cho delivery
            'card': "Your order has been received. Please allow us a few minutes as we prepare your meal with care.",
            'vnpay': "Your order has been received. Please allow us a few minutes as we prepare your meal with care."
        }
    };

    let selectedDelivery = '';
    let selectedPayment = '';
    
    // Tạo container cho toast nếu chưa có
    if (!$('.toast-container').length) {
        $('body').append('<div class="toast-container"></div>');
    }
    
    // Hàm hiển thị toast notification
    function showToast(message, type = 'info', title = '') {
        // Xác định icon dựa vào type
        let icon;
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                title = title || 'Success';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                title = title || 'Error';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i>';
                title = title || 'Warning';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
                title = title || 'Information';
        }
        
        // Tạo toast element
        const toast = $(`
            <div class="toast ${type}">
                <div class="toast-icon">${icon}</div>
                <div class="toast-content">
                    <div class="toast-title">${title}</div>
                    <div class="toast-message">${message}</div>
                </div>
                <button class="toast-close">&times;</button>
            </div>
        `);
        
        // Thêm vào container
        $('.toast-container').append(toast);
        
        // Hiển thị toast với animation
        setTimeout(() => {
            toast.addClass('show');
            
            // Tự động xóa sau 4 giây
            setTimeout(() => {
                toast.removeClass('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 4000);
        }, 10);
        
        // Xử lý sự kiện đóng toast
        toast.find('.toast-close').on('click', function() {
            toast.removeClass('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
    }

    // Xử lý khi chọn delivery type
    $('input[name="delivery"]').change(function() {
        selectedDelivery = $(this).val();
        updatePaymentOptions();
        
        // Thay vì gọi hideMessageAndForms(), chỉ ẩn thông báo
        hideMessage();
        
        // Hiển thị form địa chỉ giao hàng nếu chọn delivery
        if (selectedDelivery === 'delivery') {
            $('#deliveryAddressForm').removeClass('hidden');
        } else {
            $('#deliveryAddressForm').addClass('hidden');
        }
        
        // Nếu đã chọn phương thức thanh toán trước đó, hiển thị lại form tương ứng
        if (selectedPayment) {
            showPaymentForm();
        }
    });

    // Xử lý khi chọn payment method
    $('input[name="payment"]').change(function() {
        selectedPayment = $(this).val();
        showPaymentForm();
        hideMessage();
    });

    // Cập nhật payment options dựa trên delivery type
    function updatePaymentOptions() {
        if (selectedDelivery === 'delivery') {
            $('input[value="cash"]').prop('disabled', true)
                .closest('.option-item').addClass('disabled');
                
            // Hiển thị thông báo nếu đang chọn cash
            if ($('input[value="cash"]').is(':checked')) {
                $('input[value="cash"]').prop('checked', false);
                $('#vnpayQRCode, #cardPaymentForm').addClass('hidden');
                showToast("Cash payment is not available for delivery orders. Please select another payment method.", "warning");
            }
        } else {
            $('input[value="cash"]').prop('disabled', false)
                .closest('.option-item').removeClass('disabled');
        }
    }

    // Hiển thị form thanh toán tương ứng
    function showPaymentForm() {
        // Xử lý hiển thị form thanh toán dựa trên selectedPayment
        // Ẩn tất cả các form thanh toán
        $('#vnpayQRCode, #cardPaymentForm, #cashPaymentMessage').addClass('hidden');
        
        // Hiển thị form tương ứng
        if (selectedPayment === 'vnpay') {
            $('#vnpayQRCode').removeClass('hidden');
        } else if (selectedPayment === 'card') {
            $('#cardPaymentForm').removeClass('hidden');
        } else if (selectedPayment === 'cash') {
            $('#cashPaymentMessage').removeClass('hidden');
            
            // Hiển thị thông báo phù hợp với loại giao hàng
            if (selectedDelivery && messages[selectedDelivery] && messages[selectedDelivery]['cash']) {
                $('#cashPaymentMessage h3').text(messages[selectedDelivery]['cash']);
            } else {
                $('#cashPaymentMessage h3').text('The staff will arrive in a few minutes, please wait.');
            }
        }
    }

    // Xử lý nút checkout
    $('#checkoutBtn').click(function() {
        if (!selectedDelivery) {
            showToast("Please select a delivery method", "warning");
            return;
        }
        
        if (!selectedPayment) {
            showToast("Please select a payment method", "warning");
            return;
        }
        
        // Kiểm tra trường hợp không hợp lệ: delivery + cash
        if (selectedDelivery === 'delivery' && selectedPayment === 'cash') {
            showToast("Cash payment is not available for delivery orders. Please select another payment method.", "error");
            return;
        }
        
        // Hiển thị thông báo thành công
        $('#messageBox').removeClass('hidden error').addClass('success')
            .html(`
                <i class="fas fa-check-circle"></i>
                <h3>Order Successful!</h3>
                <p>Thank you for your order. We will process it immediately.</p>
            `);
        
        // Hiển thị toast thông báo
        showToast("Your order has been placed successfully!", "success", "Order Confirmed");
        
        // Xóa giỏ hàng sau khi đặt hàng thành công
        localStorage.removeItem('cart');
        
        // Ẩn nút thanh toán và form thanh toán
        $(this).hide();
        $('#vnpayQRCode, #cardPaymentForm').addClass('hidden');
        
        // Sau 5 giây, chuyển về trang chủ
        setTimeout(function() {
            window.location.href = '../index.html';
        }, 5000);
    });

    // Hiển thị message
    function showMessage(message) {
        const $messageBox = $('#messageBox');
        $messageBox.html(message).removeClass('hidden');
    }

    // Ẩn message
    function hideMessage() {
        $('#messageBox').addClass('hidden');
    }

    // Ẩn cả message và form
    function hideMessageAndForms() {
        hideMessage();
        $('#vnpayQRCode, #cardPaymentForm, #cashPaymentMessage').addClass('hidden');
    }

    // Load order items (demo data)
    function loadOrderItems() {
        const orderItems = [
            {
                name: 'Lorem ipsum',
                description: 'Lorem ipsum dolor sit amet consectetur.',
                price: '$14',
                image: '../images/dish1.jpg'
            },
            // Thêm các món khác nếu cần
        ];

        const $orderItems = $('.order-items');
        orderItems.forEach(item => {
            $orderItems.append(`
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                    <div class="item-price">${item.price}</div>
                </div>
            `);
        });
    }

    // Load order items khi trang được tải
    loadOrderItems();

    // Lấy dữ liệu giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Kiểm tra xem giỏ hàng có trống không
    if (cart.length === 0) {
        $('.order-items').html('<p class="empty-cart">Your cart is empty</p>');
        $('.order-total').hide();
        $('#checkoutBtn').prop('disabled', true).text('CART EMPTY');
        showToast("Your shopping cart is empty. Please add items before checkout.", "info");
        return;
    }
    
    // Hiển thị các món ăn trong giỏ hàng
    renderCartItems();
    
    // Xử lý sự kiện tăng số lượng
    $(document).on('click', '.quantity-btn.plus', function() {
        const index = $(this).data('index');
        cart[index].quantity++;
        updateCartItem(index);
    });
    
    // Xử lý sự kiện giảm số lượng
    $(document).on('click', '.quantity-btn.minus', function() {
        const index = $(this).data('index');
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            updateCartItem(index);
        } else {
            showToast("Minimum quantity is 1", "warning");
        }
    });
    
    // Xử lý sự kiện xóa món ăn
    $(document).on('click', '.remove-item', function() {
        const index = $(this).data('index');
        const itemName = cart[index].name;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Kiểm tra nếu giỏ hàng trống sau khi xóa
        if (cart.length === 0) {
            $('.order-items').html('<p class="empty-cart">Your cart is empty</p>');
            $('.order-total').hide();
            $('#checkoutBtn').prop('disabled', true).text('CART EMPTY');
            showToast("All items have been removed from your cart", "info");
        } else {
            renderCartItems();
            showToast(`"${itemName}" has been removed from your cart`, "success");
        }
    });
    
    // Hàm render danh sách món ăn trong giỏ hàng
    function renderCartItems() {
        let orderItemsHTML = '';
        let subTotal = 0;
        
        cart.forEach((item, index) => {
            // Xử lý giá tiền
            let priceValue = 0;
            
            if (item.price.includes('$')) {
                priceValue = parseFloat(item.price.replace('$', '')) * item.quantity;
            } else if (item.price.includes('đ')) {
                priceValue = parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity / 25000; // Chuyển đổi VND sang USD
            }
            
            subTotal += priceValue;
            
            // Cắt ngắn mô tả nếu quá dài
            const shortDescription = item.description.length > 60 ? 
                item.description.substring(0, 60) + '...' : 
                item.description;
            
            // Tạo HTML cho mỗi món ăn với thiết kế mới
            orderItemsHTML += `
                <div class="order-item">
                    <div class="item-image-container">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-content">
                        <div class="item-header">
                            <h3>${item.name}</h3>
                            <span class="item-price">$${(priceValue).toFixed(2)}</span>
                        </div>
                        <p>${shortDescription}</p>
                        <div class="item-footer">
                            <div class="quantity-control">
                                <button class="quantity-btn minus" data-index="${index}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn plus" data-index="${index}">+</button>
                            </div>
                            <button class="remove-item" data-index="${index}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // Cập nhật DOM
        $('.order-items').html(orderItemsHTML);
        
        // Cập nhật tổng tiền
        $('.subtotal .amount').text('$' + subTotal.toFixed(2));
        $('.total .amount').text('$' + subTotal.toFixed(2));
    }
    
    // Hàm cập nhật một món ăn cụ thể
    function updateCartItem(index) {
        // Cập nhật số lượng hiển thị
        $(`.quantity-btn[data-index="${index}"]`).siblings('.quantity').text(cart[index].quantity);
        
        // Tính lại giá tiền của món ăn
        let priceValue = 0;
        
        if (cart[index].price.includes('$')) {
            priceValue = parseFloat(cart[index].price.replace('$', '')) * cart[index].quantity;
        } else if (cart[index].price.includes('đ')) {
            priceValue = parseFloat(cart[index].price.replace(/[^\d]/g, '')) * cart[index].quantity / 25000;
        }
        
        // Cập nhật giá hiển thị
        $(`.order-item:eq(${index}) .item-price`).text('$' + priceValue.toFixed(2));
        
        // Tính lại tổng tiền
        let subTotal = 0;
        
        cart.forEach(item => {
            if (item.price.includes('$')) {
                subTotal += parseFloat(item.price.replace('$', '')) * item.quantity;
            } else if (item.price.includes('đ')) {
                subTotal += parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity / 25000;
            }
        });
        
        // Cập nhật tổng tiền hiển thị
        $('.subtotal .amount').text('$' + subTotal.toFixed(2));
        $('.total .amount').text('$' + subTotal.toFixed(2));
        
        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Thêm CSS cho option-item disabled
    $('<style>')
        .text(`
            .option-item.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .option-item.disabled:hover {
                background-color: #f8f8f8;
            }
        `)
        .appendTo('head');

    // Thêm xử lý cho nút Continue trong form thanh toán
    $(document).on('click', '.continue-btn', function() {
        // Kiểm tra form hợp lệ
        let isValid = true;
        
        // Kiểm tra các trường bắt buộc
        $('#cardPaymentForm input, #cardPaymentForm select').each(function() {
            if ($(this).prop('required') && !$(this).val()) {
                isValid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
        
        if (!isValid) {
            showToast("Please fill in all required fields", "warning");
            return;
        }
        
        // Xử lý thanh toán
        $('#checkoutBtn').click();
    });

    // Xử lý khi người dùng chọn "Remember Me"
    $('#rememberMe').change(function() {
        if ($(this).is(':checked')) {
            // Lưu thông tin thanh toán vào localStorage hoặc Cookie
            // Chỉ để demo, trong thực tế không nên lưu thông tin thẻ trong localStorage
            showToast("Payment information will be remembered for future use", "info");
        }
    });

    // Xử lý khi thay đổi loại thẻ
    $('#cardType').change(function() {
        const cardType = $(this).val();
        
        // Ẩn tất cả các form thanh toán thẻ
        $('.card-specific-form').addClass('hidden');
        
        // Hiển thị form tương ứng với loại thẻ
        if (cardType) {
            $(`#${cardType}Form`).removeClass('hidden');
        }
    });
});