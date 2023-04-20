// importing common function and variables from common_functiionality.js file

import {
  superheroesContainer,
  searchBox,
  searchHeroes,
  saveIdIntoSessionStroage,
  removeFavouriteHero,
} from "./common_functionality.js";

//function to add favourites heroes into DOM
function addElementToDOM(superhero) {
  const div = document.createElement("div");
  div.id = "super-hero";
  div.className =
    "col-12 col-md-6 col-lg-4 col-xl-3  col-xxl-2 d-flex justify-content-center ";
  div.innerHTML = `
    <div id="card-div"
      class="card mb-5 "
      style="min-width:200px;width: 234px;min-height:313.6px;"
    >
      <img
        src="${superhero.image}"
        class="card-img-top"
        alt="${superhero.name} picture"
        id="${superhero.id}"
      />
      <div class="card-body">

        <h5 class="card-title">${superhero.name}</h5>

        <a href="../views/character_details.html" id="${superhero.id}" class="card-link">more details</a>
        <a href="" class="heart-color"
          ><i id="fav-${superhero.id}" class="fa-solid fa-heart"></i
        ></a>
      </div>
    </div>
 `;

  superheroesContainer.appendChild(div);

  // adding favourite class in all favourite superhero card
  let favIcon = document.querySelector(`#fav-${superhero.id}`);
  favIcon.classList.add("favourite");
  return;
}

function renderSuperheros(superheroes) {
  superheroesContainer.innerHTML = "";

  for (let i = 0; i < superheroes.length; i++) {
    addElementToDOM(superheroes[i]);
  }
  return;
}

//Renders all favourite superheroes in favourites page
function favouriteHeroRender() {
  let favHero = JSON.parse(localStorage.getItem("favourites"));
  if (favHero.length > 0) {
    console.log(favHero.length);
    renderSuperheros(favHero);
  } else {
    let messageDiv = document.createElement("div");
    messageDiv.className = "message-div";
    messageDiv.innerHTML = `<h1> NO FAVOURITE HERO FOUND</h1>`;
    superheroesContainer.appendChild(messageDiv);
  }
  return;
}

// Handle all type of click event
function clickEventHandler(event) {
  const target = event.target;

  if (target.classList[2] == "favourite") {
    let favHeroId = target.id;
    removeFavouriteHero(favHeroId);
    favouriteHeroRender();
    return;
  } else if (target.classList[1] == "fa-heart") {
    let id = target.id;

    for (let ele of superheroes) {
      if (`fav-${ele.id}` == id) {
        saveLocally(ele);
        break;
      }
    }
    return;
  } else if (target.innerText == "more details") {
    saveIdIntoSessionStroage(target.id);
  }
}

// //handle keyup event fro searching superhero among favourites superheroes
function keypressEventHandler(event) {
  if (searchBox.value.length > 0) {
    searchHeroes();
    return;
  }

  // if the search is empty again then render all favourites superheroes
  if (event.key == "Backspace" && searchBox.value.length == 0) {
    favouriteHeroRender();
    return;
  }
}

// calling favouriteHeroRender function and initialize click and keyup event listener
function initialize() {
  favouriteHeroRender();

  // click event deligation
  document.addEventListener("click", clickEventHandler);
  // eventListener for keyup event on searchBox
  searchBox.addEventListener("keyup", keypressEventHandler);
}

// calling initialize function when page load on browser
initialize();
