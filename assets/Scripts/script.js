const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const DropMenu = document.querySelectorAll(".dropdown select");
const Amount = document.querySelector(".amount input");
const MSG = document.querySelector(".msg");
const Button = document.querySelector(".btn");
const currencyFrom = document.querySelector(".from select");
const currencyTo = document.querySelector(".to select");

for (let select of DropMenu) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (e) => {
        Flag(e.target);
    });
};

const exchangeRate = async () => {
    let amtVal = Amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        Amount.value = "1";
    }

    // console.log(currencyFrom.value, currencyTo.value);
    const URL = `${BASE_URL}/${currencyFrom.value.toLowerCase()}/${currencyTo.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let Rate = data[currencyTo.value.toLowerCase()];
    let finalAmount = amtVal * Rate;
    let currencyFromSymbol = currencySymbols[currencyFrom.value];
    let currencyToSymbol = currencySymbols[currencyTo.value];

    MSG.innerText = `${amtVal} ${currencyFromSymbol} = ${finalAmount.toFixed(2)} ${currencyToSymbol}`;
};

const Flag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let IMG = element.parentElement.querySelector("img");
    IMG.src = newSrc;
};

Button.addEventListener("click", (e) => {
    e.preventDefault();
    exchangeRate();
});

window.addEventListener("load", () => {
    exchangeRate();
});