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
            //console.log(res);
            //console.log(currencySymbol);
            $.each(res, function (index, result) {


                $('#row').hide();
                var rowClone = cloneRow.clone().addClass("clone");
                if (fvt.indexOf(result.id) > -1) {

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

$('#btnSearch').on('click', function searchFunction() {
    var valTosearch = $('#search').val().toLowerCase();

    $.ajax({
        type: 'GET',
        datatype: 'json',
        url: "https://api.coingecko.com/api/v3/coins/" + valTosearch,
    }).done(function (result) {

        //console.log(result);

        $('.clone').hide();
        $('#row').show();

        $('.redirect').attr('onclick', `redirect('${result.id}')`)
        $('.rank').text(result.market_cap_rank)
        $('.nome').text(result.name + " (" + result.symbol.toUpperCase() + ")")
        $('.symbol').attr('src', result.image.small)
        $('.price').text(currencySymbol + " " + result.market_data.current_price[currency])
        $('.marketcap').text(result.market_data.market_cap[currency])
        $('.variation').text(result.market_data.price_change_percentage_24h.toFixed(2))
        $('.volume24h').text(result.market_data.circulating_supply)

        $('.like-btn').attr('id', result.id).attr('onclick', 'favoritos(this)');

        var variation = $('.variation').text()

        if (variation.match("^-")) {
            $(".variation").css("color", "red");
            $(".variation").prepend("🡻 ");
        } else {
            $(".variation").css("color", "green");
            $(".variation").prepend("🡹 ");
        }
    })
})

window.onload = apiCall

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
    console.log($(moeda).parents())
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
        console.log($('.clone')[i]);
        $('.clone').eq(i).show();
    }
})

$("#top50").on("click", function () {
    $('.clone').hide();
    for (let i = 0; i < 50; i++) {
        console.log($('.clone')[i]);
        $('.clone').eq(i).show();
    }
})

$("#top100").on("click", function () {
    $('.clone').hide();
    for (let i = 0; i < 100; i++) {
        console.log($('.clone')[i]);
        $('.clone').eq(i).show();
    }
})