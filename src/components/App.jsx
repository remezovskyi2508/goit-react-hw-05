import { Routes, Route, NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { lazy, Suspense } from 'react';
import movieApi from '../api/movieApi';

import css from './App.module.css';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../components/MovieReviews/MovieReviews')
);

function App() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  movieApi();
  return (
    <div className={css.navWrapper}>
      <NavLink to="/homepage" className={buildLinkClass}>
        HomePage
      </NavLink>
      <NavLink to="/moviespage" className={buildLinkClass}>
        MoviesPage
      </NavLink>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/moviespage" element={<MoviesPage />}>
              <Route path="movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
