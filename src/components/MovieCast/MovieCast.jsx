import css from './MovieCast.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import movieApi from '../../api/movieApi';

export default function MovieCast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await movieApi(`/movie/${movieId}/credits`, {
        language: 'en-US',
      });
      setActors(data.cast);
      console.log(data.cast); // check the data is fetching
    }

    fetchMovies();
  }, [movieId]);
  return (
    <div className={css.wrapper}>
      <ul className={css.actorsList}>
        {actors.length > 0
          ? actors.map(actor => (
              <li key={actor.id} className={css.actorItem}>
                <img className={css.imgItem}
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
                <p className={css.authorName}>Author: {actor.name}</p>
                <p className={css.authorName}>Character: {actor.character}</p>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
