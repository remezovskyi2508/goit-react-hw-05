import css from './NotFoundPage.module.css';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <button onClick={goBack} className={css.btn}>
        <IoArrowBackCircleOutline className={css.btnIcon} />
      </button>
      <h2 className={css.title}>404</h2>
      <p className={css.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
    </div>
  );
}
