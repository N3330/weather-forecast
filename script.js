var cityField = document.getElementById("city");
var searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function(){
    console.log(cityField.value);
    init();
})
function init() {
    console.log(cityField.value);
fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityField.value + '&limit=1&appid=1374e4a6a1e7a7a7dc0cb2635ac040ac')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
       oneCallWeather(data[0].lat, data[0].lon, data[0].name);
    });
}   


function oneCallWeather(lat, lon, cityname) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=alerts,minutely,hourly&appid=1374e4a6a1e7a7a7dc0cb2635ac040ac`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var card = $("<div>").addClass("card border border-dark")
        var cardTitle = $("<h2>").addClass("card-title").text(cityname).attr("style", "text-align: center");
        var weatherIcon = $("<img>").attr("src",`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
        $("#weather-main").append(card.append(cardTitle.append(weatherIcon)));
        for (var i = 0; i < data.daily.length; i++) {
            makeDailyCard(data.daily[i]);
        }
    });

}
// diaply flex card justify content space around  

function makeDailyCard(data) {
    // build card like 26 
    console.log(data)
}
