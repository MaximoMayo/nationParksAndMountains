"use strict";

//importing the arrays from other js files to use on this one
import { locationsArray } from './locationData.js';
import { nationalParksArray } from './nationalParkData.js';
import { parkTypesArray } from './parkTypeData.js';

//putting global variables and initalizing the javascript
document.addEventListener("DOMContentLoaded", init);
const typeFilter = document.getElementById("typeFilter");
const parkFilter = document.getElementById("parkFilter");
const resultParkContainer = document.getElementById("resultParkContainer");

//this will preform the dropdown and add event listeners to dynamically change the type filter and dropdown
function init() {
    populateDropdownParks();
    setupEventListenersParks();
}

//this function will determine if the type is either loc or type and use their respective dropdowns
function populateDropdownParks(){
    parkFilter.innerHTML = "";
    if(typeFilter.value == "location"){
        populateDropdownParksLocation();
    } 
    else if (typeFilter.value == "type"){
        populateDropdownParksType();
    }
}

//loc dropdown
function populateDropdownParksLocation() { 
    const fragment = document.createDocumentFragment(); 
    locationsArray.forEach((location) => {
      const option = new Option(`${location} `, location);
      fragment.appendChild(option); 
    });
    parkFilter.appendChild(fragment);
}

//type dropdown
function populateDropdownParksType() { 
    const fragment = document.createDocumentFragment(); 
  
    parkTypesArray.forEach((parkType) => {
      const option = new Option(`${parkType} `, parkType);
      fragment.appendChild(option); 
    });
    parkFilter.appendChild(fragment);
}

//this event listener will make the dropdown and the filter functions dynamic
function setupEventListenersParks(){
    typeFilter.addEventListener("change", function() {
        populateDropdownParks();
        selectFilterFunction(); // Call selectFilterFunction to set up the appropriate filter based on the selected type
    });
}

//this will determine from the typeFilter whether it should use the loc table or type table
function selectFilterFunction() {
    const selectedFilter = typeFilter.value;

    //this removes so that the site remains dynamic by letting a different filter replace the last one
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

//will filter by the chosen state and where its included in the nationalParksArray
function filterParkLocation(){
    const selectedLocation = parkFilter.value;
    const filteredParks = nationalParksArray.filter(park => park.State.includes(selectedLocation));
    displayFilteredParks(filteredParks, ["LocationID", "LocationName", "Address", "Phone", "Visit"]);
}

//will filter by the chosen LocationName and where its included in the nationalParksArray
function filterParkType(){
    const selectedType = parkFilter.value;
    const filteredParks = nationalParksArray.filter(park => park.LocationName.includes(selectedType));
    displayFilteredParks(filteredParks, ["LocationID", "LocationName", "Address", "Phone", "Visit"]);
}

//this function focuses on reporting if there is no park and by combining the last two functions to send to the html
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

//this function creates the table and make a layout so that the next function can fill it out
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

//this function will add all of the information needed into the table
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