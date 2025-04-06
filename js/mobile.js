document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Фикс для iOS
    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
        document.querySelector('.mobile-header').style.position = 'sticky';
    }

    // Адаптация изображений
    function resizeImages() {
        document.querySelectorAll('img').forEach(img => {
            if (img.width > document.documentElement.clientWidth) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }

    window.addEventListener('resize', resizeImages);
    resizeImages();
});