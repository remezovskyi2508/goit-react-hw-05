import { useState, useEffect } from 'react';
import movieApi from '../../api/movieApi';
import MovieList from '../../components/MovieList/MovieList';

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
  return <>{movies.length > 0 && <MovieList movies={movies} />}</>;
}
