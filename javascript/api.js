import * as Config from "./configs/config.js";  
import { errorHandler } from "./helper.js";
import { isValidWeatherData } from "./helper.js";
import { setCityStorage } from "./cityStorage.js";
import { getTempOption } from "./tempStorage.js";
import { displayWeather } from "./displayWeather.js";
import { addMemory } from "./memory/memoryStorage.js";

const apiKey = Config.API_KEY;

// Can only be executed when the element is rendered.
document.addEventListener("input-element-loaded", () => {
    const form = document.getElementById("weather-form");
    const formInput = document.getElementById("city");
    

    // Waits for the form to be submited.
    form.addEventListener("submit", async (element) => {
        element.preventDefault(); // Prevents the default form submission behavior.

        let cityInput = formInput.value;
        let apiURL = createURL(cityInput);
        let weatherData = await fetchWeatherData(apiURL);

        // Loads and displays the weather data.
        displayWeather(weatherData);
    });
});

/**
 * Creates the API URL for fetching weather data based on the city input.
 * @param {string} cityInput 
 * @returns {string} The complete API URL.
 */
function createURL(cityInput) {
    if (!getTempOption()) {
        errorHandler("Could not get the temperature option.", "error-message");
        throw new Error("Could not get the temperature option.");
    }

    return `${Config.API_URL}?q=${encodeURIComponent(cityInput)}&appid=${apiKey}`;
}

/**
 * fetches the weather data from the OpenWeatherMap API.
 * @param {string} apiURL 
 * @returns {Promise<Object>} weather data in JSON format
 */
export async function fetchWeatherData(apiURL) {
    const apiData = await fetch(apiURL)
        .then((response) => {
            if (!response.ok) {
                errorHandler("City not found. Please try again.", "error-message");
                throw new Error("City not found");
            }

            return response.json();
        })
        .then((data) => {
            if (!isValidWeatherData(data)) {
                errorHandler("Invalid data was found, try again later.", "error-message");
                throw new Error("Invalid data from the OpenWeather.");
            }  

            setCityStorage(data);

            // Dispatches new event for the memory.
            document.dispatchEvent(new CustomEvent("updateMemory", {
                detail: data,
            }));

            return data;
        })
        .catch((error) => {
            errorHandler("An error occurred while fetching the weather data.", "error-message");
            throw new Error("Fetch error: " + error.message);
        })
    
    return apiData;
}