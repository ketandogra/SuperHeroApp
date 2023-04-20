// importing common function and variables from common_functiionality.js file

import {
  superheroesContainer,
  searchBox,
  removeFavouriteHero,
  searchHeroes,
  saveIdIntoSessionStroage,
} from "./common_functionality.js";

let spinner = document.getElementById("spinner");
let superheroes = [];
let favouriteHero = [];

// function for hiding the loading when data load during fetch api call
function hideLoading() {
  spinner.style.setProperty("display", "none", "important");

  return;
}

//function for fetch all superheroes
async function fetchSuperheroes() {
  // Get request
  try {
    const response = await fetch(
      "https://gateway.marvel.com/v1/public/series/1945/characters?ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f"
    );

    hideLoading();
    const data = await response.json();
    superheroes = await data.data.results.slice(0, 18);
    renderSuperheros(superheroes);
  } catch (err) {
    console.log("Error:", err);
    return;
  }
}

// function to Add all fetched superhero into DOM or index.html file
function addElementToDOM(superhero) {
  const div = document.createElement("div");
  div.id = "super-hero";
  div.className =
    "col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 d-flex justify-content-center  ";
  div.innerHTML = `
    <div id="card-div"
      class="card mb-5 "
      style="min-width:200px;width:234px"
    >
      <img id="superhero-card-img"
        src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}"
        class="card-img-top"
        alt="${superhero.name} picture"
        id="${superhero.id}" 
      />
      <div class="card-body">

        <h5 class="card-title">${superhero.name}</h5>

        <a href="./views/character_details.html" id="${superhero.id}" class="card-link">more details</a>
        <a href="#" class="heart-color"
          ><i id="fav-${superhero.id}" class="fa-solid fa-heart"></i
        ></a>
      </div>
    </div>
 `;
  // all div as a child  into superheroesContainer
  superheroesContainer.appendChild(div);

  // check whether the superhero present in favourites array or not during rending time
  // favourites is array which stored in local storage of the broswer
  // if superhero is present then add favourite class into favIcon and turn into red
  let favHero = JSON.parse(localStorage.getItem("favourites"));
  if (favHero !== null) {
    for (let i = 0; i < favHero.length; i++) {
      if (favHero[i].id == superhero.id) {
        let favIcon = document.querySelector(`#fav-${superhero.id}`);

        favIcon.classList.add("favourite");
      }
    }
  }

  return;
}

// function for rendering all superhero at home page
function renderSuperheros(superheroes) {
  superheroesContainer.innerHTML = "";

  for (let i = 0; i < superheroes.length; i++) {
    addElementToDOM(superheroes[i]);
  }
  return;
}

// function to save favourites heroes in local storage of the browser
function saveLocally(ele) {
  favouriteHero = JSON.parse(localStorage.getItem("favourites"));
  if (favouriteHero == null) {
    favouriteHero = [];
  }
  let favHeroObj = {
    id: ele.id,
    name: ele.name,
    image: `${ele.thumbnail.path}.jpg`,
  };
  favouriteHero.push(favHeroObj);

  localStorage.setItem("favourites", JSON.stringify(favouriteHero));
}

// Handle all type of click event - event deligation
function clickEventHandler(event) {
  const target = event.target;

  // handles toggle of favourites or not favourites click
  if (target.classList[2] == "favourite") {
    let favHeroId = target.id;
    removeFavouriteHero(favHeroId);
    renderSuperheros(superheroes);
    return;
  } else if (target.classList[1] == "fa-heart") {
    let id = target.id;

    for (let ele of superheroes) {
      if (`fav-${ele.id}` == id) {
        saveLocally(ele);
        // fetchSuperheroes();
        renderSuperheros(superheroes);

        break;
      }
    }
    return;
  } else if (target.innerText == "more details") {
    //handles more details click and save click super hero id into session storage
    saveIdIntoSessionStroage(target.id);
    return;
  }
}

// fucntion to handle all key event on search bar on home page and call searchHeroes function based on inside condition
function keypressEventHandler(event) {
  if (searchBox.value.length > 0) {
    searchHeroes();
    return;
  }

  if (event.key == "Backspace" && searchBox.value == "") {
    fetchSuperheroes();
    return;
  }
}

function initializeApp() {
  fetchSuperheroes();
  // click event deligation
  document.addEventListener("click", clickEventHandler);
  //eventListener for keyup event
  searchBox.addEventListener("keyup", keypressEventHandler);
}

// call initializeApp fucntion when page loads.
initializeApp();
