import { SearchMoviesByName, fetchLatestMovies } from './api.js';

document.addEventListener('DOMContentLoaded', function() {

    function addEventsOnMovieCard() {
        setTimeout(() => {
            let movieCards = document.querySelectorAll('.movie-card');
            movieCards.forEach(movieCard => 
                movieCard.addEventListener('click', () => updateMovieOnSessionStorage(movieCard))
            );
        }, 100);

    }

    function updateMovieOnSessionStorage(movie) {
        let movieId = movie.dataset.movieId;
        sessionStorage.setItem('selectedMovieId', movieId);
    }


    // Call the functions
    fetchLatestMovies();
    SearchMoviesByName();
    addEventsOnMovieCard();
}, false);