$(document).ready(function () {
    

    //let APIkey = ac2619886a7a1a9a4582c78a9fb57698;
    let cityStore = [];

    function cityList () {
       $(".search-list").empty();

        let cityCntr = 0; 
        console.log(JSON.parse(localStorage.getItem("key")));
        while (cityCntr < JSON.parse(localStorage.getItem("key")).length) {
            let ulEL = $("<ul>");
            ulEL.text(JSON.parse(localStorage.getItem("key"))[cityCntr]);
            $(".search-list").append(ulEL); cityCntr++;
        }

     
        // cityStore[0].prependTo create new list element under search box on the HTML 
        // 0. let newVar2 = 0; 
        // 0.5 while newVar 2 < JSON.parse(localStorage.getItem("key")).length; 
        // 1. CREATE HTML : let a variable = $("<li>")
        // 2.  variable.text (JSON.parse(localStorage.getItem("key"))[newVar2])
        // 3.. $(".search-list").append (variable); newVar2++;


    }

    $(".btn").on("click", function(){
        
        let inputText = $("#city-search").val();

        let urlOne = "https://api.openweathermap.org/data/2.5/weather?q=" + inputText + "&appid=ac2619886a7a1a9a4582c78a9fb57698"; 

    
        cityStore.push(inputText);

         
        localStorage.setItem ("key", JSON.stringify(cityStore));

       cityList();

        
        
        console.log(inputText);
        
    
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
    





