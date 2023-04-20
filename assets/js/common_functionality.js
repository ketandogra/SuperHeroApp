// common functions file

const superheroesContainer = document.getElementById("superhero-container");
const searchBox = document.getElementById("search-item");

// function for seaching superhero
function searchHeroes() {
  const searchItem = searchBox.value.toUpperCase();
  const superHeroes = document.querySelectorAll("#super-hero");
  const superheroName = document.getElementsByTagName("h5");
  for (let i = 0; i < superheroName.length; i++) {
    let match = superHeroes[i].getElementsByTagName("h5")[0];

    if (match) {
      let textValue = match.textContent || match.innerHTML;
      if (textValue.toUpperCase().indexOf(searchItem) > -1) {
        superHeroes[i].style.display = "";
      } else {
        superHeroes[i].style.setProperty("display", "none", "important");
      }
    }
  }
  return;
}

// function for save the clicked super heroId into session storage of the broswer
function saveIdIntoSessionStroage(heroId) {
  sessionStorage.setItem("superheroId", heroId);
}

// Function for remove superhero from favourites
function removeFavouriteHero(favHeroId) {
  let favHero = JSON.parse(localStorage.getItem("favourites"));
  let newFavHeroList = favHero.filter((ele) => {
    return favHeroId != `fav-${ele.id}`;
  });
  localStorage.setItem("favourites", JSON.stringify(newFavHeroList));
}

// exporting the common functions and variables
export {
  superheroesContainer,
  searchBox,
  searchHeroes,
  removeFavouriteHero,
  saveIdIntoSessionStroage,
};
