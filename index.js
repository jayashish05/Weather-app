const apikey= "17dd4d66d0a51ce52a6baad3a6315545"
const city = document.querySelector("#city-input");


city.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.querySelector("#search-btn").click();
    }
});


document.querySelector("#search-btn").addEventListener("click",async (event) => {
    event.preventDefault();
    const cityname = city.value;
    if (cityname) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}`);
            if(!response.ok){
                document.querySelector(".city").innerHTML = "City not found";
                return;
            }
            const data = await response.json();
            console.log(data);
            document.querySelector(".city").innerHTML = cityname
            document.querySelector(".temperature").innerHTML= `${(data.main.temp - 273.15).toFixed(1)}°C`;
            document.querySelector(".feels-like").innerHTML= `${(data.main.feels_like - 273.15).toFixed(1)}°C`;
            document.querySelector(".wind-speed").innerHTML= `${(data.wind.speed).toFixed(2)} km/h`;
            document.querySelector(".humidity").innerHTML= `${(data.main.humidity)}%`;
            document.querySelector(".weather-condition").innerHTML = `Weather Condition: ${data.weather[0].description}`
            const desc = `${(data.weather[0].main)}`;
            const icon = document.querySelector("#weather-icon");
            icon.className = "fa-solid fa-5x";
            if (desc === "Clouds") {
                icon.classList.add("fa-cloud");
            } 
            else if (desc === "Clear") {
                icon.classList.add("fa-sun");
            } 
            else if (desc === "Rain") {
                icon.classList.add("fa-cloud-showers-heavy");
            }
            else if(desc=== "Snow"){
                icon.classList.add("fa-snowflake");
            }
        }
    else{
        document.querySelector(".city").innerHTML="Please enter a valid city name";
    }
});