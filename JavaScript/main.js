const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "63dd722f";
const APP_key ="f44ec973bf63c9e5a7be5e50e002eb54";



searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchAPI();
  });

  async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
  }

  function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";
    results.map((result) => {
      generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" target="_blank" href="${result.recipe.url}">View Recipe</a>
          </div>
          <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
        </div>
      `;
    });
    searchResultDiv.innerHTML = generatedHTML;
  }