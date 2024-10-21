import { useState, useEffect } from 'react';
import movieApi from '../../api/movieApi';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const { results } = await movieApi('/trending/movie/day', {
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
  }, []);
  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return <>{movies.length > 0 && <MovieList movies={movies} />}</>;
}
