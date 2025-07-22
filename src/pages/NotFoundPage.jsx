import { useNavigate } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-w-auto h-screen flex flex-col items-center justify-center px-4">
      <FaRegSadTear className="text-7xl text-primary mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Not Found</h1>
      <p className="text-lg text-base-content/70 mb-6 text-center">
        The page you are looking for could not be found.<br />
        Please check the URL or go back to the homepage.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/')}
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;