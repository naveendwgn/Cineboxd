import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './components/MovieCard';

const API_URl = 'https://www.omdbapi.com/?apikey=a65984f0'; 

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const search = async (title) => {
    const response = await fetch(`${API_URl}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    search('spiderman');
  }, []);

  return (
    <div className="app">
      <h1>Cineboxd</h1>

      <div className="search">
        <input 
          placeholder='Search for a movie...'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <img 
          src={SearchIcon}
          alt="search-icon"
          onClick={() => search(searchValue)}
        />
      </div>

    {
      movies?.length > 0 
      ? (
        <div className='container'>
           {movies.map((movie) => (
              <MovieCard movie={movie} />
           ))}
        </div>
      ) : (
        <div> 
          <h2>No movies found</h2>
        </div>
      )
    }

    
    </div>
  );
}

export default App;
