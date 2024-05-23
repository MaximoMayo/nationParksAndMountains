"use strict";

import { locationsArray } from './locationData.js';
import { mountainsArray } from './mountainData.js';
import { nationalParksArray } from './nationalParkData.js';
import { parkTypesArray } from './parkTypeData.js';

document.addEventListener("DOMContentLoaded", init);

function init() {
    populateDropdownMountain();
    setupEventListenersMountains();
    //populateDropdownParks();
    //setupEventListenersParks()
}

function populateDropdownMountain() {
    const dropdown = document.getElementById("searchFilter"); 
    const fragment = document.createDocumentFragment(); 
  
    mountainsArray.forEach((mountains) => {
      const option = new Option(`${mountains.name} `, mountains.name);
      fragment.appendChild(option); 
    });
    dropdown.appendChild(fragment);
}

function setupEventListenersMountains(){
    document.getElementById("searchFilter").addEventListener("change", displayMountains);
}

function displayMountains(){
    const selectedMountainName = document.getElementById("searchFilter").value;
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';
  
    const filteredMountain = mountainsArray.find(mountain => mountain.name == selectedMountainName);
        const card = `
            <div class="col-md-4">
                <div class="card">
                    <img src="./images/${filteredMountain.img}" class="card-img-top" alt="${filteredMountain.name}">
                    <div class="card-body">
                        <h5 class="card-title">${filteredMountain.name}</h5>
                        <p class="card-text">${filteredMountain.desc}</p>
                        <p class="card-text"><strong>Effort:</strong> ${filteredMountain.effort}</p>
                        <p class="card-text"><strong>Elevation:</strong> ${filteredMountain.elevation}</p>
                        <p class="card-text"><strong>Lat:</strong> ${filteredMountain.coords.lat}, <strong>Lng:</strong> ${filteredMountain.coords.lng}</p>
                    </div>
                </div>
            </div>
        `;
        resultContainer.innerHTML = card;

}

if (document.getElementById('resultContainer') == null){

}