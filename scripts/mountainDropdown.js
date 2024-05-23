document.addEventListener("DOMContentLoaded", init);

function init() {
  populateDropdown(); 
  setupEventListeners()
  
}


function populateDropdown() {
    const dropdown = document.getElementById("mountainsDropdown"); 
    const fragment = document.createDocumentFragment(); 
  
    mountainsArray.forEach((mountains) => {
      const option = document.createElement("option");
      option.value = mountains.name; 
      option.textContent = `${mountains.name} `; 
      fragment.appendChild(option); 
    });
    dropdown.appendChild(fragment);
  }

  function setupEventListeners() {

    document.getElementById("mountainsDropdown").addEventListener("change", showSelectedMountain);
    document.getElementById("mountainsDropdown").addEventListener("change", displayMountains);
    
}

  function showSelectedMountain() {

    document.getElementById("dropdown").textContent = document.getElementById("mountainsDropdown").value
  }

  function displayMountains() {
    const mountainList = document.getElementById('mountainList');
    mountainList.innerHTML = '';

    mountainsArray.forEach(mountain => {
      const card = document.createElement('div');
      card.className = 'card mb-4';

      card.innerHTML = `
        <img src="${mountain.img}" class="card-img-top" alt="${mountain.name}">
        <div class="card-body">
          <h5 class="card-title">${mountain.name}</h5>
          <p class="card-text">${mountain.elevation}</p>
          <p class="card-text">${mountain.effort}</p>
          <p class="card-text">${mountain.desc}</p>
          <p class="card-text">${mountain.coords}</p>
        </div>
      `;

      mountainList.appendChild(card);
    });
  }





//   function showSelectedMountainChange() {
//     const dropdown = document.getElementById("mountainsDropdown"); 
//     const selectedMountainName = dropdown.value; 
//     const detailsArea = document.getElementById("dropdown");
  

//     const selectedMountain = mountainsArray.find(
//       (mountains) => mountains.name === selectedMountainName
//     );
  
//     if (selectedMountain) {
      
//       detailsArea.innerHTML = `
//               <strong>Name:</strong> ${selectedMountain.name}<br>
//               <strong>Elevation:</strong> ${selectedMountain.elevation}<br>
//               <strong>Effort:</strong> ${selectedMountain.effort}<br>
//               <strong>desc:</strong> ${selectedMountain.desc}<br>
//               <img src="${selectedMountain.img}">

//           `;
//     } else {
     
//       detailsArea.innerHTML = "No mountain selected.";
//     }
//   }