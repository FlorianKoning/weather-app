import * as Helper from "../helper.js";
import * as Memory from '../configs/memoryConfig.js';
import { getTempOption } from "../tempStorage.js";

// When DOM is loaded, wait till the weatherDisplay is loaded.
document.addEventListener("DOMContentLoaded", async () => {
    renderMemory();    

    document.addEventListener("updateMemory", (event) => {
        addMemory(event.detail);
        renderMemory();        
    });
})

export function renderMemory() {
    const memoryUL = document.getElementById("memoryUL");
    let memory = getMemory();


    memoryUL.innerHTML = ""; // resets the UI list.

    if (!memory) {
        return;
    }

    memory.forEach(element => {
        createElement(element);
    });

    displayMemory();
}

/** 
 * Retrieves the memory (weather data) from localStorage.
 * @returns {Array|false} An array of stored memory objects, or `false` if none exist.
 */
export function getMemory() {
    const memoryStorage = JSON.parse(localStorage.getItem(Memory.memoryKey)); 

    if (!memoryStorage) {
        return false;
    }
    
    return memoryStorage;
}

/**
 * Adds a new weather data entry to memory (localStorage).
 * - If the city name already exist, add nothing to the array.
 * - If there are already 4 items stored, the oldest one will be removed.
 * - Data is saved as an object with city name, temperature, and weather type.
 * 
 * @param {Object} data - The raw weather data object (e.g. from an API).
 * @param {string} data.name - The name of the city.
 * @param {Object} data.main - Contains temperature information.
 * @param {number} data.main.temp - The current temperature.
 * @param {Array} data.weather - Array with weather conditions.
 * @param {string} data.weather[0].main - The main weather type (e.g. "Clouds", "Rain").
 */
export function addMemory(data) {
    let memoryArray = (!getMemory()) ? new Array() : getMemory();
    const memoryObject = {
        name: data.name,
        tempAmount: data.main.temp,
        weatherType: data.weather[0].main,
    }

    // Checks if an city already exists in the memory array.
    if (memoryArray.some(element => element.name == data.name)) {
        return;
    }

    // If more than 4 items are stored, remove the first one.
    if (memoryArray.length >= 4) {
        memoryArray.shift();
    }

    memoryArray.push(memoryObject);
    localStorage.setItem(Memory.memoryKey, JSON.stringify(memoryArray));
}

/**
 * Makes the memory display block visible in the UI.
 * Removes the "hidden" class from the memory element.
 */
function displayMemory() {
    const memoryDisplay = document.getElementById("memory-element");
    memoryDisplay.classList.remove("hidden");
}

/**
 * Creates a new <weather-card> element and sets its attributes.
 * The element is then appended to the memory list in the UI.
 * 
 * @param {Object} memoryObject - A memory object with city, temperature, and weather data.
 * @param {string} memoryObject.name - The city name.
 * @param {number} memoryObject.tempAmount - The temperature in the city.
 */
function createElement(memoryObject) {
    const memoryElement = document.createElement("weather-card");

    memoryElement.setAttribute("city", memoryObject.name);
    memoryElement.setAttribute("temp", Helper.calculateTemp(getTempOption(), memoryObject.tempAmount));
    memoryElement.setAttribute("cymbal", Helper.getTempCymbal(getTempOption()));
    memoryElement.className = "flex flex-row min-h-8 gap-4 font-semibold";

    memoryUL.appendChild(memoryElement);
}