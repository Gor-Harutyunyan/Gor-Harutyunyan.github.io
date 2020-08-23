import { debounce } from "../Helpers/debounce.js";

const searchInput = document.querySelector(".search-input");
const countries = document.querySelector(".countries");
const logOut = document.querySelector(".logOut");

const state = {
  countryName: "",
  favoriteCountries: JSON.parse(localStorage.getItem("favCountries")) || [],
};

render();

const effectiveRender = debounce(render, 1000);

searchInput.addEventListener("input", (e) => {
  state.countryName = e.target.value;
  effectiveRender();
});

/**
 * fetches data from server depending on users search input
 * @param {string} name - name of the country
 */
async function doGet(name) {
  let response = name
    ? fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    : fetch("https://restcountries.eu/rest/v2/all");
  let json = await response;
  let result = await json.json();
  return result;
}

/**
 * for each country renders a card with information, or an error message if data is not found
 */
async function render() {
  countries.innerHTML = "";
  const data = await doGet(state.countryName);
  if (data.status === 404) {
    renderErrorMessage();
  } else {
    data.forEach(({ name, capital, population, flag }) => {
      createCard(name, capital, population, flag);
    });
  }
}

/**
 * renders message in case no data found or server down
 */
function renderErrorMessage() {
  const h2 = document.createElement("h2");
  h2.innerText = "There is no such country, please type real country name";
  countries.append(h2);
}

/**
 * creates html element using info about country
 * @param {string} name - name of the country
 * @param {string} capital - capital of the country
 * @param {number} population - population of the country
 * @param {string} flag - URL to countries flag image
 */
function createCard(name, capital, population, flag) {
  const card = document.createElement("div");
  const flagContainer = document.createElement("div");
  const img = document.createElement("img");
  const content = document.createElement("div");
  const h1 = document.createElement("h1");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const fav = document.createElement("span");

  card.classList.add("country-card");
  flagContainer.classList.add("flag");
  content.classList.add("content");
  fav.classList.add("favorite");

  fav.addEventListener("click", (e) => {
    favCountriesHandler(e, name, capital, population, flag);
  });

  img.setAttribute("src", `${flag}`);
  flagContainer.append(img);

  h1.innerText = `Name: ${name}`;
  p1.innerText = `Capital: ${capital}`;
  p2.innerText = `Population: ${population}`;
  if (state.favoriteCountries.length === 0) {
    fav.innerHTML = "☆";
  } else {
    state.favoriteCountries.forEach((country) => {
      if (country.name.toLowerCase() === name.toLowerCase) {
        console.log("true");
        fav.innerHTML = "★";
        return;
      } else {
        fav.innerHTML = "☆";
      }
    });
  }

  content.append(h1, p1, p2, fav);

  card.append(flagContainer, content);
  countries.append(card);
}

function favCountriesHandler(event, ...rest) {
  if (event.target.innerText === "☆") {
    event.target.innerHTML = "★";
    addCountryToState(rest);
  } else {
    event.target.innerHTML = "☆";
    removeCountryFromState(rest);
  }
}

function addCountryToState([name, capital, population, flag]) {
  const country = {};
  country.name = name;
  country.capital = capital;
  country.population = population;
  country.flag = flag;
  state.favoriteCountries.push(country);
  localStorage.setItem("favCountries", JSON.stringify(state.favoriteCountries));
}

function removeCountryFromState([name]) {
  let favCountries = state.favoriteCountries;
  for (let i = 0; i < favCountries.length; i++) {
    if (favCountries[i].name === name) {
      favCountries.splice(favCountries[i], 1);
    }
  }
  localStorage.setItem("favCountries", JSON.stringify(state.favoriteCountries));
}

logOut.addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("favCountries");
});
