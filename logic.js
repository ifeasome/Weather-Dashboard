$(document).ready(function () {
    

    //let APIkey = ac2619886a7a1a9a4582c78a9fb57698;

    let cityStore = []; // empty array for saving the searched cities

    // appends city search list and displays on the index page 
    function cityList () {
       $(".search-list").empty();

        let cityCntr = 0; 

        console.log(JSON.parse(localStorage.getItem("key")));
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

        
        
        console.log(inputText);
         
        // first ajax call to retrieve lon and lat info
        $.ajax({
            url: urlOne,
            method: "GET"
        })
           .then(function(response){
               let results = response;
               console.log(results);
              
               let lonEL = response.coord.lon; 

               let latEL = response.coord.lat;

               let urlTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latEL + "&lon=" + lonEL + "&exclude={part}&appid=ac2619886a7a1a9a4582c78a9fb57698";
             
               // second ajax call relying on first ajax call results to retrive weather info
               $.ajax({
        
                   url: urlTwo,
                   method: "GET"
               })

                 .then(function(response) {
                     console.log(response);
                 })

           let cityDisplay = $("#city-search").val();
           console.log(cityDisplay, inputText);
           // $("p").append("city-search").val();
           //$(cityDisplay).text = $("#city-search").val();
           // $(dateDisplay).text(moment().format("MMMM, Do, YYYY"));
          //  $(tempDisplay).text = response.current.temp;
           // $(humidityDisplay).text = response.current.humidity;
           // $(windspeedDisplay).text = response.current.wind_speed;
           // $(uvDisplay).text = response.current.uvi;
           
           });

           

          
           
           })
              });
    





