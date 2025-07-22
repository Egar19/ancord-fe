import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';

import Loading from '../components/Loading';
import AlertBox from '../components/AlertBox';
import { formatRupiah } from '../utils/formatRupiah';
import { useTransactionById } from '../hooks/useTransactionById';
import { deleteTransaction } from '../utils/api';
import { useAuthToken } from '../hooks/useAuthToken';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthToken();

  const { data: record, isLoading, isError } = useTransactionById(id);
  const [alert, setAlert] = useState({ type: '', message: '', onConfirm: null });

  const showAlert = (type, message, duration = 2000, onConfirm = null) => {
    setAlert({ type, message, onConfirm });

    if (!onConfirm) {
      setTimeout(() => {
        setAlert({ type: '', message: '', onConfirm: null });
      }, duration);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteTransaction(id, token);
      console.log('Response deleteTransaction:', res);
      
      if (res.status !== 'success') {
        showAlert('error', res.message || 'Failed to delete record.');
        return;
      }
      showAlert('success', 'Record deleted successfully.');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      showAlert('error', err.message || 'Error deleting record.');
    }
  };

  if (isLoading) return <Loading />;
  if (isError || !record) return <p className="text-center mt-8">Record not found.</p>;

  return (
    <>
      {alert.message && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: '', message: '', onConfirm: null })}
          onConfirm={alert.onConfirm}
        />
      )}

      <div className="space-y-4 bg-base-200 rounded p-4 my-4">
        <button
          className="inline-flex items-center gap-1 border rounded px-2 py-1 text-base-content text-sm transition btn btn-soft"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="text-xs" />
          <span className="leading-none">Back</span>
        </button>

        <h2 className="text-2xl font-semibold mb-4">Record Details</h2>
        <p>
          <strong>Category:</strong> {record.type}
        </p>
        <p>
          <strong>Amount:</strong> {formatRupiah(record.amount)}
        </p>
        <p>
          <strong>Notes:</strong> {record.notes}
        </p>
        <p>
          <strong>Date:</strong> {record.transaction_date}
        </p>

        <div className="mt-4 flex gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/updaterecord/${id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-error"
            onClick={() =>
              showAlert(
                'warning',
                'Are you sure you want to delete this record?',
                0,
                () => {
                  setAlert({ type: '', message: '', onConfirm: null });
                  handleDelete();
                }
              )
            }
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailPage;