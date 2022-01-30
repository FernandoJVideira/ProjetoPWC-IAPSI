'use strict'

var url = window.location.search;
var urlParams = new URLSearchParams(url);
var coinId = urlParams.get("id");

var fvt = JSON.parse(localStorage.getItem('fvt'));
var language
language = "en";


if (!fvt) {
    var fvtArr = [];

    localStorage.setItem('fvt', JSON.stringify(fvtArr));
}

function showDetails() {
    $.ajax({
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/${coinId}`
    }).done(function (res) {

        $('.coinImg').attr('src', res.image.large)
        $('.rank').text(res.market_cap_rank)
        $('.name').text(res.localization[language] + " (" + res.symbol.toUpperCase() + ")")
        $('.value').text(res.market_data.current_price[currency] + " " + currencySymbol)
        $('.variation24h').text(res.market_data.price_change_percentage_24h.toFixed(2) + "%")
        $('.description').html(res.description[language])

        $('.like-btn').attr('id', res.id).attr('onclick', 'favorites(this)');
        if (fvt.indexOf(res.id) > -1) {
            $('.like-btn').addClass("favorites");
        }
    })
}

showDetails();

$('#btnSearch').on('click', function redirectIndex() {
    
    var valTosearch = $('#search').val().toLowerCase();

    search = localStorage.setItem("search", valTosearch);
    window.location.href = "index.html";
})

function favorites(moeda) {
    $(moeda).toggleClass("favorites")
    if ($(moeda).hasClass("favorites")) {

        fvt.push($(moeda).attr("id"));
    } else {
        fvt.splice(fvt.indexOf($(moeda).attr("id")), 1)
    }
    localStorage.setItem('fvt', JSON.stringify(fvt));
    console.log(fvt)
}

$('#currencylist li').on('click', function () {

    currencySymbol = $(this).text();
    localStorage.setItem("currencySymbol", JSON.stringify($(this).text()));
    setCurrency();
    showDetails();
})

$('#languagelist li').on('click', function () {

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