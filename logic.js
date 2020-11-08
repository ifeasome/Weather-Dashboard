$(document).ready(function () {
    

    //let APIkey = ac2619886a7a1a9a4582c78a9fb57698;

    let cityStore = []; // empty array for saving the searched cities

    // appends city search list and displays on the index page 
    function cityList () {
       $(".search-list").empty();

        let cityCntr = 0; 

        
        // keeps looping to retrive items from local storage
        while (cityCntr < JSON.parse(localStorage.getItem("key")).length) {
            let ulEL = $("<ul>");
            ulEL.text(JSON.parse(localStorage.getItem("key"))[cityCntr]);
            $(".search-list").append(ulEL); cityCntr++;
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
                     
                 })

                 // weather display board
                 // temp display 

                 let kTemp = response.main.temp; 
                 let fTemp = (kTemp - 273.15) * 1.80 + 32;
                

                 let tempEL = $(".temp");

                 tempEL.text("Temperature: " + Math.floor(fTemp));
                
                 // city display
                 let cityEL = $(".city");
                 let dateEL = moment().format('L');
                 cityDisp = inputText + " " + "(" + dateEL + ")";
                 cityEL.text(cityDisp);

                 // wind display 
                 let windDisp = $(".wind"); 
                 let windEL = response.main.wind_speed;

                 console.log(windEL);

                 

                 


         
           // $(humidityDisplay).text = response.current.humidity;
           // $(windspeedDisplay).text = 
           // $(uvDisplay).text = response.current.uvi;
           
           });

           

          
           
           })
              });
    





