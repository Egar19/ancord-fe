
import { useNavigate } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-w-auto min-h-175 flex flex-col items-center justify-center px-4">
      <FaRegSadTear className="text-7xl text-primary mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Not Found</h1>
      <p className="text-lg text-base-content/70 mb-6 text-center">Halaman yang Anda cari tidak ditemukan.<br />Silakan cek URL atau kembali ke beranda.</p>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/')}
      >
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default NotFoundPage;