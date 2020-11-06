$(document).ready(function () {
    let inputText = $("#city-search").val();
    let APIkey = ac2619886a7a1a9a4582c78a9fb57698

    $(".btn").on("click", function(){
        queryURL = api.openweathermap.org/data/2.5/weather?q={inputText} + APIkey;
    })















});

