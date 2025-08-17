import * as Helper from "../helper.js";
import { renderMemory } from "./memoryStorage.js"
import { getTempOption } from "../tempStorage.js";

document.addEventListener("DOMContentLoaded", () => {
    const memoryContainer = document.getElementById("memory-element");
    const memoryUL = document.getElementById("memoryUL");

    // When event is given, update the memory container to new temp type.
    document.addEventListener("updateMemoryTemp", () => {
        renderMemory();
    });
});