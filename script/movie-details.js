// import { fetchMovieById } from 'api.js';

document.addEventListener('DOMContentLoaded', function() { 
    async function fetchMovieById(movieId) {
        const apiKey = "ad6740e57897fb1f316fb63dc8ae70dc"; // Your API Key
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
        
        try {
            // Fetch movie details by ID
            const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const movie = await response.json();
            displayMovieDetails(movie);
        } catch (error) {
            console.error("Error fetching movie by ID:", error);
        }
    }
    
    function displayMovieDetails(movie) {
        console.log(movie);
        
        let cardWrappers = document.querySelector(".movie-details-container");
        let fetchedDataCardAsText = '';
        let countries = '';
        let genres = '';

        for (let i = 0; i < movie.production_countries.length; i++){
            countries += movie.production_countries[i].name;
            if(movie.production_countries.length - i != 1) countries += ', ';
            else countries += '.';
        }

        for (let i = 0; i < movie.genres.length; i++){
            genres += movie.genres[i].name;
            if(movie.genres.length - i != 1) genres += ', ';
            else genres += '.';
        }
        

        fetchedDataCardAsText += `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title}" class="movie-img">
            <div class="info-wrapper">
                <div class="info-header">
                    <h1 class="title">${movie.original_title}</h1>
                    <div class="rating">Rating: ${movie.vote_average}</div>
                </div>
                <div class="info-body">
                    <p class="description">${movie.overview}</p>
                    <div class="property">
                        <p class="label">Genres:</p>
                        <p class="value">${genres}</p>
                    </div>
                    <div class="property">
                        <p class="label">Countries:</p>
                        <p class="value">${countries}</p>
                    </div>
                    <div class="property">
                        <p class="label">Language:</p>
                        <p class="value">${movie.original_language}</p>
                    </div>
                    <div class="property">
                        <p class="label">Year:</p>
                        <p class="value">${movie.release_date}</p>
                    </div>
                    <div class="property">
                        <p class="label">Reviews:</p>
                        <p class="value">${movie.vote_count}</p>
                    </div>
                </div>
            </div>
            `;
        cardWrappers.innerHTML = fetchedDataCardAsText;
    }
    
    fetchMovieById(sessionStorage.getItem('selectedMovieId'));
});