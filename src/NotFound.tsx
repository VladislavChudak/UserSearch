import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col text-center justify-center h-dvh">
      <h1>404 Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <button
        className="text-primary bg-secondary w-1/4 p-4 rounded-md mx-auto mt-4"
        onClick={() => navigate('/')}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
