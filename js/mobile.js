document.addEventListener('DOMContentLoaded', function() {

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileMenuLines = document.querySelectorAll('.mobile-menu-line');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            // Переключение видимости меню
            mobileNav.classList.toggle('active');

            // Анимация гамбургера в "крестик"
            mobileMenuLines.forEach((line, index) => {
                if (index === 0) line.style.transform = mobileNav.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
                if (index === 1) line.style.opacity = mobileNav.classList.contains('active') ? '0' : '1';
                if (index === 2) line.style.transform = mobileNav.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : '';
            });
        });
    }

    const mobileLanguageCurrent = document.querySelector('.mobile-language-current');
    const mobileLanguageDropdown = document.querySelector('.mobile-language-dropdown');

    if (mobileLanguageCurrent && mobileLanguageDropdown) {
        mobileLanguageCurrent.addEventListener('click', function(e) {
            e.stopPropagation();
            this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
            mobileLanguageDropdown.classList.toggle('open');
        });

        // Закрытие при клике вне элемента
        document.addEventListener('click', function() {
            mobileLanguageDropdown.classList.remove('open');
            mobileLanguageCurrent.setAttribute('aria-expanded', 'false');
        });
    }

    // =============================================
    // FAQ-аккордеон (мобильная версия)
    // =============================================
    const mobileFaqToggles = document.querySelectorAll('.mobile-faq-toggle');

    mobileFaqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);

            // Анимация стрелки (если есть)
            const arrow = this.querySelector('.mobile-faq-arrow');
            if (arrow) {
                arrow.style.transform = !isExpanded ? 'rotate(180deg)' : 'rotate(0)';
            }

            // Показ/скрытие ответа
            const answer = this.closest('.mobile-faq-item').querySelector('.mobile-faq-answer');
            answer.style.maxHeight = !isExpanded ? answer.scrollHeight + 'px' : '0';
        });
    });

    // =============================================
    // Обработчик формы (мобильная версия)
    // =============================================
    const mobileContactForm = document.querySelector('.mobile-contact-form');

    if (mobileContactForm) {
        mobileContactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Валидация
            const inputs = this.querySelectorAll('.mobile-form-input');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                // Отправка данных (заглушка)
                console.log('Форма отправлена:', {
                    name: this.elements.name.value,
                    email: this.elements.email.value,
                    message: this.elements.message.value
                });

                // Сброс формы
                this.reset();
                alert('Сообщение отправлено!');
            }
        });
    }

    // =============================================
    // Плавная прокрутка для мобильных якорей
    // =============================================
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Закрываем меню после клика (если открыто)
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuLines.forEach(line => line.style = '');
                }

                // Плавная прокрутка
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);

    // Ленивая загрузка изображений
    if ('loading' in HTMLImageElement.prototype) {
        const mobileLazyImages = document.querySelectorAll('.mobile-service-img[data-src]');
        mobileLazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});