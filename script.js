const converterForm = document.getElementById("convertor-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const resultCont = document.getElementsByClassName("result-container")[0];


window.addEventListener("load",fetchCurrencies);

converterForm.addEventListener("submit",convertCurrency);

async function fetchCurrencies(){
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
    const data = await response.json();

    const currencyOptions = Object.keys(data.rates);

    currencyOptions.forEach((currency) => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });

}

async function convertCurrency(e){
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    if (amount < 0){
        alert("Please enter a valid amount");
        return;
    }
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
    const data = await response.json();

    const rate = data.rates[toCurrencyValue];
    const convertedAmount = (amount * rate).toFixed(2);

    resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
    resultCont.style.display="block";
}
