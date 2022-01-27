'use strict'
var fvt = JSON.parse(localStorage.getItem('fvt'));
var cloneRow = $("#row").clone();
var currency;
var currencySymbol;
currency = "eur";
currencySymbol = "€"

$('#search').on("change", verifyIfEmpty);
$('#search').keyup(searchFunction);
$('#btnSearch').on('click', btnSearch)

if (!fvt) {
    var fvtArr = [];

    localStorage.setItem('fvt', JSON.stringify(fvtArr));
}

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
            var rowClone = cloneRow.clone().addClass('clone').attr('data-name', result.name).attr('data-symbol', result.symbol).attr('data-id', result.id);

            $('.redirect', rowClone).attr('onclick', `redirect('${result.id}')`)
            $('.rank', rowClone).text(result.market_cap_rank)
            $('.nome', rowClone).text(result.name + " (" + result.symbol.toUpperCase() + ")")
            $('.symbol', rowClone).attr('src', result.image)
            $('.price', rowClone).text(result.current_price + " " + currencySymbol)
            $('.marketcap', rowClone).text(result.market_cap + currencySymbol)
            $('.variation', rowClone).text(result.price_change_percentage_24h.toFixed(2) + "%")
            $('.volume24h', rowClone).text(result.circulating_supply + " (" + result.symbol.toUpperCase() + ")")

            $('.like-btn', rowClone).attr('id', result.id).attr('onclick', 'favoritos(this)');
            if (fvt.indexOf(result.id) > -1) {
                $('.like-btn', rowClone).addClass("favoritos");
            }
            $('#table').append(rowClone);

            var variation = $('.variation', rowClone).text()

            if (variation.match("^-")) {
                $(".variation", rowClone).css("color", "red");
                $(".variation", rowClone).prepend("🡻 ");
            } else {
                $(".variation", rowClone).css("color", "green");
                $(".variation", rowClone).prepend("🡹 ");
            }
        })

        if ($('#search').val() != "") 
        {
            searchFunction();
        }
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


function searchFunction() {

    var valueToSearch = $('#search').val().toLowerCase();
    var cryptoList = $('#table').find('.clone');
    $(cryptoList).show();
    console.log($('#table').find('.clone'));

    for (var i = 0; i < $(cryptoList).length; i++) {
        var name = $(cryptoList[i]).attr('data-name').toLowerCase();
        var symbol = $(cryptoList[i]).attr('data-symbol').toLowerCase();
        var id = $(cryptoList[i]).attr('data-id').toLowerCase();

        if (!name.includes(valueToSearch) && !symbol.includes(valueToSearch) && !id.includes(valueToSearch)) {
            $(cryptoList[i]).hide();
        }
    }
}

window.onload = apiCall

function btnSearch() {
    var valueToSearch = $('#search').val().toLowerCase();

    $.ajax({
        type: 'GET',
        datatype: 'json',
        url: "https://api.coingecko.com/api/v3/coins/" + valueToSearch,
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

        if (fvt.indexOf(result.id) > -1) {
            $('.like-btn').addClass("favoritos");
        }
        var variation = $('.variation').text()

        if (variation.match("^-")) {
            $(".variation").css("color", "red");
            $(".variation").prepend("🡻 ");
        } else {
            $(".variation").css("color", "green");
            $(".variation").prepend("🡹 ");
        }
    })
}



function redirect(idCoin) {
    window.location.href = "detalhes.html?id=" + idCoin;
}

function verifyIfEmpty() {

    if ($('#search').val() == "") {
        apiCall();
    }

}

function favoritos(moeda) {
    $(moeda).toggleClass("favoritos")
    if ($(moeda).hasClass("favoritos")) {

        fvt.push($(moeda).attr("id"));
    } else {
        fvt.splice(fvt.indexOf($(moeda).attr("id")), 1)
    }
    localStorage.setItem('fvt', JSON.stringify(fvt));
    console.log(fvt)
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