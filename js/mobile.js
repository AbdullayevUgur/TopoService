document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const headerRight = document.querySelector('.header-right');

    if (hamburger && headerRight) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            headerRight.classList.toggle('active');

            // Блокировка скролла при открытом меню
            if (headerRight.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && headerRight) {
                hamburger.classList.remove('active');
                headerRight.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Переключатель языка
    const languageSwitcher = document.querySelector('.language-switcher');
    const languageCurrent = document.querySelector('.language-current');
    const languageOptions = document.querySelectorAll('.language-option');

    if (languageCurrent) {
        languageCurrent.addEventListener('click', function(e) {
            e.stopPropagation();
            languageSwitcher.classList.toggle('active');
        });
    }

    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            document.querySelector('.language-current span').textContent = lang.toUpperCase();
            languageSwitcher.classList.remove('active');

            // Здесь будет логика смены языка
            console.log('Language changed to:', lang);
            // applyTranslations(lang); // Раскомментируйте при подключении системы переводов
        });
    });

    // Закрытие при клике вне элемента
    document.addEventListener('click', function(e) {
        if (languageSwitcher && !languageSwitcher.contains(e.target)) {
            languageSwitcher.classList.remove('active');
        }
    });

    // Фикс для iOS
    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
        const header = document.querySelector('.header');
        if (header) {
            header.style.position = 'sticky';
        }
    }

    // Адаптивные изображения
    function handleImages() {
        document.querySelectorAll('img').forEach(img => {
            if (img.width > document.documentElement.clientWidth) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }

    window.addEventListener('resize', handleImages);
    handleImages();

    // Оптимизация для touch-устройств
    document.querySelectorAll('button, a').forEach(el => {
        el.style.minWidth = '44px';
        el.style.minHeight = '44px';
    });
});