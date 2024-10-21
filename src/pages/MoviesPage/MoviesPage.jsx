import css from './MoviesPage.module.css';

import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';
import movieApi from '../../api/movieApi';

import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { TfiSearch } from 'react-icons/tfi';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.elements.searchMovie.value.trim();
    if (searchValue !== '') {
      setSearchParams({ query: searchValue });
    }
    console.log('Search values in input:', searchValue);
    form.reset();
  };
  useEffect(() => {
    async function fetchMovies() {
      const { results } = await movieApi('/search/movie', {
        query: searchValue,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      });
      setMovies(results);
      console.log(results); // check the data is fetching
    }

    fetchMovies();
  }, [searchValue]);
  return (
    <>
      <form onSubmit={handleSubmit} className={css.formStyle}>
        <input
          className={css.inputStyle}
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
    </>
  );
}
