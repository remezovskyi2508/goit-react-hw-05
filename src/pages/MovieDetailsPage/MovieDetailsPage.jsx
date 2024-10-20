import css from './MovieDetailsPage.module.css';

import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import movieApi from '../../api/movieApi';

import { IoArrowBackCircleOutline } from 'react-icons/io5';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const {
    poster_path: img1,
    backdrop_path: img2,
    release_date,
    original_title: title,
    overview,
    vote_average: score,
  } = movie;
  const percentageScore = score * 10;
  const { genres = [] } = movie || {};
  const genresName = genres.map(genre => genre.name);

  useEffect(() => {
    async function fetchMovies() {
      const data = await movieApi(`/movie/${movieId}`);
      setMovie(data);
      console.log(data); // check the data is fetching
    }

    fetchMovies();
  }, [movieId]);

  return (
    <>
      <button onClick={goBack} className={css.btn}>
        <IoArrowBackCircleOutline className={css.btnIcon} />
      </button>
      {movie ? (
        <div>
          <div className={css.mainWrappe}>
            <img
              className={css.imgNotFound}
              src={
                `https://image.tmdb.org/t/p/w200${img1}` ||
                `https://image.tmdb.org/t/p/w200${img2}`
              }
              alt={title}
            />
            <div>
              <h2>{`${title} (${new Date(release_date).getFullYear()})`}</h2>
              <p>Score: {`${percentageScore}%`}</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h3>Genres</h3>
              <p>{genresName.join(', ')}</p>
            </div>
          </div>
          <p>Additional information</p>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Outlet />
        </div>
      ) : null}
    </>
  );
}
