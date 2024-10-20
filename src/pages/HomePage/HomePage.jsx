import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import css from './HomePage.module.css';
import movieApi from '../../api/movieApi';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const { results } = await movieApi('/trending/movie/day', { page: '1' });
      setMovies(results);
      console.log(results); // check the data is fetching
    }

    fetchMovies();
  }, []);
  return (
    <ul className={css.listMovies}>
      {movies.map(movie => (
        <li key={movie.id} className={css.linkMovies}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
}
