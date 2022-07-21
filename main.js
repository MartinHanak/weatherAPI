async function getWeatherData(city) {
    const APIkey = '43269eeb265bfd1cfe663fc327f64ebd';

    let URLcityCoor = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`

    const cityData = await fetch(URLcityCoor,{mode: 'cors'}); 
    const cityDataJSON = await cityData.json();

    const lat = cityDataJSON[0].lat;
    const lon = cityDataJSON[0].lon;

    const URLcityWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`



    const weatherData = await fetch(URLcityWeather,{mode: 'cors'});
    const weatherDataJSON = await weatherData.json();

    //console.log(weatherDataJSON.weather[0].description);

    return weatherDataJSON.weather[0].description;

}

const button = document.getElementById("submit");
const cityInput = document.getElementById("city");
const resultSpan = document.getElementById("display");
button.addEventListener("click", (e) => {
    e.preventDefault();

    if(cityInput.value) {
        const weather = getWeatherData(cityInput.value)
        .then((result) => {
            resultSpan.innerHTML = result;
            console.log(result);
            console.log("finished");
        })
        .catch(err => {
            alert("Fill in correct city name.");
        });
        resultSpan.innerHTML = "Loading";

    } else {
        alert("Fill in correct city name.");
    }
})

getWeatherData("London").catch("Sth wrong");