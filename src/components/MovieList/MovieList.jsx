import { useNavigate } from 'react-router-dom';

export default function MovieList() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <button onClick={goBack}>Back</button>
      <h3>No name</h3>
      <img src="#" alt="no name" />
    </>
  );
}
