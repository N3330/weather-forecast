var cityField = document.getElementById("city");
var searchBtn = document.getElementById("search-btn");
let date = new Date();
searchBtn.addEventListener("click", function () {
    init();
})
function init() {
    // renderButtons(cityField.value);
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityField.value + '&limit=1&appid=1374e4a6a1e7a7a7dc0cb2635ac040ac')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            oneCallWeather(data[0].lat, data[0].lon, data[0].name);
        });
}
// function renderButtons(){
//     // fetch local storage array 
//     var cities = JSON.parse(localStorage.getItem('cities'));
//     console.log(cities);
//     if (cities==null) {
// //         cities = [];
// //         cities.push(city);
// //         localStorage.setItem("cityname",JSON.stringify(cities));
// //     }

//     // if cities == null { make own array and push the param city to it}
    
//     // push to cities
//     //set cities in local storage to new array

//     // itererate through cities array and generate buttons  

//     // for (var i = 0; i < cities.length; i++)
//     //create buttons out of cities[i]
//     // append to html 
// }

function oneCallWeather(lat, lon, cityname) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=alerts,minutely,hourly&appid=1374e4a6a1e7a7a7dc0cb2635ac040ac`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var card = $("<div>").addClass("card border border-dark")
            var cardTitle = $("<h2>").addClass("card-title").text(cityname).attr("style", "text-align: center");
            var weatherIcon = $("<img>").attr("src", `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
            var cityTemp = $("<p>").addClass("city-temp").text("Temp: " + data.current.temp).attr("style", "text-align: center");
            var cityWind = $("<p>").addClass("city-wind").text("Wind: " + data.current.wind_speed + " MPH").attr("style", "text-align: center");
            var cityHumidity = $("<p>").addClass("city-humidity").text("Humidity: " + data.current.humidity + "%").attr("style", "text-align: center");
            var cityUvi = $("<p>").addClass("city-uvi").text("UV Index: " + data.current.uvi).attr("style", "text-align: center");
            $("#weather-main").append(card.append(cardTitle.append(weatherIcon)).append(cityTemp).append(cityWind).append(cityHumidity).append(cityUvi));
            console.log(data);
            for (var i = 0; i < 5; i++) {
                makeDailyCard(data.daily[i]);

            }
        });

}
// diaply flex card justify content space around  
// use memoment to display date on each card header

function makeDailyCard(day) {
    console.log(day, "individual day");
    date.setDate(date.getDate() + 1);
    var card = $("<div>").addClass("card border border-dark");
    var cardTitle = $("<h2>").addClass("card-title").text(date.toLocaleDateString()).attr("style", "text-align: center");
    var weatherIcon = $("<img>").attr("src", `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`)
    var cityTemp = $("<p>").addClass("city-temp").text("Temp: " + day.temp.day).attr("style", "text-align: center");
    var cityWind = $("<p>").addClass("city-wind").text("Wind: " + day.wind_speed + " MPH").attr("style", "text-align: center");
    var cityHumidity = $("<p>").addClass("city-humidity").text("Humidity: " + day.humidity + "%").attr("style", "text-align: center");
    var cityUvi = $("<p>").addClass("city-uvi").text("UV Index: " + day.uvi).attr("style", "text-align: center");
    $("#weather5").append(card.append(cardTitle.append(weatherIcon)).append(cityTemp).append(cityWind).append(cityHumidity).append(cityUvi));
    // //for(var i = 1; i < data.length; i++) {
    //     var day = data.daily[i];
    //     console.log(day)
    //     var cardContainer = $("<div>").addClass("container").attr("display","flex");
    //     // build card like 26 
    //     console.log(data)
    //     $('#weather5').append(cardContainer.append(weatherIcon));
    // }

};

