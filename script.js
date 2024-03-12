function getWeather() {
    const location = document.getElementById("locationInput").value;
    const apiKey = "0c80b2b56f1943ada19100744230103";
    const apiUrl=`http://localhost:3000/weather/${location}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = "";


            if (data.status === 'error') { // Check if weather data is not found
                console.log('gfygfuy');
                const weatherInfo = document.getElementById("weatherInfo");
                weatherInfo.innerHTML = "<div>Location not found for current location</div>";
                return; 
            }

            const placeInput = data.data.name;
            const temperature = data.data.temp_c;
            const weatherCondition = data.data.condition;
            const currentDate = new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            const weatherTypeDisplay = document.querySelector(".weather-type");
            weatherTypeDisplay.innerHTML = weatherCondition;

            const temperatureDisplay = document.querySelector(".temparature");
            temperatureDisplay.innerHTML = `${temperature}°C`;

            const datePlace = document.getElementById("datePlace");
            const datePlaceDiv = document.createElement("div");
            const dayDiv = document.createElement("div");
            const placeDiv = document.createElement("div");
            const placeSpan = document.createElement("span");
            const locationIcon = document.createElement("i");

            datePlaceDiv.classList.add("datePlace");
            dayDiv.classList.add("day");
            dayDiv.textContent = currentDate;
            placeDiv.classList.add("place");
            locationIcon.classList.add("fa-solid", "fa-location-dot");
            placeSpan.appendChild(locationIcon);
            placeDiv.appendChild(placeSpan);
            placeDiv.textContent = placeInput;

            datePlace.innerHTML = "";
            datePlace.appendChild(dayDiv);
            datePlace.appendChild(placeDiv);

            const section = document.querySelector(".season-section");
            section.classList.remove("day", "rainy", "night");

            if (weatherCondition.toLowerCase().includes("sunny")) {
                section.classList.add("day");
            } else if (
                weatherCondition.toLowerCase().includes(["cloud", "Partly cloudy"])
            ) {
                section.classList.add("night");
            } else section.classList.add("rainy");
        })
        .catch((error) => console.log(error));
}