// console.log ('working')

var HOSTNAME = 'https://api.openweathermap.org/data/2.5';
var API_KEY = '182957f0fa2946d78cf6ff810703352b';

var searchWeather = document.querySelector('#searchweather');
var searchInput = document.querySelector('input');

function handleSearchSummit() {
    if (!searchInput.value) {
        return;
    }

    var city = searchInput.value
    fetchWeather(city)
    searchInput.value = ""
}

function fetchWeather(city) {
    var currentUrl = `${HOSTNAME}/weather?appid=${API_KEY}&q=${city}&units=imperial`

    fetch(currentUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            displayCurrentWeather(data)
            // var lat = data.coord.lat
            // var lon = data.coord.lon

        })
    var forecastUrl = `${HOSTNAME}/forecast?q=${city}&units=imperial&appid=${API_KEY}`
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            displayForecastWeather(data)
        })
}
function displayCurrentWeather(data) {
    document.getElementById('city').textContent = data.name
    document.getElementById('date').textContent = convertEpoch(data.dt)
    document.getElementById('wind').textContent = "Wind:" + data.wind.speed + " MPH"
    document.getElementById('hum').textContent = "Humidity: " + data.main.humidity + " \u0025"
    document.getElementById('temp').textContent = "Temp: " + data.main.temp + " \u00B0F"

}

function displayForecastWeather(data) {
    var elId = 1;
    for (i = 0; i < data.list.length; i += 8) {
        var entry = data.list[i];
        document.getElementById('date-' + elId).textContent = convertEpoch(entry.dt)
        document.getElementById('wind-' + elId).textContent = "Wind: " + entry.wind.speed + " MPH"
        document.getElementById('hum-' + elId).textContent = "Humidity: " + entry.main.humidity + " \u0025"
        document.getElementById('temp-' + elId).textContent = "Temp: " + entry.main.temp + " \u00B0F" 
        elId++;
    }

}

function convertEpoch(unixEpoch) {
    var timeInms = unixEpoch * 1000;
    var dateObj = new Date (timeInms);
    
    var year = dateObj.getFullYear();
    var month = ("0"+ (dateObj.getMonth ()+ 1)).slice(-2);
    var day=("0" + dateObj.getDate()).slice(-2);

    return (month + "/" + day + "/" + year);    
}

searchWeather.addEventListener('click', handleSearchSummit)

function getInfo(){
     var currentSearchList =  null
  
}

