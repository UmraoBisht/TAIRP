const CurrentCityName = document.getElementById('city-Name');
const currentWeatherCard = document.querySelector('.current-weather-card');
const currentWeatherInfo = document.querySelector('.weather-info');
const searchBtn = document.getElementById('search-btn');
const inputCity = document.getElementById('input-city');
const api_key = '0f4499fec766eb44638a1a7d7a67cefc';
const forcastWeatherDiv = document.querySelector('.forcast-weather');
const container=document.querySelector('.container');

window.addEventListener('load',()=>{
    const loader=document.querySelector('.loader');
    loader.addEventListener('transitonend',()=>{
        container.removeChild('.loader');
    });
});


const addCurrentWeatherData = (weatherItem) => {
    return ` <div class="info">
                <h4>Feels Like</h4>
                <p>${(weatherItem.main.feels_like - 273.15).toFixed(2)}°C</p>
            </div>
            <div class="info">
                <h4>Min Temp</h4>
                <p>${(weatherItem.main.temp_min - 273.15).toFixed(2)}°C</p>
            </div>
            <div class="info">
                <h4>Max Temp</h4>
                <p>${(weatherItem.main.temp_max - 273.15).toFixed(2)}°C</p>
            </div>
            <div class="info">
                <h4>Humidity</h4>
                <p>${weatherItem.main.humidity}%</p>
            </div>
            <div class="info">
                <h4>Wind Speed</h4>
                <p>${weatherItem.wind.speed}Km/H</p>
            </div>
            <div class="info">
                <h4>Pressure</h4>
                <p>${weatherItem.main.pressure}mbar</p>
            </div>`
}


const createWeatherCard = (weatherItem) => {
    return `<div class="weather-card">
                <h3>${weatherItem.dt_txt.split(' ')[0]}</h3>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="cloud">
                <h3>${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h3>
            </div>`
}


function getWeatherData(lon, lat) {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
    fetch(WEATHER_API_URL).then((res) => res.json()).then((data) => {
        // console.log(data);
        CurrentCityName.textContent = `${data.city.name}`;
        const uniqueForcastDays = [];
        const fiveDaysForcast = data.list.filter((forcast) => {
            const forcastDate = new Date(forcast.dt_txt).getDate();

            if (!uniqueForcastDays.includes(forcastDate)) {
                return uniqueForcastDays.push(forcastDate);
            }
        });

        // console.log(fiveDaysForcast);
        forcastWeatherDiv.innerHTML = '';
        fiveDaysForcast.forEach((weatherItem, index) => {
            if (index === 0) {
                currentWeatherCard.innerHTML=`
                <div class="data">
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="cloud">
                    <div class="content">
                        <h2>${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h2>
                        <h3>${weatherItem.weather[0].main}</h3>
                    </div>
                </div>`;
                currentWeatherInfo.innerHTML = addCurrentWeatherData(weatherItem);
            } else {
                forcastWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
            }
        });
    }).catch((err) => {
        console.log("An Error Occurred while Fetching the Coordinates");
    })
}


function getCityCoordinates() {
    const cityName = inputCity.value.trim();
    if (!cityName) return;

    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;

    fetch(api_url).then((res) => res.json()).then((data) => {
        if (data.cod == 404) {
            return alert("City Not Found, Try Again!");
        }
        const lon = data.coord.lon;
        const lat = data.coord.lat;
        getWeatherData(lon, lat);
    }).catch((err) => {
        console.log(err)
        currentWeatherCard.innerHTML = `An Error Occurred while Fetching the Coordinates`;
    });
}

searchBtn.addEventListener('click', getCityCoordinates);

window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,userDenied);
    } else {
        container.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    getWeatherData(position.coords.longitude,position.coords.latitude);
  }

function userDenied(positionError) {
    getWeatherData(77.2311,28.6128);
}