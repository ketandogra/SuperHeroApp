const superheroId = sessionStorage.getItem("superheroId");
const characterContainer = document.getElementById(
  "character-details-container"
);
const comicsContainer = document.getElementById("comic-div");

const eventsContainer = document.getElementById("events-div");

const seriesContainer = document.getElementById("series-div");

//function for fetch superhero which will be selected for more details
async function fetchSuperhero(superheroId) {
  // Get request
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${superheroId}?ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f`
    );

    const data = await response.json();
    let superhero = await data.data.results;
    renderCharacterDetails(superhero);
  } catch (err) {
    console.log("Error:", err);
    return;
  }
}

//call addCharacterToDOM function to add details of superhero which include comics, series and events details
function renderCharacterDetails(superhero) {
  addCharacterToDOM(superhero);
}

// get all comics details of the selected superhero
async function fetchCharacterComics() {
  // Get request
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${superheroId}/comics?ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f`
    );

    const data = await response.json();
    let comicsData = await data.data.results;
    return comicsData;
  } catch (err) {
    console.log("Error:", err);
    return;
  }
}

// get all series details of the selected superhero
async function fetchCharacterSeries() {
  // Get request
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${superheroId}/series?ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f`
    );

    const data = await response.json();
    let seriesData = await data.data.results;
    return seriesData;
  } catch (err) {
    console.log("Error:", err);
    return;
  }
}

// get all series details of the selected superhero
async function fetchCharacterEvents() {
  // Get request
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${superheroId}/events?ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=d35377547e551cd64a60657d2517bb7f`
    );

    console.log(response);
    const data = await response.json();
    console.log(data.data.results);
    let eventsData = await data.data.results;
    console.log(eventsData);
    return eventsData;
  } catch (err) {
    console.log("Error:", err);
    return;
  }
}

//function to add comics,series and events in DOM
function superheroMoreDetails(detail, i) {
  const Div = document.createElement("div");
  Div.className =
    "col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2  d-flex justify-content-center";
  Div.innerHTML = `
    <div

    class="card mb-5 "
    style="min-width:200px;width: 13rem;min-height:284px"
    >
      <img  id="details-card"
        src="${detail[i].thumbnail.path}.jpg"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">${detail[i].title}</h5>
        <a href="${detail[i].urls[0].url}?ts=1&apikey=75da5900d36656655728f58059e814bd&hash=390c28a97938c35c2bdaf0950a5cf962" id="${detail[i].id}" class="card-link">more details</a>
      </div>
    </div>
  `;
  return Div;
}

//function to add superhero details into DOM
async function addCharacterToDOM(superhero) {
  const div1 = document.createElement("div");
  console.log(superhero[0].thumbnail);
  div1.className = "cards shadow-sm";
  div1.innerHTML = `<div class="cards">
    <div class="character-img-div">
      <img
        src="${superhero[0].thumbnail.path}.${superhero[0].thumbnail.extension}"
      />
    </div>

    <div class="character-other-details">
      <h1>${superhero[0].name}</h1>
    </div>
  </div>
  
    `;

  characterContainer.appendChild(div1);

  // add comics into DOM
  const comics = await fetchCharacterComics();

  for (let i = 0; i < comics.length; i++) {
    const comicsDiv = superheroMoreDetails(comics, i);

    //  discard all comics whoose thumbnail is not available
    let img = "";
    img = comics[i].thumbnail.path;
    img = img.slice(img.length - 4, img.length);
    if (img !== "able") {
      {
        comicsContainer.appendChild(comicsDiv);
      }
    }
  }

  //add series details into DOM

  const series = await fetchCharacterSeries();

  for (let i = 0; i < series.length; i++) {
    const seriesDiv = superheroMoreDetails(series, i);

    //  discard all series whoose thumbnail is not available
    let img = "";
    img = series[i].thumbnail.path;
    img = img.slice(img.length - 4, img.length);
    if (img !== "able") {
      {
        seriesContainer.appendChild(seriesDiv);
      }
    }
  }

  // add Events into DOM

  const events = await fetchCharacterEvents();
  console.log(events);

  for (let i = 0; i < events.length; i++) {
    const eventsDiv = superheroMoreDetails(events, i);

    //  discard all events whoose thumbnail is not available
    let img = "";
    img = events[i].thumbnail.path;
    img = img.slice(img.length - 4, img.length);
    if (img !== "able") {
      {
        eventsContainer.appendChild(eventsDiv);
      }
    }
  }
}

fetchSuperhero(superheroId);
