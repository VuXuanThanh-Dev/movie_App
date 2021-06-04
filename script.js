let movies = [];

const URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f171398df03033f7a02479669e9245a4&page=1";

const IMAGE_PATH =
  "https://image.tmdb.org/t/p/w1280/";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=f171398df03033f7a02479669e9245a4&page=1&query="';

const frmSearch = document.getElementById("form");
const search = document.querySelector(".form-control");
const main = document.querySelector('.main');




frmSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    if(search.value !== '' && search.value) {
        getMovies(SEARCH_API + search.value);
        search.value = '';
        
    }
});



async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  movies = data.results;
  onLoadMovies();
}

loadMovies();

 async function loadMovies() {
    const res = await fetch(URL);
    const data = await res.json();
    movies = data.results;
    onLoadMovies();
}

function onLoadMovies() {
    let content ='';
    movies.forEach(movie => {
        content += `
        <div class="movie">
                <img src="${IMAGE_PATH + movie.poster_path}" alt="">
                <div class="group-info">
                    <h3 class="title">${movie.original_title}</h3>
                    <p class="rating ${ratingStar(movie.vote_average)}">${movie.vote_average}</p>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    <p class="description">
                        ${movie.overview}
                    </p>
                </div>
            </div>`
    });
    main.innerHTML = content;
}

function ratingStar(rate) {
    let text = '';
    switch(true) {
        case rate <=5.5: text = 'red';break;
        case rate >5.5 && rate < 7.9 : text = 'yellow';break;
        case rate >= 8: text = 'green'; break;
    }
    return text;
}