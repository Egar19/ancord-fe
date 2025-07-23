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
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    onConfirm: null,
  });

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
  if (isError || !record)
    return <p className='text-center mt-8'>Record not found.</p>;

  return (
    <div className='mt-4 bg-base-200 rounded-md shadow-lg p-4'>
      {alert.message && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: '', message: '', onConfirm: null })}
          onConfirm={alert.onConfirm}
        />
      )}
      <button
        className='mb-4 flex items-center gap-2 btn btn-ghost bg-base-100'
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        Back
      </button>

      <table className='table-auto w-full rounded-lg overflow-hidden'>
        <thead>
          <tr>
            <th
              colSpan={2}
              className='text-left text-xl font-semibold text-base-content pb-2'
            >
              Record Detail
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className='text-left w-1/12 pr-2 py-2 align-top text-base font-medium'>
              Category 
            </th>
            <td className='w-11/12 py-2 align-top text-base'>
              : {record.type}
            </td>
          </tr>
          <tr>
            <th className='text-left w-1/12 pr-2 py-2 align-top text-base font-medium'>
              Amount 
            </th>
            <td className='w-11/12 py-2 align-top text-base'>
              : {formatRupiah(record.amount)}
            </td>
          </tr>
          <tr>
            <th className='text-left w-1/12 pr-2 py-2 align-top text-base font-medium'>
              Notes 
            </th>
            <td className='w-11/12 py-2 align-top text-base'>
              : {record.notes}
            </td>
          </tr>
          <tr>
            <th className='text-left w-1/12 pr-2 py-2 align-top text-base font-medium'>
              Date 
            </th>
            <td className='w-11/12 py-2 align-top text-base'>
              : {record.transaction_date.split('T')[0]}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className='px-4 py-3'>
              <div className='mt-2 flex justify-end gap-2'>
                <button
                  className='btn btn-warning'
                  onClick={() => navigate(`/updaterecord/${id}`)}
                >
                  Edit
                </button>
                <button
                  className='btn btn-error'
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
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DetailPage;
