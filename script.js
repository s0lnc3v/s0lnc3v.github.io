const kolvo1 = document.getElementById("kolvo");
const productTypeInputs = document.getElementsByName("productType");
const optionsDiv = document.getElementById("optionsDiv");
const optionsSelect = document.getElementById("options");
const propertiesDiv = document.getElementById("propertiesDiv");
const waterproof = document.getElementById("waterproof");
const teploe = document.getElementById("teploe");
const pocket = document.getElementById("pocket");
const result = document.getElementById("totalPrice");

const prices = {
    coat: 15000,
    hoodie: 4700,
    sneakers: {
        basic: 3999,
        premium: 6799
    }
};

function delaem() {
    const selectedProductType = document.querySelector(
        "input[name='productType']:checked"
    ).value;
    if (selectedProductType === "hoodie") {
        optionsDiv.classList.add("hidden");
        propertiesDiv.classList.add("hidden");
    } else if (selectedProductType === "sneakers") {
        optionsDiv.classList.remove("hidden");
        propertiesDiv.classList.add("hidden");
    } else if (selectedProductType === "coat") {
        optionsDiv.classList.add("hidden");
        propertiesDiv.classList.remove("hidden");
    }
}

function calculator() {
    const selectedProductType = document.querySelector(
        "input[name='productType']:checked"
    ).value;
    const kolvo = kolvo1.value.trim();

    if (Number.isNaN(Number(kolvo)) || kolvo <= 0) {
        result.textContent = "Число товаров указано неверно";
        return;
    }

    let basePrice = 0;

    if (selectedProductType === "hoodie") {
        basePrice = prices.hoodie;
    } else if (selectedProductType === "sneakers") {
        basePrice = prices.sneakers[optionsSelect.value];
    } else if (selectedProductType === "coat") {
        basePrice = prices.coat;
        if (waterproof.checked) {
            basePrice += 1000;
        }
        if (teploe.checked) {
            basePrice += 3500;
        }
        if (pocket.checked) {
            basePrice += 650;
        }
    }

    const totalPrice = basePrice * kolvo;
    result.textContent = totalPrice;
}

productTypeInputs.forEach(function (input) {
    input.addEventListener("change", function () {
        delaem();
        calculator();
    });
});

kolvo1.addEventListener("input", calculator);
optionsSelect.addEventListener("change", calculator);
waterproof.addEventListener("change", calculator);
teploe.addEventListener("change", calculator);
pocket.addEventListener("change", calculator);

delaem();
calculator();
