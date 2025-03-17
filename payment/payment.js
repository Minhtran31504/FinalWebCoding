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

    // Xử lý khi chọn delivery type
    $('input[name="delivery"]').change(function() {
        selectedDelivery = $(this).val();
        updatePaymentOptions();
        hideMessageAndForms();
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
                .closest('.payment-option').addClass('disabled');
        } else {
            $('input[value="cash"]').prop('disabled', false)
                .closest('.payment-option').removeClass('disabled');
        }
    }

    // Hiển thị form thanh toán tương ứng
    function showPaymentForm() {
        const $paymentForm = $('#paymentForm');
        $paymentForm.empty().removeClass('hidden');

        if (selectedPayment === 'card') {
            $paymentForm.html(`
                <h3>Payment Information</h3>
                <div class="card-form">
                    <div class="form-group">
                        <label>Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Expiration Date</label>
                            <input type="text" placeholder="MM/YY">
                        </div>
                        <div class="form-group">
                            <label>Security Code</label>
                            <input type="text" placeholder="CVV">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Card Holder Name</label>
                        <input type="text" placeholder="Name on card">
                    </div>
                </div>
            `);
        } else if (selectedPayment === 'vnpay') {
            $paymentForm.html(`
                <div class="qr-code">
                    <img src="../images/vnpay-qr.png" alt="VN Pay QR Code">
                    <p>Scan QR code to pay</p>
                </div>
            `);
        }
    }

    // Xử lý nút checkout
    $('#checkoutBtn').click(function() {
        if (!selectedDelivery || !selectedPayment) {
            alert('Please select delivery type and payment method');
            return;
        }

        if (selectedDelivery === 'delivery' && selectedPayment === 'cash') {
            showMessage("Takeout orders do not accept cash payments. Please make your payment in advance.");
            return;
        }

        const message = messages[selectedDelivery][selectedPayment];
        if (message) {
            showMessage(message);
        }
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
        $('#paymentForm').addClass('hidden');
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
});