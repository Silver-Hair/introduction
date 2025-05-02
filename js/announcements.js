document.addEventListener('DOMContentLoaded', function() {
    // Tạo phần tử container thông báo
    createAnnouncementContainer();
    
    // Tải và hiển thị thông báo
    loadAnnouncements();
});

// Tạo container cho thông báo
function createAnnouncementContainer() {
    console.log('Bắt đầu tạo container thông báo...');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    
    console.log('header:', header ? 'đã tìm thấy' : 'không tìm thấy');
    console.log('main:', main ? 'đã tìm thấy' : 'không tìm thấy');
    
    // Tạo container
    const announcementContainer = document.createElement('div');
    announcementContainer.id = 'announcements-container';
    announcementContainer.className = 'announcements-container';
    
    // Chèn container vào DOM
    if (header && main) {
        console.log('Chèn container vào giữa header và main');
        document.body.insertBefore(announcementContainer, main);
    } else {
        console.log('Không tìm thấy header hoặc main, thêm vào đầu body');
        // Nếu không tìm thấy header hoặc main, thêm vào đầu body
        const firstChild = document.body.firstChild;
        document.body.insertBefore(announcementContainer, firstChild);
    }
    
    console.log('Container đã được tạo với ID:', announcementContainer.id);
}

// Tải thông báo từ JSON
function loadAnnouncements() {
    fetch('js/announcements.json')
        .then(response => response.json())
        .then(data => {
            displayAnnouncements(data.announcements);
        })
        .catch(error => {
            console.error('Lỗi khi tải thông báo:', error);
        });
}

// Hiển thị thông báo
function displayAnnouncements(announcements) {
    const container = document.getElementById('announcements-container');
    if (!container) {
        console.error('Container thông báo không tồn tại');
        return;
    }
    
    console.log('Đã tìm thấy container, tổng số thông báo:', announcements.length);
    
    // Lọc thông báo đang hoạt động
    const activeAnnouncements = announcements.filter(announcement => {
        const isActive = announcement.active && isAnnouncementInDateRange(announcement);
        console.log(`Thông báo ID ${announcement.id}: active=${announcement.active}, trong phạm vi ngày=${isAnnouncementInDateRange(announcement)}`);
        return isActive;
    });
    
    console.log('Số thông báo hiển thị:', activeAnnouncements.length);
    
    // Nếu không có thông báo nào, ẩn container
    if (activeAnnouncements.length === 0) {
        console.log('Không có thông báo nào để hiển thị');
        container.style.display = 'none';
        return;
    }
    
    // Hiển thị container
    container.style.display = 'block';
    
    // Tạo các phần tử thông báo
    container.innerHTML = `
        <div class="announcements-header">
            <h3><i class="fas fa-bullhorn"></i> Thông Báo</h3>
            <button id="announcements-toggle-btn"><i class="fas fa-chevron-up"></i></button>
        </div>
        <div class="announcements-content">
            <div class="announcements-list">
                ${activeAnnouncements.map(announcement => createAnnouncementHTML(announcement)).join('')}
            </div>
        </div>
    `;
    
    // Thêm sự kiện cho nút đóng/mở
    const toggleBtn = document.getElementById('announcements-toggle-btn');
    const content = container.querySelector('.announcements-content');
    
    if (toggleBtn && content) {
        toggleBtn.addEventListener('click', function() {
            const isExpanded = content.style.maxHeight !== '0px';
            
            if (isExpanded) {
                content.style.maxHeight = '0px';
                toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            }
        });
    }
    
    // Thêm sự kiện đóng cho từng thông báo
    const closeBtns = container.querySelectorAll('.announcement-close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const announcementId = this.dataset.id;
            const announcement = this.closest('.announcement');
            
            if (announcement) {
                announcement.classList.add('announcement-hiding');
                setTimeout(() => {
                    announcement.remove();
                    
                    // Kiểm tra nếu không còn thông báo nào
                    const remainingAnnouncements = container.querySelectorAll('.announcement');
                    if (remainingAnnouncements.length === 0) {
                        container.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
}

// Tạo HTML cho một thông báo
function createAnnouncementHTML(announcement) {
    const typeIconClass = getAnnouncementTypeIcon(announcement.type);
    
    return `
        <div class="announcement" data-id="${announcement.id}" data-type="${announcement.type}">
            <div class="announcement-icon">
                <i class="${typeIconClass}"></i>
            </div>
            <div class="announcement-content">
                <h4>${announcement.title}</h4>
                <p>${announcement.content}</p>
            </div>
            <button class="announcement-close" data-id="${announcement.id}">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
}

// Lấy biểu tượng dựa trên loại thông báo
function getAnnouncementTypeIcon(type) {
    switch (type) {
        case 'event':
            return 'fas fa-calendar-alt';
        case 'maintenance':
            return 'fas fa-wrench';
        case 'update':
            return 'fas fa-sync-alt';
        case 'warning':
            return 'fas fa-exclamation-triangle';
        default:
            return 'fas fa-info-circle';
    }
}

// Kiểm tra xem thông báo có trong khoảng thời gian hiển thị
function isAnnouncementInDateRange(announcement) {
    const now = new Date();
    const startDate = announcement.startDate ? new Date(announcement.startDate) : new Date(0);
    const endDate = announcement.endDate ? new Date(announcement.endDate) : new Date(8640000000000000); // Max date
    
    return now >= startDate && now <= endDate;
}