
$(document).ready(function() {
    const API_KEY = 'a412b2680d9895a41ef3d8276e079247'
    let searchInput = document.getElementsByClassName('.search-input');
    const newsearchInput = JSON.stringify(searchInput);
    const CityCurrent = document.getElementById('city-name');
    const currentTemp = document.getElementById("temperature");
    const currentWind = document.getElementById("wind");
    const currentHumidity = document.getElementById("humidity");
    const fiveHeader = document.getElementById("fivedays");
    var currentDay = document.getElementById("current-weather");
    let preCity = document.getElementById("preCity");
    const old_data = JSON.parse(localStorage.getItem("search")) || [];

    CityHis();
    if (old_data.length > 0) {
    console.log("pass")
    LiveWeather(old_data[old_data.length - 1]);
    }

$(".submit").click(function(){ 
    var text = document.querySelector(".search-input").value;
    if(localStorage.getItem("search") == null){
        localStorage.setItem("search", '[]');
    }
    if(localStorage.getItem("search") != null){
       location.reload();
    }
    var old_data = JSON.parse(localStorage.getItem("search"));
    old_data.push(text);
    localStorage.setItem("search", JSON.stringify(old_data));
  //  localStorage.setItem("search", $(".search-input").val()); 
    LiveWeather(text); 
    CityHis();
    
});
$(".reset").click(function(){ //reset search input
    localStorage.clear();
    document.location.reload();
});
//$(".search-input").val(localStorage.getItem("search"));
function LiveWeather(text){

  //  text = $(".search-input").val();
    console.log(text);
    let API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + text + "&units=imperial&appid=" + API_KEY; //had &units=metric, however, I want this to match the gitlab img
 
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
            const five = $(".forecast");
            for(i = 0; i < five.length; i++) {
            const array_S = i * 8 + 4; //this should target the objects we want! 
            const arrayDate = response.list[array_S].dt_txt.slice(0,10);
            
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
            }   //end of for loop
              });
              
});//End of ajax

}//END OF FUNCTION LIVEWEATHER

  function CityHis(){
    const old_data = JSON.parse(localStorage.getItem("search")) || []; //parse the data
    preCity.innerHTML = "";
    if(localStorage.getItem("search") == null){
        localStorage.setItem("search", '[]');
     }
    for (let i = 0; i < old_data.length; i++) { //present previous cities
        const CityOld = document.createElement("input");
        CityOld.setAttribute("type", "text");
        CityOld.setAttribute("readonly", true);
        CityOld.setAttribute("class", "form-control d-block bg-blue");
        CityOld.setAttribute("value", old_data[i]);
        CityOld.addEventListener("click", function () {
        LiveWeather(CityOld.value);
        console.log(CityOld.value);
        })    
        preCity.append(CityOld)
    }
}


})

//END OF DOCUMENT




