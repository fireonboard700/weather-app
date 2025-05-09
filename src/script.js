import "./styles.css";

const API_KEY = "98W6TTXU6FLJHM2VJD46CHNNN";

async function getWeatherData(coords) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${coords}?key=${API_KEY}`;
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    return data;
}

const form = document.querySelector("form");

function updateUI(weatherData) {
    const container = document.querySelector(".output__container");
    container.classList.remove("invisible");
    container.textContent = "";

    const address = document.createElement("div");
    address.classList.add("output__address");
    address.textContent = weatherData.resolvedAddress;

    const conditions = document.createElement("div");
    conditions.textContent = weatherData.currentConditions.conditions;

    const description = document.createElement("div");
    description.textContent = weatherData.description;

    container.append(address);
    container.append(conditions);
    container.append(description);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    getWeatherData(data.get("coords")).then((weatherData) =>
        updateUI(weatherData)
    );
    // updateUI(getWeatherData(data.get("coords")));
});
