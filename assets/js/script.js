// console.log ('working')

// var apiKey ='7ab439372a6b7834b1058543aced3bee'
var apiKey = '182957f0fa2946d78cf6ff810703352b';

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
    var currentUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`

    fetch(currentUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            displayCurrentWeather(data)
            var lat = data.coord.lat
            var lon = data.coord.lon
            var forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
            fetch(forcastUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    displayForecastWeather(data)
                })
        })
}
function displayCurrentWeather(data) {
    var temp = data.main.temp
    var hum = data.main.humidity
    var wind = data.wind.speed
    var date = data.dt
    var city = data.name
    document.getElementById('city').textContent = city
    document.getElementById('date').textContent = date
    document.getElementById('wind').textContent = wind
    document.getElementById('hum').textContent = hum
    document.getElementById('temp').textContent = temp

}

function displayForecastWeather(data) {
    for (i = 3; i < data.list.length; i += 8) {
        // createElement
    }

}
searchWeather.addEventListener('click', handleSearchSummit)

