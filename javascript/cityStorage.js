import * as Helper from "./helper.js";
import { displayWeather } from "./displayWeather.js";


// On page load, checks if city is in localStorage and show the weather data.
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    // Waits till the weather-display element is loaded.
    Helper.waitForElement("#back-button")
        .then(() => {
            if (getLastCity()) {
                displayWeather(JSON.parse(getLastCity()));
            }
        })
});

/**
 * Sets the Last visited city in local storage.e
 * @param {Object} city 
 */
export function setCityStorage(city) {
    localStorage.setItem('lastCity', JSON.stringify(city));
}

/**
 * Returns the last visited city from local storage.
 * @returns {string} 
 */
export function getLastCity() {
    return localStorage.getItem('lastCity');
}

/**
 * Displays the last city element on the input form.
 */
export function setLastCityElement() {
    const title = "Last Searched City:";
    const lastCity = JSON.parse(getLastCity());

    if (lastCity) {
        const lastSearchElement = document.getElementById("last-search-element");
        const lastCityTitle = document.getElementById("last-city-title");
        const lastCityElement = document.getElementById("last-city");

        if (lastSearchElement && lastCityTitle && lastCityElement) {
            lastSearchElement.classList.remove("hidden");
            lastCityTitle.textContent = title;
            lastCityElement.textContent = lastCity.name;
        } else {
            errorHandler("Last search element or title not found.", "error-message");
            throw new Error("Last search element or title not found");
        }

        Helper.showElement(lastCityElement.id);
    }   
}