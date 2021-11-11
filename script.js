const API_URL =
    'https://api.themoviedb.org/3/movie/now_playing?api_key=e8936532a3fd53805d4b3a885785689a&language=en-US';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL =
    'https://api.themoviedb.org/3/search/movie?&api_key=e8936532a3fd53805d4b3a885785689a&query="';

const GENRES_URL =
    'https://api.themoviedb.org/3/genre/movie/list?&api_key=e8936532a3fd53805d4b3a885785689a';


const main = document.getElementById("main");
const form = document.getElementById("form");
//const search = document.getElementById("search");

getMovies(API_URL, GENRES_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = ""; //clear the main part to append the movies;


    movies.forEach((movie) => {
        const { title, poster_path, vote_average, release_date, overview } =
        movie; //we get the movie data by pulling them from the object

        const movieEl = document.createElement("div"); //create a div where the movie object will be placed

        movieEl.classList.add("movie"); //the div element will have a class of 'movie

        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColourRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h5>Year Of Release</h5>
        ${release_date}
        <h3>Overview</h3>
        ${overview}
        </div>
        `;
        main.appendChild(movieEl);
    });
}
//i tried the infinite scrolling i couldn't make it :(
window.addEventListener("scroll", () => {
    //scrollY is the amount that we've scrolled down from the top of the window
    if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
    ) {
        alert("You are on the bottom of the page!")
    }
});

//a function that gives the different colour to the average_vote
function getColourRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

//Functional Search

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm != "") {
        getMovies(SEARCH_URL + "&query=" + searchTerm); //that will give as a response

        search.value = ""; //if there is anything
    } else {
        window.location.reload(); //we will reload the page
    }
});