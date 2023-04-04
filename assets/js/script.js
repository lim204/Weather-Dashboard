var HOSTNAME = 'https://api.openweathermap.org/data/2.5';
var API_KEY = '182957f0fa2946d78cf6ff810703352b';

function handleSearchSummit() {
    if (!searchInput.value) {
        return;
    }

    var city = searchInput.value
    fetchWeather(city)
        .then(() => {
            localStorage.setItem(city, "1")
            getWeatherHistory();
        })
        .catch((err) => console.log(err))
    
    // Clear input field value once the user submits.
    searchInput.value = "";
}

function handlerSearchHistoryClick(e) {
    var city = e.target.textContent;
    fetchWeather(city);
}

function fetchWeather(city) {
    var currentUrl = `${HOSTNAME}/weather?appid=${API_KEY}&q=${city}&units=imperial`

    return fetch(currentUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {

                displayCurrentWeather(data)
    
                var forecastUrl = `${HOSTNAME}/forecast?q=${city}&units=imperial&appid=${API_KEY}`
                fetch(forecastUrl)
                    .then(response => response.json())
                    .then(data => {
                        displayForecastWeather(data)
                    })
            } else {
                throw Error(data.message);
            }
        })
}

function displayCurrentWeather(data) {
    var element = document.querySelector('#weather-info');
    element.classList.remove('visually-hidden');
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

function getWeatherHistory() {
    var searchHistoryEl = document.getElementById('search-history');

    while (searchHistoryEl.firstChild) {
        searchHistoryEl.removeChild(searchHistoryEl.firstChild);
    }

    for (var i = 0; i < localStorage.length; i++){

        var cityName = localStorage.key(i);
        var cityEl = document.createElement("div")
        cityEl.setAttribute("class", "p-2 mb-2 bg-secondary text-center");
        cityEl.addEventListener('click', handlerSearchHistoryClick);
        var textEl = document.createTextNode(cityName);
        cityEl.appendChild(textEl);
        searchHistoryEl.appendChild(cityEl);
    }
}



var searchWeather = document.querySelector('#searchweather');
var searchInput = document.querySelector('input');
searchWeather.addEventListener('click', handleSearchSummit);
getWeatherHistory();
