$(document).ready(function () {
    document.querySelectorAll("a[href='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
        });
    });
    const menuButton = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav");
    const dropdownToggles = document.querySelectorAll(".has-dropdown > a");

    menuButton.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    dropdownToggles.forEach(function (toggle) {
        toggle.addEventListener("click", function (e) {
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

    const rew = document.querySelectorAll(".reviews_item");
    const leftArrow = document.querySelector(".reviews_arrow--left");
    const rightArrow = document.querySelector(".reviews_arrow--right");
    const index = document.querySelector(".reviews_index span:first-child");

    let curr = 0;
    function updateActiveReview(direction) {
        const currentItem = rew[curr];
        const nextReview =
            direction === "right"
                ? (curr + 1) % rew.length
                : (curr - 1 + rew.length) % rew.length;
        const nextItem = rew[nextReview];

        currentItem.classList.remove("active");
        currentItem.classList.add(
            direction === "right"
                ? "reviews_item--slide-left-out"
                : "reviews_item--slide-right-out"
        );

        nextItem.style.display = "flex";
        nextItem.classList.add(
            direction === "right"
                ? "reviews_item--slide-left-in"
                : "reviews_item--slide-right-in"
        );

        setTimeout(() => {
            currentItem.style.display = "none";
            currentItem.classList.remove(
                "reviews_item--slide-left-out",
                "reviews_item--slide-right-out"
            );

            nextItem.classList.remove(
                "reviews_item--slide-left-in",
                "reviews_item--slide-right-in"
            );
            nextItem.classList.add("active");
            curr = nextReview;

            index.textContent = String(curr + 1).padStart(2, "0");
        }, 100);
    }
    leftArrow.addEventListener("click", () => updateActiveReview("left"));
    rightArrow.addEventListener("click", () => updateActiveReview("right"));

    rew[curr].classList.add("active");
    rew[curr].style.display = "flex";


    $(".clients-gallery_row--autoplay").slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 500,
        infinite: true,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            },
        ],
    });
    $(".clients-gallery_row--static").slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        infinite: true,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            },
        ],
    });

    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const faqItem = question.closest(".faq-item");
            faqItem.classList.toggle("active");
        });
    });
    $("#form").submit(function(){
        var response = grecaptcha.getResponse();
        if(response.length == 0) {
            alert("Вы не прошли проверку CAPTCHA должным образом");
            return false;
        }
    });
    const forma = document.getElementById("forma");
    forma.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch(this.action, {
            method: this.method,
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Заявка успешно отправлена!");
                document.getElementById("supportForm").reset();
            } else {
                alert("Произошла ошибка при отправке заявки.");
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при отправке данных.");
        });
    });
});
