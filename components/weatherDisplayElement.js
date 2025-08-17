import { waitForElement } from "../javascript/helper.js";

class weatherDisplayElement extends HTMLElement  {
    async connectedCallback() {
        try {
            const resource = await fetch('components/resources/weatherDisplayElement.html')
                .then(response => response.text());

            this.innerHTML = resource;
        } catch (error) {
            throw new Error("WeatherDisplayElement could not be loaded: " + error.message);
        }

        // Waits till the weather display element is loaded and gives the loaded event. .
        waitForElement("#back-button")
            .then(() => {
                this.isLoaded = true;
                this.dispatchEvent(new Event('weatherDisplay-element-loaded', { bubbles: true }));
            })
            .catch((error) => {
                throw new Error("Something went wrong while waiting for the weather display element: " + error.message);
            })
    }
}

customElements.define('weather-display-element', weatherDisplayElement);