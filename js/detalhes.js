'use strict'

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString); 
var coinId = urlParams.get("id");

console.log(coinId);