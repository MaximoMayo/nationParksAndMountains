"use strict";

import { locationsArray } from './locationData.js';
import { nationalParksArray } from './nationalParkData.js';
import { parkTypesArray } from './parkTypeData.js';

document.addEventListener("DOMContentLoaded", init);
const typeFilter = document.getElementById("typeFilter");
const parkFilter = document.getElementById("parkFilter");
const resultParkContainer = document.getElementById("resultParkContainer");

function init() {
    populateDropdownParks();
    setupEventListenersParks();
}

function populateDropdownParks(){
    parkFilter.innerHTML = "";
    if(typeFilter.value == "location"){
        populateDropdownParksLocation();
    } 
    else if (typeFilter.value == "type"){
        populateDropdownParksType();
    }
}

function populateDropdownParksLocation() { 
    const fragment = document.createDocumentFragment(); 
    locationsArray.forEach((location) => {
      const option = new Option(`${location} `, location);
      fragment.appendChild(option); 
    });
    parkFilter.appendChild(fragment);
}

function populateDropdownParksType() { 
    const fragment = document.createDocumentFragment(); 
  
    parkTypesArray.forEach((parkType) => {
      const option = new Option(`${parkType} `, parkType);
      fragment.appendChild(option); 
    });
    parkFilter.appendChild(fragment);
}

function setupEventListenersParks(){
    typeFilter.addEventListener("change", function() {
        populateDropdownParks();
        selectFilterFunction(); // Call selectFilterFunction to set up the appropriate filter based on the selected type
    });
}

function selectFilterFunction() {
    const selectedFilter = typeFilter.value;
    parkFilter.removeEventListener("change", filterParkLocation);
    parkFilter.removeEventListener("change", filterParkType);

    if (selectedFilter === "location") {
        parkFilter.addEventListener("change", filterParkLocation);
        // Initially trigger the filtering function
        filterParkLocation();
    } else if (selectedFilter === "type") {
        parkFilter.addEventListener("change", filterParkType);
        // Initially trigger the filtering function
        filterParkType();
    }
}

function filterParkLocation(){
    const selectedLocation = parkFilter.value;
    const filteredParks = nationalParksArray.filter(park => park.State.includes(selectedLocation));
    displayFilteredParks(filteredParks, ["LocationID", "LocationName", "Address", "Phone", "Visit"]);
}

function filterParkType(){
    const selectedType = parkFilter.value;
    const filteredParks = nationalParksArray.filter(park => park.LocationName.includes(selectedType));
    displayFilteredParks(filteredParks, ["LocationID", "LocationName", "Address", "Phone", "Visit"]);
}

function displayFilteredParks(filteredParks, fields){
    resultParkContainer.innerHTML = "";

    if (filteredParks.length === 0) {
        resultParkContainer.textContent = "No parks found.";
        return;
    }

    const table = createTable(fields);
    populateTableRows(table, filteredParks, fields);

    resultParkContainer.appendChild(table);
}

function createTable(fields){
    const table = document.createElement("table");
    table.classList.add("park-table");

    const headerRow = document.createElement("tr");
    fields.forEach(field => {
        const headerCell = document.createElement("th");
        headerCell.textContent = field === "LocationID" ? "Location" : field === "LocationName" ? "Name" : field === "Visit" ? "URL" : field;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    return table;
}

function populateTableRows(table, parks, fields){
    parks.forEach(park => {
        const row = document.createElement("tr");
        fields.forEach(field => {
            const cell = document.createElement("td");
            cell.textContent = park[field];
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}