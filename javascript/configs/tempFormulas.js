/**
 * Converteert een temperatuur in Kelvin naar Fahrenheit.
 * Formule: (K − 273.15) × 9/5 + 32
 * @param {number} kel - Temperatuur in Kelvin.
 * @returns {number} Temperatuur in Fahrenheit.
 */
export function KToF(kel) {
    return (kel - 273.15) * 9/5 + 32;
}

/**
 * Geeft dezelfde temperatuurwaarde in Kelvin terug.
 * Handig als placeholder of voor consistentie in conversies.
 * @param {number} kel - Temperatuur in Kelvin.
 * @returns {number} Dezelfde temperatuur in Kelvin.
 */
export function KToK(kel) {
    return kel;
}

/**
 * Converteert een temperatuur in Kelvin naar Celsius.
 * Formule: K − 273.15
 * @param {number} kel - Temperatuur in Kelvin.
 * @returns {number} Temperatuur in Celsius.
 */
export function KtoC(kel) {
    return kel - 273.15;
}