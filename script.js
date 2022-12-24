
const API_KEY = 'a412b2680d9895a41ef3d8276e079247'
let searchInput = document.getElementsByClassName('.search-input');
const newsearchInput = JSON.stringify(searchInput);
const CityCurrent = document.getElementById('city-name');
const currentTemp = document.getElementById("temperature");
const currentWind = document.getElementById("wind");
const currentHumidity = document.getElementById("humidity");
const fiveHeader = document.getElementById("fivedays");
var currentDay = document.getElementById("current-weather");
$(document).ready(function() {
$(".submit").click(function(){ 
    LiveWeather(); //activates when user clicks submit button
    const text = document.querySelector(".search-input").value;
    localStorage.setItem("search", $(".search-input").val());
    console.log(text);
     //Displays the day, the month, and the year
});
$(".reset").click(function(){ //reset search input
    localStorage.clear();
    document.location.reload();
});
$(".search-input").val(localStorage.getItem("search"));
function LiveWeather(){
    text = $(".search-input").val();
    let API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + text + "&units=imperial&appid=" + API_KEY; //had &units=metric, however, I want this to match the gitlab img
    console.log(API_URL);
 
    var settings = { //for response
        "async": true,
        "crossDomain": true,
        "url": API_URL,
        "method": "GET"
    }
   fetch(API_URL) 
   .then(response => response.json())
    $.ajax(settings).done(function (response){
        currentDay.classList.remove("d-none");
        console.log(response);
        const DMY = dayjs().format("D/MM/YY");
        CityCurrent.innerHTML = (response.name) +" " +"("+ DMY+")"; //need to add date!
        currentTemp.innerHTML = "Temp: " + (response.main.temp) + " °F";
        currentWind.innerHTML = "Wind Speed: " + (response.wind.speed) + " MPH";
        currentHumidity.innerHTML = "Humidity: " + (response.main.humidity) + " %";
        
        ///////five days forecast
        let ID = (response.id);
        let API_URL_5 = "https://api.openweathermap.org/data/2.5/forecast?id=" + ID + "&units=imperial&appid=" + API_KEY;
        var settings2 = { //for response
            "async": true,
            "crossDomain": true,
            "url": API_URL_5,
            "method": "GET"
        }
        fetch(API_URL_5)
        .then(response => response.json())
        $.ajax(settings2).done(function(response){
            fiveHeader.classList.remove("d-none");
            console.log(response);
            let five = $(".forecast");
            for(i = 0; i < five.length; i++) {//should only fill the five divs!
            console.log(i);
                // every three hours the weather array records data!
                // we can ignore the first 4 elements use math equation?
                // target 36, 28, 20, 12, 4 <- include these in the array for the five day forecast. Exclude 0-3
                //         4, 3, 2, 1, 0
            const index = [0, 1, 2, 3, 4];
            const res1 = response.list[4];
            const res2 = response.list[12];
            const res3 = response.list[20];
            const res4 = response.list[28];
            const res5 = response.list[36];
            console.log(res1);
            const array_S = ((i * (8)) + 4); //this should target the objects we want! 
            let arrayDate = response.list[array_S].dt_txt.slice(0,10);
            console.log(arrayDate);
            const dates = document.createElement("h5");
            dates.setAttribute("class", "mt-3 mb-2 forecast");
            dates.innerHTML = arrayDate;
            five[i].append(dates);
            const icon = document.createElement("img"); //icon
            icon.setAttribute("src", "https://openweathermap.org/img/wn/" + response.list[array_S].weather[0].icon + "@2x.png"); //review https://openweathermap.org/weather-conditions + http://openweathermap.org/img/wn/10d@2x.png
            five[i].append(icon);
            
            ////////////////////////////////
            const forecastTempEl = document.createElement("h6");
            forecastTempEl.innerHTML = "Temp: " + (response.list[array_S].main.temp) + " °F"; //use response from previous. add in Array_S formula to select only what we want!!!
            five[i].append(forecastTempEl);
            ////////////////////////////////
            const forecastWind = document.createElement("h6");
            forecastWind.innerHTML = "Wind: " + (response.list[array_S].wind.speed) + " MPH";
            five[i].append(forecastWind);
            ////////////////////////////////
            const forecastHumidityEl = document.createElement("h6");
            forecastHumidityEl.innerHTML = "Humidity: " + response.list[array_S].main.humidity + " %";
            five[i].append(forecastHumidityEl);
            }   
        })
        // var cityName = {
        //     name:  $(".search-input").val(localStorage.getItem("search")),
        // }
        // $.ajax({
        //     type: 'POST',
        //     url: ,
        //     data: cityName,
        //     success: function (name){
        //     $cityName.append
        //     }
           

    //    })
        // DISPLAY search
        //use post?
        // function displaySearch(){
        // const previousCity = document.getElementById("preCity");
        // for(var i = 0; i < )
        // }
    });

   }//END OF FUNCTION LIVEWEATHER




})//END OF DOCUMENT




