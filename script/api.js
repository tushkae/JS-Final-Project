export async function fetchRandomPopularMovie() {
    const apiKey = "ad6740e57897fb1f316fb63dc8ae70dc";
    const apiUrl = "https://api.themoviedb.org/3/movie/popular";
    
    try {
        const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const movies = data.results;
        

        // Display movie details (or do anything with the data)
        displayMovies(movies);
    } catch (error) {
        console.error("Error fetching popular movies:", error);
    }
}

export async function fetchAndDisplayMoviesByName(movieName) {
    const apiKey = "ad6740e57897fb1f316fb63dc8ae70dc";
    const apiUrl = "https://api.themoviedb.org/3/search/movie";
    const moviesContainer = document.querySelector(".movies-container");
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");
  
    let currentPage = 1;
    let totalPages = 1;
    let currentQuery = "";
  
    // Fetch Movies by Search Term
    async function fetchMovies(query, page = 1) {
      try {
        const response = await fetch(`${apiUrl}?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const data = await response.json();
        totalPages = data.total_pages;
        displayMovies(data.results);
        updatePagination(page, totalPages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  
    // Display Movies
    function displayMovies(movies) {
        console.log(movies);
        moviesContainer.innerHTML = movies
            .map(
            (movie) => `
                <a href="movie-details.html" class="movie-card" data-movie-id="${movie.id}" title="${movie.overview}">
                    <div class="movie-title">${movie.original_title}</div>
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-img">
                </a>`
            )
            .join("");
    }
  
    // Update Pagination UI
    function updatePagination(page, totalPages) {
      pageInfo.textContent = `Page ${page} of ${totalPages}`;
      prevPageBtn.disabled = page <= 1;
      nextPageBtn.disabled = page >= totalPages;
    }
  
    // Handle Search Button
    document.getElementById("search-button").addEventListener("click", () => {
      const query = document.getElementById("movie-search").value.trim();
      if (query) {
        currentQuery = query;
        currentPage = 1;
        fetchMovies(query, currentPage);
      }
      addEventsOnMovieCard();
    });

    document.getElementById('movie-search').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const query = document.getElementById("movie-search").value.trim();
            if (query) {
                currentQuery = query;
                currentPage = 1;
                fetchMovies(query, currentPage);
            }
            addEventsOnMovieCard();
        }
    });
    
  
    // Handle Pagination Buttons
    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchMovies(currentQuery, currentPage);
      }
      addEventsOnMovieCard();
    });
  
    nextPageBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        fetchMovies(currentQuery, currentPage);
      }
      addEventsOnMovieCard();
    });
}

export function SearchMoviesByName() {
    const btn = document.querySelector('#search-button');
    let input = document.querySelector('#movie-search');
    
    btn.addEventListener('click', () => {
        fetchAndDisplayMoviesByName(input.value);
    })
    
    input.addEventListener("keydown", (e) => {
        if(e.key == "Enter") fetchAndDisplayMoviesByName(input.value);
    })
}

export async function fetchLatestMovies() {
    const apiKey = "ad6740e57897fb1f316fb63dc8ae70dc";
    const apiUrl = "https://api.themoviedb.org/3/movie/now_playing";
    
    try {
        const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const moviesData = await response.json();
        const movies = moviesData.results;
        displayMovies(movies);
        // Display or process the latest movie
    } catch (error) {
        console.error("Error fetching the latest movie:", error);
    }
}

function displayMovies(movies) {
    let cardWrappers = document.querySelector(".movies-container");
    let fetchedDataCardAsText = '';
    
    for(var i = 0; i < 12; i++)
    {
        if(movies[i].poster_path != null) {
            let description = movies[i].overview.substring(0, 160) + '...';
            fetchedDataCardAsText += `
                <a href="movie-details.html" class="movie-card" data-movie-id="${movies[i].id}">
                    <div class="movie-title">${movies[i].original_title}</div>
                    <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" alt="${movies[i].original_title}" class="movie-img">
                    <p class="movie-description" title="${movies[i].overview}">${description}</p>
                </a>
                `;
        }
    }
    cardWrappers.innerHTML = fetchedDataCardAsText;
}

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