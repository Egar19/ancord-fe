import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RecordInput from '../components/RecordInput';
import AlertBox from '../components/AlertBox';
import { FaAngleLeft } from 'react-icons/fa6';
import { formatRupiah } from '../utils/formatRupiah';

const DetailPage = ({ records, onDelete, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const record = records.find((r) => r.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    type: record?.type || 'income',
    amount: record?.amount || 0,
    notes: record?.notes || '',
    date: record?.date || '',
  });

  const [alert, setAlert] = useState({ type: '', message: '', onConfirm: null });

  const showAlert = (type, message, duration = 2000, onConfirm = null) => {
    setAlert({ type, message, onConfirm });

    if (!onConfirm) {
      setTimeout(() => {
        setAlert({});
      }, duration);
    }
  };

  if (!record) return <p className="text-center mt-8">Record not found.</p>;

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(id, editData);
    showAlert('success', 'Record updated successfully.');
    setIsEditing(false);
  };

  const handleDelete = () => {
    showAlert('success', 'Record deleted successfully.');
    setTimeout(() => {
      onDelete(id);
      navigate('/dashboard');
    }, 1000);
  };

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

      {isEditing ? (
        <RecordInput
          titleLabel="Edit Record"
          category={editData.type}
          onCategoryChange={(e) => setEditData({ ...editData, type: e.target.value })}
          amount={editData.amount}
          onAmountChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
          notes={editData.notes}
          onNotesChange={(e) => setEditData({ ...editData, notes: e.target.value })}
          date={editData.date}
          onDateChange={(e) => setEditData({ ...editData, date: e.target.value })}
          onSubmit={handleUpdate}
          submitLabel="Save Changes"
          onCancel={() => setIsEditing(false)}
        />
      ) : (
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
            <strong>Date:</strong> {record.date}
          </p>

          <div className="mt-4 flex gap-2">
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
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
      )}
    </>
  );
};

export default DetailPage;
