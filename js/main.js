// Chức năng điều hướng
document.addEventListener('DOMContentLoaded', function() {
    // Chuyển đổi menu cho thiết bị di động
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Đóng menu khi nhấp vào liên kết điều hướng trên thiết bị di động
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Làm nổi bật liên kết điều hướng đang hoạt động khi cuộn
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });

        // Trường hợp đặc biệt cho phần trang chủ
        if (scrollPosition < 100) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#home') {
                    item.classList.add('active');
                }
            });
        }
    }

    // Thêm trình lắng nghe sự kiện cuộn
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Gọi khi tải trang
    highlightNavOnScroll();

    // Thêm nền thanh điều hướng khi cuộn
    const navbar = document.querySelector('.navbar');
    function navbarBg() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(44, 44, 44, 0.95)';
            navbar.style.padding = '0.7rem 0';
        } else {
            navbar.style.backgroundColor = 'rgba(44, 44, 44, 0.9)';
            navbar.style.padding = '1rem 0';
        }
    }

    window.addEventListener('scroll', navbarBg);
    navbarBg();

    // Thêm hoạt ảnh khi cuộn cho các phần tử
    function revealOnScroll() {
        const elements = document.querySelectorAll('.about-card, .feature-card, .contact-card');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Thêm kiểu ban đầu cho hoạt ảnh
    const animatedElements = document.querySelectorAll('.about-card, .feature-card, .contact-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    // Gọi một lần khi tải
    revealOnScroll();
});
