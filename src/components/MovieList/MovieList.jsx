import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={css.listMovies}>
      {movies.map(movie => (
        <li key={movie.id} className={css.linkMovies}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
