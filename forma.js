document.addEventListener("DOMContentLoaded", function() {
    const open = document.getElementById("open");
    const popup = document.getElementById("popup");
    const popupOverlay = document.getElementById("popupOverlay");
    const closePopup = document.getElementById("closePopup");
    const forma = document.getElementById("forma");
    const otvet = document.getElementById("otvet");
    const url = "https://formcarry.com/s/sDsFWwV75oB";

    const openPopup = function() {
        popup.style.display = "flex";
        document.body.style.overflow = "hidden";
        history.pushState({ form: "open" }, "", "?form=open");
    };

    const closePopupHandler = function() {
        popup.style.display = "none";
        document.body.style.overflow = "";
        history.replaceState({}, "", window.location.pathname);
    };

    const params = new URLSearchParams(window.location.search);
    if (params.get("form") === "open") {
        openPopup();
    }

    open.addEventListener("click", openPopup);
    closePopup.addEventListener("click", closePopupHandler);
    popupOverlay.addEventListener("click", closePopupHandler);

    window.addEventListener("popstate", function(event) {
        if (!event.state || !event.state.form) {
            closePopupHandler();
        }
    });

    forma.addEventListener("submit", function(e) {
        e.preventDefault();
        otvet.textContent = "";
        const formData = new FormData(forma);
        fetch(url, {
            body: formData,
            method: "POST"
        })
        .then((response) => response.json())
        .then(function(data) {
            if (data.success) {
                otvet.textContent = "Спасибо за ваше сообщение!";
                otvet.style.color = "green";
                forma.reset();
            } else {
                otvet.textContent = "Что-то пошло не так. Попробуйте позже.";
                otvet.style.color = "red";
            }
        })
        .catch(function(error){
            otvet.textContent = "Ошибка отправки. Попробуйте позже.";
            otvet.style.color = "red";
        });
    });
});
