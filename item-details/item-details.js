$(document).ready(function() {
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
    $('.quantity-input').on('input change', function() {
        let quantity = parseInt($(this).val()) || 1;
        if (quantity < 1) quantity = 1;
        $(this).val(quantity);
        updateTotalPrice();
    });
    
    // Xử lý nút yêu thích
    $('.favorite-btn').click(function() {
        $(this).find('i').toggleClass('far fas');
    });
    
    // Xử lý nút đặt hàng
    $('.order-btn').click(function() {
        const quantity = parseInt($('.quantity-input').val());
        const itemName = $('#item-name').text();
        
        // Hiển thị thông báo đặt hàng thành công
        if (itemData && itemData.language === 'vi') {
            alert(`Đã thêm ${quantity} ${itemName} vào giỏ hàng của bạn!`);
        } else {
            alert(`Added ${quantity} ${itemName} to your cart!`);
        }
    });
    
    // Xử lý nút chia sẻ
    $('.share-btn').click(function() {
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
    for(let i = 0; i < fullStars; i++) {
        starsHtml += '★';
    }
    for(let i = 0; i < emptyStars; i++) {
        starsHtml += '☆';
    }
    $('.stars').html(starsHtml);
    
    // Cập nhật ngôn ngữ nút đặt hàng nếu cần
    if (item.language === 'vi') {
        $('.order-btn').text('ĐẶT NGAY');
        $('.back-button a').html('<i class="fas fa-arrow-left"></i> Quay lại Menu');
        $('.bon-appetit').text('Chúc ngon miệng!');
    } else {
        $('.order-btn').text('ORDER NOW');
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
    $('.minus-btn').on('click', function() {
        let quantity = parseInt($('.quantity-input').val());
        if (quantity > 1) {
            quantity -= 1;
            $('.quantity-input').val(quantity);
            updateTotalPrice();
        }
        console.log("Giảm số lượng: " + quantity);
    });
    
    // Thiết lập lại event handler cho nút tăng
    $('.plus-btn').on('click', function() {
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