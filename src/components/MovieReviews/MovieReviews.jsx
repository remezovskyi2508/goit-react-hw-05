import css from './MovieReviews.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import movieApi from '../../api/movieApi';

export default function MovieReviews({}) {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await movieApi(`/movie/${movieId}/reviews`, {
        language: 'en-US',
        page: '1',
      });
      setReviews(data.results);
      console.log(data.results); // check the data is fetching
    }

    fetchMovies();
  }, [movieId]);
  return (
    <div className={css.Wrapper}>
      <ul>
        {reviews.length > 0
          ? reviews.map(review => (
              <li key={review.id} className={css.reviewItem}>
                <p className={css.authorName}>Author: {review.author}</p>
                <p>{review.content}</p>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
