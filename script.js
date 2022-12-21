
const API_KEY = 'a412b2680d9895a41ef3d8276e079247'
let searchInput = document.getElementsByClassName('.search-input');
const newsearchInput = JSON.stringify(searchInput);
console.log(newsearchInput)
$(document).ready(function() {
$(".submit").click(function(){
    LiveWeather();
    const text = document.querySelector(".search-input").value;
    localStorage.setItem("search", $(".search-input").val());
    console.log("passing search");
    console.log(text);
    $("#placeholder-name").text(text);
    return text;
    
});
$(".reset").click(function(){
    localStorage.clear();
});








// fetch('requestUrl')
// .then(function(response) {
//     return response.json();
// });
// .then(function(data){
//     console.log("testing \n------");
//     for(let i=0; i<data.length; i++){
//         console.log(data[i].city);
//         console.log
//     }
// }


$(".search-input").val(localStorage.getItem("search"));

function LiveWeather(){
    text = $(".search-input").val();
    const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + text + "&appid=" + API_KEY;
    console.log(API_URL);
    return API_URL;
}
//hidden five cards?


// function Display(){ //use code from previous challenge? 

// }

// display results

// functionality:
// button eventlistener for search results



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


});

