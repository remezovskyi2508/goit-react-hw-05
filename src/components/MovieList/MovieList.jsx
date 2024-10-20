import { Link } from 'react-router-dom';

export default function MovieList({movie}) {
  return (
        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        );
}
