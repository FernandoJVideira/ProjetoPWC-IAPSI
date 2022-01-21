'use strict'

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString); 
var coinId = urlParams.get("id");

var currency;
var currencySymbol;
var language
currency = "eur";
language = "en";
currencySymbol = "€"

console.log(coinId);

function showDetails()
{
    $.ajax({
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/${coinId}`
    }).done(function (res) {
        console.log(coinId);
        //console.log(currencySymbol);

            $('.coinImg').attr('src', res.image.large)
            $('.rank').text(res.market_cap_rank)
            $('.nome').text(res.localization[language] + " (" + res.symbol.toUpperCase() + ")")
            $('.valor').text(res.market_data.current_price[currency] + " " + currencySymbol)
            $('.mudanca24h').text(res.market_data.price_change_percentage_24h.toFixed(2) + "%")
            $('.description').html(res.description[language])

        //$('.like-btn', rowClone).attr('id', result.id).attr('onclick', 'favoritos(this)');


    })
}

window.onload = showDetails

$('#currencylist li').on('click', function () {
    console.log($(this).text());
    currencySymbol = $(this).text();

    switch (currencySymbol) {
        case '€':
            currency = 'eur';
            break;

        case '$':
            currency = 'usd';
            break;
        case '£':
            currency = 'gbp';
            break;
        case '¥':
            currency = 'jpy';
            break;
    }
    showDetails();
}) 

$('#languagelist li').on('click', function () {
    console.log($(this).text());
    language = $(this).text();

    switch (language) {
        case 'English':
            language = 'en';
            break;

        case 'Korean':
            language = 'ko';
            break;
    }
    showDetails();
}) 