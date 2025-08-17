import { waitForElement } from "../javascript/helper.js";
import { setLastCityElement } from "../javascript/cityStorage.js";

class inputElement extends HTMLElement {
    async connectedCallback() {
        try {
            const resource = await fetch('components/resources/InputElement.html')
                .then(response => response.text());
                
            this.innerHTML = resource;
        } catch (error) {
            throw new Error("inputElement could not be loaded: " + error.message);
        }

        // Waits till the element is loaded then sets the last city element and dispatches the load event.
        waitForElement("#city-submit-button")
            .then(() => {
                setLastCityElement()

                this.isLoaded = true;
                this.dispatchEvent(new Event('input-element-loaded', { bubbles: true }));
            })
            .catch((error) => {
                throw new Error("Could not load last city or the input element: " + error.message);
            })
    }
}
        
customElements.define('input-element', inputElement);