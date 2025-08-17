import { waitForElement } from "../javascript/helper.js";

class weatherCard extends HTMLElement {
    async connectedCallback() {
        try {
            const resource = await fetch('components/resources/weatherCard.html')
                .then(response => response.text());

            this.innerHTML = resource;
        } catch (error) {
            throw new Error("weatherCard could not be loaded: " + error.message);   
        }

        // Sets the custom attributes.
        const city = this.getAttribute("city");
        const temp = this.getAttribute("temp");
        const cymbal = this.getAttribute("cymbal");

        this.querySelector("#city-name").textContent = city;
        this.querySelector("#temp-amount").textContent = temp;
        this.querySelector("#temp-cymbal").textContent = cymbal;

        // Waits till the element is loaded then sets the last city element and dispatches the load event.
        waitForElement("#weather-logo")
            .then(() => {
                this.isLoaded = true;
                this.dispatchEvent(new Event('weatherCard-element-loaded', { bubbles: true }));
            })
            .catch((error) => {
                throw new Error("Could not load last city or the input element: " + error.message);
            })
    }
}

customElements.define('weather-card', weatherCard);