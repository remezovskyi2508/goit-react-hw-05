import css from './Navigation.module.css';

import { NavLink } from 'react-router-dom';

import { clsx } from 'clsx';

export default function Navigation() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header>
      <nav className={css.navWrapper}>
        <NavLink to="/" className={buildLinkClass}>
          HomePage
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          MoviesPage
        </NavLink>
      </nav>
    </header>
  );
}
