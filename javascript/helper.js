import * as Formulas from "./configs/tempFormulas.js";
import * as Temp from "./configs/tempConfig.js";
import { setLastCityElement } from "./cityStorage.js";

export function dd(...args) {
    console.log(...args);

    throw new Error("dd: execution halted");
}

/**
 * handles errors by displaying an error message in the specified HTML element.
 * @param {string} errorMessage 
 * @param {string} errorId 
 */
export function errorHandler(errorMessage, errorId) {
    const errorElement = document.getElementById(errorId);

    if (errorElement) {
            errorElement.textContent = errorMessage;
        showElement(errorElement.id);  
        
        setTimeout(() => {
            hideElement(errorElement.id);
        }, 3000);
    } else {
        throw new Error("Could not find error element.");
    }
}

/**
 * Waits till a event is given from the given element.
 * @param {string} element 
 * @param {string} eventName 
 * @returns 
 */
export function waitForEvent(element, eventName) {
    return new Promise((resolve) => {
        element.addEventListener(eventName, (event) => {
            resolve(event);
        }, { once:true });
    });
}

/**
 * Checks if an element exists in the DOM for the given amount of time.
 * @param {string} selector 
 * @param {int} timeOut 
 * @returns promise resolve or reject.
 */
export function waitForElement(selector, timeOut = 3000) {
    return new Promise((resolve, reject) => {
        const promiseElement = document.querySelector(selector);

        // Checks if the promise element exist.
        if (promiseElement) {
            return resolve(promiseElement);
        }

        const observer = new MutationObserver(() => {
            const observerElement = document.querySelector(selector);
            if (observerElement) {
                observer.disconnect();
                resolve(observerElement);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });


        // After the given time out time, give an error.
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Time out! Element ${selector} not found`));
        }, timeOut);
    });
}

/**
 * Shows an HTML element by removing the "hidden" class from it.
 * @param {string} id 
 */
export function showElement(id) {
    document.getElementById(id).classList.remove("hidden");
}

/**
 * Removes an HTML element by adding the "hidden" class to it.
 * @param {string} id 
 */
export function hideElement(id) {
    document.getElementById(id).classList.add("hidden");
}

/**
 * Function to handle the back button click event
 */
export function backButton() {
    const weatherResult = document.getElementById("weather-result");
    const formInput = document.getElementById("city-input");

    // Sets the last city element
    setLastCityElement();

    // Hides and shows the weather result and input form 
    hideElement(weatherResult.id)
    showElement(formInput.id);
}

/**
 * Checks if the data exists in the weather data object.
 * @param {object} data 
 * @returns true || false
 */
export function isValidWeatherData(data) {
    return (
        data &&
        data.name &&
        data.main.temp && 
        data.weather[0].description &&
        data.sys.country
    )
}

/**
 * Returns the new weather temprature based on the given temp option.
 * @param {string} tempOption 
 * @param {int} weatherTemp 
 * @returns {int} 
 */
export function calculateTemp(tempOption, weatherTemp) {
    if (tempOption) {
        switch (tempOption) {
            case "standard":
                var newTemp = Number(Formulas.KToK(weatherTemp).toFixed(2));
                return newTemp;

            case "metric":
                var newTemp = Number(Formulas.KtoC(weatherTemp).toFixed(2));
                return newTemp;
                
            case "imperial":
                var newTemp = Number(Formulas.KToF(weatherTemp).toFixed(2));
                return newTemp;
        
            default:
                throw new Error("Given temp option is not valid");
        }
    } else {
        return Number(Formulas.KtoC(weatherTemp).toFixed(2));
    }
}


export function getTempCymbal(tempOption) {
    if (tempOption) {
        return Temp.tempIcons[tempOption];
    } else {
        return Temp.tempIcons.metric;
    }
}