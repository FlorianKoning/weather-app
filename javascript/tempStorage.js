import * as Helper from "./helper.js";
import * as TempConfig from "./configs/tempConfig.js";
import * as CityStorage from "./cityStorage.js";
import { errorHandler } from "./helper.js";

const storageKey = "tempOptions";

// Loads in temp options. 
document.addEventListener("DOMContentLoaded", () => {
    Helper.waitForElement("#temp-button")
        .then(() => {
            if (getTempOption()) {
                updateTempElement();
            } else {
                localStorage.setItem(storageKey, TempConfig.tempArray[0]);
                updateTempElement();
            }
        });
});

/**
 * Returns the temperature option.
 * @returns {string}
 */
export function getTempOption() {
    return localStorage.getItem(storageKey)
}

/**
 * Sets the new temp option in LocalStorage.
 * @returns {void}
 */
export function setTempOption() {  
    const currentOption = getTempOption();
    const currentIndex = TempConfig.tempArray.indexOf(currentOption);
    const nextIndex = (currentIndex + 1) % TempConfig.tempArray.length;

    localStorage.setItem(storageKey, TempConfig.tempArray[nextIndex]);
    updateTempElement();   

    // Dispatches a new event to update the memory array.
    document.dispatchEvent(new Event("updateMemoryTemp"));
}

/**
 * Updates the temp option element.
 * @returns {void}
 */
function updateTempElement() {
    const tempElement = document.getElementById("temp-button");

    tempElement.textContent = TempConfig.tempTranslation[getTempOption()];
}