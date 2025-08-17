import './helper.js';
import './displayWeather.js';
import './api.js';
import './cityStorage.js';
import './configs/config.js';
import './configs/tempConfig.js';
import './tempStorage.js';
import './memory/memoryStorage.js';
import './memory/memoryUpdate.js';
import  './configs/memoryConfig.js';
import  './configs/tempFormulas.js';

import { backButton } from "./helper.js";
import { setTempOption } from "./tempStorage.js";

// Sets global functions for the HTML files.
document.addEventListener("DOMContentLoaded", () => {
    window.backButton = backButton;
    window.setTempOption = setTempOption;
})