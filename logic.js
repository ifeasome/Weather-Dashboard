$(document).ready(function () {
    

    //let APIkey = ac2619886a7a1a9a4582c78a9fb57698;

    let cityStore = []; // empty array for saving the searched cities

    // appends city search list and displays on the index page 
    function cityList () {
       $(".search-list").empty();

        let cityCntr = 0; 

        
        // keeps looping to retrive items from local storage
        while (cityCntr < JSON.parse(localStorage.getItem("key")).length) {
            let buttonEL = $("<button>");
         buttonEL.text(JSON.parse(localStorage.getItem("key"))[cityCntr]);
            $(".search-list").append (buttonEL); cityCntr++;
        }
    }


    // button function for running two weather APIs
    $(".btn").on("click", function(){
        
        let inputText = $("#city-search").val();

        let urlOne = "https://api.openweathermap.org/data/2.5/weather?q=" + inputText + "&appid=ac2619886a7a1a9a4582c78a9fb57698"; 

        // pushes city searches into local storage

        cityStore.push(inputText);

         
        localStorage.setItem ("key", JSON.stringify(cityStore));

       cityList();

        
        // first ajax call to retrieve lon and lat info
        $.ajax({
            url: urlOne,
            method: "GET"
        })
           .then(function(response){
              
            let cityName = response.name;
            
            

              let imgResp = response.weather[0].icon;

              let imgURL = "http://openweathermap.org/img/wn/" + imgResp + "@2x.png";
 
              let iconVar = $("<img>").attr("src", imgURL);


              $("#city-icon").append(cityName, iconVar);

              console.log(imgURL);
              
               let lonEL = response.coord.lon; 

               let latEL = response.coord.lat;

               let urlTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latEL + "&lon=" + lonEL + "&units=imperial&exclude={part}&appid=ac2619886a7a1a9a4582c78a9fb57698";
             
               // second ajax call relying on first ajax call results to retrive weather info
               $.ajax({
        
                   url: urlTwo,
                   method: "GET"
               })

                 .then(function(response) {
                     console.log(response);

                 let curTemp = response.current.temp; 
                 console.log(curTemp);
                 
                 let tempEL = $("<div>");

                 tempEL.text("Temperature: " + Math.floor(curTemp) + "\u00B0F");

                 $("#weather-disp").append(tempEL);
                
                 // Humidity 
                 let humidDisp = response.current.humidity;
                 let humidEL = $("<div>");
                 humidEL.text("Humidity: " + humidDisp + "%");
                 $("#weather-disp").append(humidEL);

                 // wind display 
                 let windDisp = response.current.wind_speed;
                 let windEL = $("<div>");
                 windEL.text("Wind Speed: " + windDisp + " " + "MPH");
                 $("#weather-disp").append(windEL);

                 // UV Index 
                 let uvIndex = response.current.uvi; 
                 let uvEL = $("<div>");
                 uvEL.text("UV Index: " + uvIndex);
                 $("#weather-disp").append(uvEL);
                     
                 })

                 // weather display board
                 // temp display 
                 // uvi index 

                 

                 


         
           // $(humidityDisplay).text = response.current.humidity;
           // $(windspeedDisplay).text = 
           // $(uvDisplay).text = response.current.uvi;
           
           });

           

          
           
           })
              });
    





