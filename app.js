const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/'

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector('button')
const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
const msg = document.querySelector('.msg')

window.addEventListener('load', () => {
    updateCurrRate()
})
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement('option')
        newOption.innerText = currCode
        newOption.value = currCode;
        if (select.name === 'form' && currCode === 'USD') {
            newOption.selected = 'selected'
        }
        else if (select.name === 'to' && currCode === 'INR') {
            newOption.selected = 'selected'
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateFlage(evt.target);
    })
}
let updateFlage = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img')
    img.src = newSrc
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    btn.innerText = 'Loading...'
    updateCurrRate()
})
let updateCurrRate = async () => {
    let amount = document.querySelector('.amount input')
    let amtVal = amount.value
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1
        amount.value = 1
    }
    console.log(fromCurr.value, toCurr.value);
    const URl = `${BASE_URL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URl)
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmonut = amount.value * rate
    console.log(finalAmonut);
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmonut} ${toCurr.value}`
    btn.innerText = 'get exchange rate'
}
