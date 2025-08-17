import * as Helper from "./helper.js";
import { tempIcons } from "./configs/tempConfig.js";
import { getTempOption } from "./tempStorage.js";

/**
 *  Hides the input element and displays the weather element.
 * @param {object} weatherData 
 */
export function displayWeather(weatherData) {
    const inputElement = document.getElementById("city-input");
    const weatherDisplayElement = document.getElementById("weather-result");

    // Checks if the weatherDisplayElement is loaded.
    if (weatherDisplayElement && weatherDisplayElement.isLoaded == true) {
        // Sets the weather data in de DOM element.
        handleWeatherData(weatherData);

        // Hides and displays the DOM elements.
        Helper.hideElement(inputElement.id);
        Helper.showElement(weatherDisplayElement.id);

        weatherDisplayElement.dispatchEvent(new Event('weather-display-displaying', { bubbles: true }))
    } else {
        errorHandler("Weather display element could not be loaded.", "error-message");
        throw new Error("Weather display element could not be loaded");
    }
}

/**
* Handles the weather data by extracting the relevant information and updating the HTML elements.
* It updates the temperature, weather type, and location in the specified HTML elements.
* 
* @param {object} data - The weather data object returned from the OpenWeatherMap API.
* @param {object} data 
*/
function handleWeatherData(data) {
    // HTML Elements
    const temperatureElement = document.getElementById("temperature");
    const weatherTypeElement = document.getElementById("weather-type");
    const locationElement = document.getElementById("location");

    // Weather Data
    const temperature = Helper.calculateTemp(getTempOption(), data.main.temp);
    const weatherType = data.weather[0].description;
    const location = data.name;
    const country = data.sys.country;

    // Sets the temperature and weather type
    temperatureElement.textContent = `${temperature} ${tempIcons[getTempOption()]}`;
    weatherTypeElement.textContent = weatherType;
    locationElement.textContent = `${location}, ${country}`;
}