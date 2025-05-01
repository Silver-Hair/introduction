// Khởi tạo SimpleLight box cho thư viện ảnh
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo SimpleLightbox cho ảnh Minecraft từ máy chủ Silver Hair
    new SimpleLightbox('.gallery-item', {
        captionsData: 'caption',
        captionDelay: 250,
        animationSpeed: 250,
        fadeSpeed: 300,
        navText: ['←', '→'],
        alertError: 'Không thể tải hình ảnh',
        alertErrorMessage: 'Xin lỗi, đã xảy ra lỗi khi tải hình ảnh.',
        // Hiển thị hình ảnh với kích thước gốc
        maxWidth: 2000,
        maxHeight: 2000
    });

    // Thêm hiệu ứng hover cho các mục thư viện
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        // Thêm loading="lazy" cho hình ảnh thư viện nếu chưa được thiết lập
        const img = item.querySelector('img');
        if (img && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});
