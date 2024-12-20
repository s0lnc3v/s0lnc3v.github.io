document.addEventListener('DOMContentLoaded', function() {
    $('.clients-gallery__slider').slick({
        slidesToShow: 6,     // показывать 6 изображений в ряду
        slidesToScroll: 6,   // прокручивать 6 изображений
        infinite: false,     // бесконечное прокручивание
        autoplay: true,       // включить автопрокрутку
        autoplaySpeed: 2000,  // скорость автопрокрутки (2 секунды)
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3, // на маленьких экранах показывать 3 изображения
                    slidesToScroll: 3,
                }
            }
        ]
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav");
    const dropdownToggles = document.querySelectorAll(".has-dropdown > a");

    // Переключение основного меню
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Переключение мини-меню
    dropdownToggles.forEach((toggle) => {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            const parentLi = toggle.parentElement;
            const dropdownMenu = parentLi.querySelector(".dropdown");

            if (parentLi.classList.contains("active")) {
                parentLi.classList.remove("active");
                dropdownMenu.style.display = "none";
            } else {
                parentLi.classList.add("active");
                dropdownMenu.style.display = "block";
            }
        });
    });
});


// Переключение меню для мобильных устройств

const reviewsItems = document.querySelectorAll('.reviews__item');
const leftArrow = document.querySelector('.reviews__arrow--left');
const rightArrow = document.querySelector('.reviews__arrow--right');
const indexSpan = document.querySelector('.reviews__index span:first-child');

let currentReview = 0;
document.querySelectorAll('a[href="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Предотвращаем стандартное поведение ссылки
    });
});

// Функция для переключения отзывов
function updateActiveReview(direction) {
    const currentItem = reviewsItems[currentReview];
    const nextReview =
        direction === 'right'
            ? (currentReview + 1) % reviewsItems.length
            : (currentReview - 1 + reviewsItems.length) % reviewsItems.length;
    const nextItem = reviewsItems[nextReview];

    // Убираем активный отзыв
    currentItem.classList.remove('active');
    currentItem.classList.add(
        direction === 'right'
            ? 'reviews__item--slide-left-out'
            : 'reviews__item--slide-right-out'
    );

    // Показываем следующий отзыв
    nextItem.style.display = 'flex';
    nextItem.classList.add(
        direction === 'right'
            ? 'reviews__item--slide-left-in'
            : 'reviews__item--slide-right-in'
    );

    // Завершаем анимацию
    setTimeout(() => {
        currentItem.style.display = 'none';
        currentItem.classList.remove(
            'reviews__item--slide-left-out',
            'reviews__item--slide-right-out'
        );

        nextItem.classList.remove(
            'reviews__item--slide-left-in',
            'reviews__item--slide-right-in'
        );
        nextItem.classList.add('active');
        currentReview = nextReview;

        // Обновляем номер отзыва
        indexSpan.textContent = String(currentReview + 1).padStart(2, '0');
    }, 100); // Задержка равна длительности анимации
}

// Обработчики стрелок
leftArrow.addEventListener('click', () => updateActiveReview('left'));
rightArrow.addEventListener('click', () => updateActiveReview('right'));

// Инициализация
reviewsItems[currentReview].classList.add('active');
reviewsItems[currentReview].style.display = 'flex';

