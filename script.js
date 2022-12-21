
const API_KEY = 'a412b2680d9895a41ef3d8276e079247'
// const searchInput = document.getElementById('search-input');
searchInput = "perth";
// const Temp = document.getElementById("");
// const fiveDisplay = docuement.getElementById("");
// const today = document.getElementById("");
// var previous = document.getElementById("");
//retrieve api
// fetch weather data
$(document).ready(function() {
function LiveWeather(){
    const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + API_KEY;
    console.log(API_URL);
}
//hidden five cards?
LiveWeather();

// function Display(){ //use code from previous challenge? 

// }

// display results

// functionality:
// button eventlistener for search results

$(".submit").click(function(){
    const text = document.querySelector(".search-input").value;
    localStorage.setItem("search", $(".search-input").val());
    console.log("passing search");
    console.log(text);
    $("#placeholder-name").text(text);
    
});
$(".reset").click(function(){
    localStorage.clear();
});

// const CityAdd = (e)=>{
//     e.preventDefault();
//     let city = {
//         id:
//         weather:
//         humidity:
//         wind: 


//     }
// }



//add onto existing array


// function Data(){
//     city: 
// }
// function Days("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"){
//     if(Today == Days){
//         remove the day/.
//         Data();
//     }
// }

// resetSearch();
//store city + API data
$(".search-input").val(localStorage.getItem("search"));

});
function celConvert(){

}

