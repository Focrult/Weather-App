
const API_KEY = 'a412b2680d9895a41ef3d8276e079247'
const searchInput = document.getElementById('search-input');
// const Temp = document.getElementById("");
// const fiveDisplay = docuement.getElementById("");
// const today = document.getElementById("");
// var previous = document.getElementById("");
//retrieve api
// fetch weather data
function LiveWeather(){
    const API_URL = "https://api.openweathermap.org/data/2.5/weather?" + searchInput + "&appid=" + API_KEY;
}
//hidden five cards?


function Display(){ //use code from previous challenge? 

}

// display results

// functionality:
// button eventlistener for search results

$(".submit").click(function(){
    localStorage.setItem("search", $(".search-input").val());
    console.log("passing search");
})



//store city + API data
$(".search-input").val(localStorage.getItem("search"));
//localStorage.getItem("search-input");

