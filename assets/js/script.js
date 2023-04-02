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
    document.getElementById('date').textContent = data.dt
    document.getElementById('wind').textContent = data.wind.speed
    document.getElementById('hum').textContent = data.main.humidity
    document.getElementById('temp').textContent = data.main.temp

}

function displayForecastWeather(data) {
    var elId = 1;
    for (i = 0; i < data.list.length; i += 8) {
        var entry = data.list[i];
        document.getElementById('date-' + elId).textContent = entry.dt
        document.getElementById('wind-' + elId).textContent = entry.wind.speed
        document.getElementById('hum-' + elId).textContent = entry.main.humidity
        document.getElementById('temp-' + elId).textContent = entry.main.temp
        elId++;
    }

}
searchWeather.addEventListener('click', handleSearchSummit)

