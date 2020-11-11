$(document).ready(function () {
  //let APIkey = ac2619886a7a1a9a4582c78a9fb57698;

  let cityStore = []; // empty array for saving the searched cities

  // appends city search list and displays on the index page
  function cityList() {
    $(".search-list").empty();

    let cityCntr = 0;

    // keeps looping to retrive items from local storage
    while (cityCntr < JSON.parse(localStorage.getItem("key")).length) {
      let buttonEL = $("<button>");
      buttonEL.text(JSON.parse(localStorage.getItem("key"))[cityCntr]);
      let searchHldr = $("<li>").append(buttonEL);
      $(".search-list").append(searchHldr);
      cityCntr++;
    }
  }

  // button function for running two weather APIs
  $(".btn").on("click", function () {
   $("#weather-disp").empty();
    let inputText = $("#city-search").val();

    let urlOne =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputText +
      "&appid=ac2619886a7a1a9a4582c78a9fb57698";

    // pushes city searches into local storage

    cityStore.push(inputText);

    localStorage.setItem("key", JSON.stringify(cityStore));

    cityList();

    // first ajax call to retrieve lon and lat info
    $.ajax({
      url: urlOne,
      method: "GET",
    }).then(function (response) {

      let cityName = response.name;

      let imgResp = response.weather[0].icon;

      let imgURL = "http://openweathermap.org/img/wn/" + imgResp + "@2x.png";

      let iconVar = $("<img>").attr("src", imgURL);

      $("#weather-disp").append(cityName, iconVar);

      console.log(cityName, iconVar);

      let lonEL = response.coord.lon;

      let latEL = response.coord.lat;

      let urlTwo =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latEL +
        "&lon=" +
        lonEL +
        "&units=imperial&exclude={part}&appid=ac2619886a7a1a9a4582c78a9fb57698";

      // second ajax call relying on first ajax call results to retrive weather info
      $.ajax({
        url: urlTwo,
        method: "GET",
      })
      .then(function (response) {
        console.log(response);

        // current temp display
        let curTemp = response.current.temp;
        let tempEL = $("<div>");
        tempEL.text("Temperature: " + Math.floor(curTemp) + "\u00B0F");
        $("#weather-disp").append(tempEL);
        $("#weather-disp").append($("<br>"));

        // Humidity display
        let humidDisp = response.current.humidity;
        let humidEL = $("<div>");
        humidEL.text("Humidity: " + humidDisp + "%");
        $("#weather-disp").append(humidEL);
        $("#weather-disp").append($("<br>"));

        // wind display
        let windDisp = response.current.wind_speed;
        let windEL = $("<div>");
        windEL.text("Wind Speed: " + windDisp + " " + "MPH");
        $("#weather-disp").append(windEL);
        $("#weather-disp").append($("<br>"));

        // UV Index display
        let uvIndex = response.current.uvi;
        let uvEL = $("<div>");
        uvEL.text("UV Index: " + uvIndex);
        $("#weather-disp").append(uvEL);
        $("#weather-disp").append($("<br>"));

        //5-day forecast loop
        for (let i = 1; i < 6; i++) {
            // a third card 
            let cardEL = $("<div>"); 
          
            // weather icon 
            let wthrIcon = response.daily[i].weather[0].icon;
            let wthrUrl = "http://openweathermap.org/img/wn/" + wthrIcon + "@2x.png";
            let imgVar = $("<img>").attr("src", wthrUrl);
            // current date 
            let curDate = response.daily[i].dt;
            let theDate = moment.unix(curDate).format('l');
            cardEL.append(theDate, imgVar);
        
            // current temp display
            let tempDisp = response.daily[i].temp.day;
            let tmpEL = $("<span>");
            tmpEL.text("Temp: " + tempDisp + "\u00B0F"); 
            cardEL.append(tmpEL, $("<br>"));
            //$(".row-card").append($("<br>"));

            
             // Humidity display
             let hmdDisp = response.daily[i].humidity;
             let hdtEL = $("<span>");
             hdtEL.text("Humidity: " + hmdDisp + "%");
             cardEL.append(hdtEL);
             //$(".row-card").append($("<br>"));
             $(".row-card").append(cardEL, $("<br>"));

             // the appending begins 
             
             // append weather and date 
             //append temp 
             //append humidity
             // append card el to row-card remove all other appends not in cardel. 
             
        }
      });
    });
  });


});
