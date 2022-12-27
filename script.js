
$(document).ready(function() {
    const API_KEY = 'a412b2680d9895a41ef3d8276e079247'
    const input = document.getElementById("search-input");
    let searchInput = document.getElementById('.search-input');
    const newsearchInput = JSON.stringify(searchInput);
    const CityCurrent = document.getElementById('city-name');
    const currentTemp = document.getElementById("temperature");
    const currentWind = document.getElementById("wind");
    const currentHumidity = document.getElementById("humidity");
    var fiveHeader = document.getElementById("fivedays");
    var currentDay = document.getElementById("current-weather");
    const preCity = document.getElementById("preCity");
    var old_data = JSON.parse(localStorage.getItem("search")) || [];
    
    CityHis();
    if (old_data.length > 0) {
    console.log("pass")
    LiveWeather(old_data[old_data.length - 1]);
    }
$(".submit").click(function(){ 
    const text = input.value;
    // LiveWeather(text);
    // old_data.push(text);
    // localStorage.setItem("search", JSON.stringify(old_data));
    // CityHis();
    if(localStorage.getItem("search") == null){
        localStorage.setItem("search", '[]');
    }
    if(localStorage.getItem("search") != null){
        location.reload();
     }
    //var old_data = JSON.parse(localStorage.getItem("search"));
    old_data.push(text);
    localStorage.setItem("search", JSON.stringify(old_data));
    LiveWeather(text); 
    // CityHis();
});

$(".reset").click(function(){ //reset search input
    localStorage.clear();
    document.location.reload();
});

//$(".search-input").val(localStorage.getItem("search"));
function LiveWeather(text){
  //  text = JSON.stringify(text);
    //text = JSON.parse(localStorage.getItem("search", text));
    let API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + text + "&units=imperial&appid=" + API_KEY ; //had &units=metric, however, I want this to match the gitlab img
     console.log(API_URL);
    var settings = { //for response
        "url": API_URL,
        "method": "GET"
    }
   fetch(API_URL) 
   .then(response => response.json())
    $.ajax(settings).done(function (response){
        currentDay.classList.remove("d-none");
        const DMY = dayjs().format("D/MM/YY");
        CityCurrent.innerHTML = (response.name) +" " +"(" + DMY+ ")"; //need to add date!
        currentTemp.innerHTML = "Temp: " + (response.main.temp) + " °F";
        currentWind.innerHTML = "Wind Speed: " + (response.wind.speed) + " MPH";
        currentHumidity.innerHTML = "Humidity: " + (response.main.humidity) + " %";
        
        ///////five days forecast
        let ID = response.id;
        let API_URL_5 = "https://api.openweathermap.org/data/2.5/forecast?id=" + ID + "&units=imperial&appid=" + API_KEY;
        var settings2 = { //for response
            "url": API_URL_5,
            "method": "GET"
        }
        fetch(API_URL_5)
        .then(response => response.json())
        $.ajax(settings2).done(function(response){
            fiveHeader.classList.remove("d-none");
            
            const five = document.querySelectorAll(".forecast");
            for(i = 0; i < five.length; i++) {
                five[i].innerHTML = "";
                const array_S = (i * 8) + 4; //this should target the objects we want! 
                const arrayDate = response.list[array_S].dt_txt.slice(0,10);
                const dates = document.createElement("h5");
            console.log(API_URL_5);
            console.log(five[i])
            console.log(array_S)
         //attribute //CAUSED THE ISSUE RIGHT HERE
            console.log(arrayDate);
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
            const forecastHumidity = document.createElement("h6");
            forecastHumidity.innerHTML = "Humidity: " + response.list[array_S].main.humidity + " %";
            five[i].append(forecastHumidity);
            } 
             //end of for loop
    });
                  
});//End of ajax

}//END OF FUNCTION LIVEWEATHER

  function CityHis(){
  
    preCity.innerHTML = "";
    for (let i = 0; i < old_data.length; i++) { //present previous cities
        const CityOld = document.createElement("input");
        CityOld.setAttribute("readonly", true);
        CityOld.setAttribute("type", "text");
        CityOld.setAttribute("class", "mt-2 form-control d-block bg-primary col-md-9 r-12 text-white text-center");
        CityOld.setAttribute("value", old_data[i]); 
        ////////////////////////////////////////////////////////////////
        CityOld.addEventListener("click",function(){ //when user clicks on previous city
            console.log("tesing click searchOld");
            console.log(CityOld.value)
            LiveWeather(CityOld.value);
       
    })
    preCity.append(CityOld);
}
    }

})

//END OF DOCUMENT




