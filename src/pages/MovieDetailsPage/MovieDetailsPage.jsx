import css from './MovieDetailsPage.module.css';

import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import movieApi from '../../api/movieApi';

import { IoArrowBackCircleOutline } from 'react-icons/io5';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  console.log('Movie details:', location);
  const prevLocation = location.state?.from || '/movies';
  const locRef = useRef(prevLocation);

  const goBack = () => {
    navigate(locRef.current);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await movieApi(`/movie/${movieId}`);
        setMovie(data);
        console.log(data); // check the data is fetching
      } catch (error) {
        setError('Не вдалося завантажити опис фільму');
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [movieId]);
  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={css.detailPageWrap}>
      <button onClick={goBack} className={css.btn}>
        <IoArrowBackCircleOutline className={css.btnIcon} />
      </button>
      {movie ? (
        <div>
          <div className={css.mainWrapper}>
            <img
              className={css.imgStyle}
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
          <p className={css.addInfo}>Additional information</p>
          <ul>
            <li className={css.linkAddInfo}>
              <Link to="cast" state={{ from: locRef.current }}>
                Cast
              </Link>
            </li>
            <li className={css.linkAddInfo}>
              <Link to="reviews" state={{ from: locRef.current }}>
                Reviews
              </Link>
            </li>
          </ul>
          <Outlet />
        </div>
      ) : null}
    </div>
  );
}
