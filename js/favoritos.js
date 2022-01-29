'use strict'

var fvt = JSON.parse(localStorage.getItem('fvt'));
var cloneRow = $("#row").clone();
var currency;
var currencySymbol;
currency = "eur";
currencySymbol = "€"
var ids = fvt.join();
$('#row').hide();

$('#search').on("change", verifyIfEmpty);

if (!fvt) {
    var fvtArr = [];

    localStorage.setItem('fvt', JSON.stringify(fvtArr));
}


function apiCall() {
    $('.clone').remove();
    if (ids == "") {
        $('#erro').show();
    } else {
        $('#erro').hide();
        $.ajax({
            method: "GET",
            url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        }).done(function (res) {

            $.each(res, function (index, result) {


                $('#row').hide();
                var rowClone = cloneRow.clone().addClass("clone");
                if (fvt.indexOf(result.id) > -1) {

                    $('.redirect', rowClone).attr('onclick', `redirect('${result.id}')`)
                    $('.rank', rowClone).text(result.market_cap_rank)
                    $('.nome', rowClone).text(result.name + " (" + result.symbol.toUpperCase() + ")")
                    $('.symbol', rowClone).attr('src', result.image)
                    $('.price', rowClone).text(result.current_price + " " + currencySymbol)
                    $('.marketcap', rowClone).text(result.market_cap + currencySymbol)
                    $('.variation', rowClone).text(result.price_change_percentage_24h.toFixed(2) + "%")
                    $('.volume24h', rowClone).text(result.circulating_supply + " (" + result.symbol.toUpperCase() + ")")

                    $('.like-btn', rowClone).attr('id', result.id).attr('onclick', 'favoritos(this)').addClass("favoritos");

                    $('#table').append(rowClone);

                    var variation = $('.variation', rowClone).text()

                    if (variation.match("^-")) {
                        $(".variation", rowClone).css("color", "red");
                        $(".variation", rowClone).prepend("🡻 ");
                    } else {
                        $(".variation", rowClone).css("color", "green");
                        $(".variation", rowClone).prepend("🡹 ");
                    }
                }
            })
        })
    }

}

$('#currencylist li').on('click', function () {

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

$('#btnSearch').on('click', function redirectIndex() {
    
    var valTosearch = $('#search').val().toLowerCase();

    search = localStorage.setItem("search", valTosearch);
    console.log(search);
    window.location.href = "index.html";
})

window.onload = apiCall

function redirect(idCoin) {
    window.location.href = "detalhes.html?id=" + idCoin;
}

function verifyIfEmpty() {
    if ($('#table #row > :visible').length == 8) {
        if ($('#search').val().length == 0) {
            apiCall();
        }
    }
}

function favoritos(moeda) {
    $(moeda).toggleClass("favoritos")

    fvt.splice(fvt.indexOf($(moeda).attr("id")), 1)
    $(moeda).parents()[1].remove();
    localStorage.setItem('fvt', JSON.stringify(fvt));

    if (fvt.join() == "")
    {
        $('#erro').show();
    }
}

$("#top10").on("click", function () {
    $('.clone').hide();
    for (let i = 0; i < 10; i++) {
        $('.clone').eq(i).show();
    }
})

$("#top50").on("click", function () {
    $('.clone').hide();
    for (let i = 0; i < 50; i++) {
        $('.clone').eq(i).show();
    }
})

$("#top100").on("click", function () {
    $('.clone').hide();
    for (let i = 0; i < 100; i++) {
        $('.clone').eq(i).show();
    }
})