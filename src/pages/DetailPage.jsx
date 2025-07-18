import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RecordInput from '../components/RecordInput';
import { FaAngleLeft } from 'react-icons/fa6';

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

  if (!record) return <p className='text-center mt-8'>Record not found.</p>;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this record?')) {
      onDelete(id);
      alert('Record deleted');
      navigate('/dashboard');
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(id, editData);
    alert('Record updated');
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <RecordInput
          titleLabel='Edit Record'
          category={editData.type}
          onCategoryChange={(e) =>
            setEditData({ ...editData, type: e.target.value })
          }
          amount={editData.amount}
          onAmountChange={(e) =>
            setEditData({ ...editData, amount: Number(e.target.value) })
          }
          notes={editData.notes}
          onNotesChange={(e) =>
            setEditData({ ...editData, notes: e.target.value })
          }
          date={editData.date}
          onDateChange={(e) =>
            setEditData({ ...editData, date: e.target.value })
          }
          onSubmit={handleUpdate}
          submitLabel='Save Changes'
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className='space-y-2 bg-base-200 rounded p-4 my-4'>
          <button
            className='inline-flex items-center gap-1 border rounded px-2 py-1 text-base-content text-sm transition btn btn-soft'
            onClick={() => navigate(-1)}
          >
            <FaAngleLeft className='text-base' />
            <span className='leading-none'>Back</span>
          </button>

          <h2 className='text-2xl font-semibold mb-4'>Record Details</h2>
          <p>
            <strong>Category:</strong> {record.type}
          </p>
          <p>
            <strong>Amount:</strong> {record.amount}
          </p>
          <p>
            <strong>Notes:</strong> {record.notes}
          </p>
          <p>
            <strong>Date:</strong> {record.date}
          </p>

          <div className='mt-4 flex gap-2'>
            <button
              className='btn btn-secondary'
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button className='btn btn-error' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
