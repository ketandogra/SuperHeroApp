SuperHero Web App

### General steps to follow when creating a project

# Thinking about the UI

    . Using CSS framework - Bootstrap

# Functionality

    . Get superheroes details from marvel API
    . Render superheroes on home page
    . Mark superheroes as favourites
    . Unmark favourites superheroes
    . More details of superheroes
    . Search superheroes on home page
    . Search favourites superheroes on favourites page
    . Rendering Comics,Series and Events of selected superheroes
    with the help of API on Superhero details page
    . creating more details links on all comics,series and
    events for more details and redirect to marvel's website

# Responsiveness

    . making responsive for all devices
    . using bootstrap container class and flex

# Data

    . Creating array of object in local storage of the browser to
    store favourite superheroes details - id,name,image
    . Creating session variable to storage id of selected superhero
    for rendering the details of superhero on another page.

### Functions (in code)

# Functions in app.js file

    . initializeApp
    . keypressEventHandler
    . clickEventHandler
    . saveLocally
    . renderSuperheros
    . addElementToDOM
    . fetchSuperheroes
    . hideLoading

# Functions in favourite.js file

    . initialize
    . keypressEventHandler
    . clickEventHandler
    . favouriteHeroRender
    . renderSuperheros
    . addElementToDOM

# Functions in character_details.js file

    . fetchSuperhero
    . addCharacterToDOM
    . fetchCharacterEvents
    . fetchCharacterSeries
    . fetchCharacterComics
    . fetchSuperhero
    . superheroMoreDetails

# Function in common_functionality.js

    . removeFavouriteHero
    . saveIdIntoSessionStroage
    . searchHeroes
    . removeFavouriteHero
