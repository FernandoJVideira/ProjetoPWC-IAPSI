'use strict'

var cloneRow = $("#row").clone();
var currency;
var currencySymbol;
currency = "eur";
currencySymbol = "€"

function apiCall() {
    $('.clone').remove();
    $.ajax({
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    }).done(function (res) {
        //console.log(res);
        //console.log(currencySymbol);
        $.each(res, function (index, result) {


            $('#row').hide();
            var rowClone = cloneRow.clone().addClass("clone");

            //$('td', rowClone).attr('onclick', redirect(result.id))
            $('.rank', rowClone).text(result.market_cap_rank)
            $('.nome', rowClone).text(result.name + " (" + result.symbol.toUpperCase() + ")")
            $('.symbol', rowClone).attr('src', result.image)
            $('.price', rowClone).text(result.current_price + " " + currencySymbol)
            $('.marketcap', rowClone).text(result.market_cap + currencySymbol)
            $('.variation', rowClone).text(result.price_change_percentage_24h.toFixed(2) + "%")
            $('.volume24h', rowClone).text(result.circulating_supply + " (" + result.symbol.toUpperCase() +")")

            $('.like-btn', rowClone).attr('id', result.id).attr('onclick', 'favoritos(this)');

            $('#table').append(rowClone);

            var variation = $('.variation', rowClone).text()

            if (variation.match("^-")) {
                $(".variation", rowClone).css("color", "red");
            }
            else {
                $(".variation", rowClone).css("color", "green");
            }
        })
    })
}

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
    apiCall();
})

window.onload = apiCall

function favoritos(moeda) {
    $(moeda).toggleClass("favoritos")
}

$("#top10").on("click",function()
{
    $('.clone').hide();
    for(let i = 0; i < 10; i++)
    {
        console.log($('.clone')[i]);
        $('.clone').eq(i).show();
    }
})

$("#top50").on("click",function()
{
    $('.clone').hide();
    for(let i = 0; i < 50; i++)
    {
        console.log($('.clone')[i]);
        $('.clone').eq(i).show();
    }
})

$("#top100").on("click",function()
{
    $('.clone').hide();
    for(let i = 0; i < 100; i++)
    {
        console.log($('.clone')[i]);
        $('.clone').eq(i).show();
    }
})

