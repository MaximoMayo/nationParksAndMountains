"use strict";

import { locationsArray } from './locationData.js';
import { nationalParksArray } from './nationalParkData.js';
import { parkTypesArray } from './parkTypeData.js';

document.addEventListener("DOMContentLoaded", init);
const typeFilter = document.getElementById("typeFilter");
const parkFilter = document.getElementById("parkFilter");
const resultParkContainer = document.getElementById("resultParkContainer");

function init() {
    setupEventListenersParks();
    populateDropdownParks();
}

function populateDropdownParks(){
    parkFilter.innerHTML = "";
    if(typeFilter.value == "location"){
        populateDropdownParksLocation();
    }
    else{
        populateDropdownParksType();
    }
}

function populateDropdownParksType() { 
    const fragment = document.createDocumentFragment(); 
  
    parkTypesArray.forEach((park) => {
      const option = new Option(`${park} `, park);
      fragment.appendChild(option); 
    });
    parkFilter.appendChild(fragment);
}

function populateDropdownParksLocation() { 
    const fragment = document.createDocumentFragment(); 
    locationsArray.forEach((park) => {
      const option = new Option(`${park} `, park);
      fragment.appendChild(option); 
    });
    parkFilter.appendChild(fragment);
}

function setupEventListenersParks(){
    typeFilter.addEventListener("change", selectFilterFunction());
    typeFilter.addEventListener("change", populateDropdownParks);
}

function selectFilterFunction() {
    const selectedFilter = typeFilter.value;
    console.log(selectedFilter);
    if (selectedFilter === "location") {
        parkFilter.addEventListener("change",filterParkLocation());
    } else if (selectedFilter === "type") {
        parkFilter.addEventListener("change",filterParkType());
    }
}


function filterParkLocation(){
    const selectedPark = parkFilter.value;
    const filteredParks = nationalParksArray.filter(location => location.State.includes(selectedPark));
    resultParkContainer.innerHTML = "";

    // Create a table element
    const table = document.createElement("table");
    table.classList.add("park-table");

    // Create table headers
    const headerRow = document.createElement("tr");
    const headers = ["LocationID", "Name", "Address", "Phone", "URL"];
    headers.forEach(headerText => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // Append filtered parks to the table
    filteredParks.forEach(park => {
        const row = document.createElement("tr");
        const parkIDCell = document.createElement("td");
        parkIDCell.textContent = park.LocationID;
        row.appendChild(parkIDCell);

        const parkNameCell = document.createElement("td");
        parkNameCell.textContent = park.LocationName;
        row.appendChild(parkNameCell);

        const addressCell = document.createElement("td");
        addressCell.textContent = park.Address;
        row.appendChild(addressCell);

        const phoneCell = document.createElement("td");
        phoneCell.textContent = park.Phone;
        row.appendChild(phoneCell);

        const urlCell = document.createElement("td");
        urlCell.textContent = park.Visit;
        row.appendChild(urlCell);

        table.appendChild(row);
    });

    // Append table to the result container
    resultParkContainer.appendChild(table);
}

function filterParkType(){
    const selectedPark = parkFilter.value;
    const filteredParks = nationalParksArray.filter(location => location.LocationName.includes(selectedPark));
    resultParkContainer.innerHTML = "";

    // Create a table element
    const table = document.createElement("table");
    table.classList.add("park-table");

    // Create table headers
    const headerRow = document.createElement("tr");
    const headers = ["LocationID", "Name", "Address", "Phone", "URL"];
    headers.forEach(headerText => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // Append filtered parks to the table
    filteredParks.forEach(park => {
        const row = document.createElement("tr");
        const parkIDCell = document.createElement("td");
        parkIDCell.textContent = park.LocationID;
        row.appendChild(parkIDCell);

        const parkNameCell = document.createElement("td");
        parkNameCell.textContent = park.LocationName;
        row.appendChild(parkNameCell);

        const addressCell = document.createElement("td");
        addressCell.textContent = park.Address;
        row.appendChild(addressCell);

        const phoneCell = document.createElement("td");
        phoneCell.textContent = park.Phone;
        row.appendChild(phoneCell);

        const urlCell = document.createElement("td");
        urlCell.textContent = park.Visit;
        row.appendChild(urlCell);

        table.appendChild(row);
    });

    // Append table to the result container
    resultParkContainer.appendChild(table);
}
