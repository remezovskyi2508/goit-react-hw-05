import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';
import { Link, useParams, Outlet } from 'react-router-dom';
import css from './MoviesPage.module.css';
import { TfiSearch } from 'react-icons/tfi';
import { useState, useEffect } from 'react';
import movieApi from '../../api/movieApi';

export default function MoviesPage() {
  const { movieId } = useParams();
  const [savedValue, setSavedValue] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.elements.searchMovie.value.trim();
    if (searchValue !== '') {
      setSavedValue(searchValue);
    }
    console.log('Search values in input:', searchValue);
    form.reset();
  };
  useEffect(() => {
    async function fetchMovies() {
      const { results } = await movieApi('/search/movie', {
        query: savedValue,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      });
      setMovies(results);
      console.log(results); // check the data is fetching
    }

    fetchMovies();
  }, [savedValue]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Знайди фільм по назві"
          name="searchMovie"
        />
        <button className={css.btn} type="submit">
          <TfiSearch />
        </button>
      </form>
      {movies.length > 0 && (
        <ul className={css.listMovies}>
          {movies.map(movie => (
            <li key={movie.id} className={css.linkMovies}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <MovieDetailsPage id={movieId} />
      <Outlet />
    </>
  );
}
