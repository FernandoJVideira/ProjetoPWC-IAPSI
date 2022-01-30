'use strict'

var search = localStorage.getItem("search");
var currencySymbol = JSON.parse(localStorage.getItem("currencySymbol"));
var currency;

if(!search)
{
    search = "";
}

if (!currencySymbol)
{
    localStorage.setItem("currencySymbol", "€")
    currencySymbol = "€"
}

setCurrency();

function setCurrency(){
   

    switch (currencySymbol) {

        case "€":
            currency = "eur";
            break;
        case "$":
            currency = "usd";
            break;
        case "£":
            currency = "gbp";
            break;
        case "¥":
            currency = "jpy";
            break;
    }
}


