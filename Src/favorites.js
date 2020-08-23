const favCountries = document.querySelector(".fav-countries");
const state = {};
state.favoriteCountries = JSON.parse(localStorage.getItem("favCountries"));

render();

function render() {
  favCountries.innerHTML = "";
  state.favoriteCountries.forEach(({ name, capital, population, flag }) => {
    createCard(name, capital, population, flag);
  });
}

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
    removeCountryFromState(name);
    render();
  });

  img.setAttribute("src", `${flag}`);
  flagContainer.append(img);

  h1.innerText = `Name: ${name}`;
  p1.innerText = `Capital: ${capital}`;
  p2.innerText = `Population: ${population}`;
  fav.innerHTML = "&#9733";
  content.append(h1, p1, p2, fav);

  card.append(flagContainer, content);
  favCountries.append(card);
}

function removeCountryFromState(name) {
  let favCountries = state.favoriteCountries;
  for (let i = 0; i < favCountries.length; i++) {
    if (favCountries[i].name === name) {
      favCountries.splice(favCountries[i], 1);
    }
  }
  localStorage.setItem("favCountries", JSON.stringify(state.favoriteCountries));
}
