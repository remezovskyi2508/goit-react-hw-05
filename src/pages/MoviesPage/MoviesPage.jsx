import css from './MoviesPage.module.css';

import MovieList from '../../components/MovieList/MovieList';
import movieApi from '../../api/movieApi';

import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { TfiSearch } from 'react-icons/tfi';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      try {
        const { results } = await movieApi('/search/movie', {
          query: searchValue,
          include_adult: 'false',
          language: 'en-US',
          page: '1',
        });
        setMovies(results);
        console.log(results); // check the data is fetching
      } catch (error) {
        setError('Не вдалося завантажити фільми');
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [searchValue]);
  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

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

      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
