let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let cityName = document.getElementById("cityName");
let temp = document.getElementById("temp");
let condition = document.getElementById("condition");
let weatherResult = document.getElementById("weather-Result");
let bodyBg = document.getElementById("bodyBg");
let animationLayer = document.getElementById("animationLayer");

// Unga OpenWeatherMap API key-a inga podunga
const apiKey = "45d07a5912b36f526f3f87dac51a186e"; 

searchBtn.addEventListener("click", function() {
    let city = cityInput.value.trim();
    
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found!");
                return;
            }

            // Update UI with real data
            cityName.innerText = data.name + ", " + data.sys.country;
            temp.innerText = Math.round(data.main.temp) + "°C";
            
            let weatherCondition = data.weather[0].main.toLowerCase();
            condition.innerText = data.weather[0].description;

            // Remove hidden class
            weatherResult.classList.remove("hidden");

            // Change Background theme based on Weather Condition
            updateBackgroundTheme(weatherCondition);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Something went wrong!");
        });
});

function updateBackgroundTheme(conditionText) {
    // Reset classes and animations
    bodyBg.className = "";
    animationLayer.innerHTML = "";

    if (conditionText.includes("clear") || conditionText.includes("sun")) {
        bodyBg.classList.add("sunny");
    } else if (conditionText.includes("rain") || conditionText.includes("drizzle") || conditionText.includes("storm")) {
        bodyBg.classList.add("rainy");
        createRainEffect();
    } else if (conditionText.includes("snow") || conditionText.includes("winter")) {
        bodyBg.classList.add("winter");
        createSnowEffect();
    } else if (conditionText.includes("cloud")) {
        bodyBg.classList.add("clouds");
    } else {
        bodyBg.classList.add("default-bg");
    }
}

// Function to generate dynamic falling rain drops
function createRainEffect() {
    for (let i = 0; i < 50; i++) {
        let drop = document.createElement("div");
        drop.classList.add("rain-drop");
        drop.style.left = Math.random() * window.innerWidth + "px";
        drop.style.top = Math.random() * -100 + "px";
        drop.style.animationDuration = (0.4 + Math.random() * 0.4) + "s";
        drop.style.animationDelay = (Math.random() * 2) + "s";
        animationLayer.appendChild(drop);
    }
}

// Function to generate dynamic falling snowflakes
function createSnowEffect() {
    for (let i = 0; i < 40; i++) {
        let snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.left = Math.random() * window.innerWidth + "px";
        snowflake.style.top = Math.random() * -100 + "px";
        snowflake.style.animationDuration = (2 + Math.random() * 3) + "s";
        snowflake.style.animationDelay = (Math.random() * 5) + "s";
        animationLayer.appendChild(snowflake);
    }
}