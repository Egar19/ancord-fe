import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import AlertBox from '../components/AlertBox';
import UpdateInput from '../components/UpdateInput';

import { useTransactionById } from '../hooks/useTransactionById';
import { useUpdateTransaction } from '../hooks/useUpdateTransaction';

const UpdateRecordPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useInput('');
  const [amount, setAmount] = useInput('');
  const [notes, setNotes] = useInput('');
  const [date, setDate] = useInput('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  const { data, isLoading: isFetching } = useTransactionById(id, {
    onError: (error) =>
      showAlert('error', error?.message || 'Failed to fetch record'),
  });

  const {
    mutate: updateRecord,
    isPending: isUpdating,
  } = useUpdateTransaction({
    onSuccess: () => {
      showAlert('success', 'Record successfully updated!');
      setTimeout(() => navigate('/dashboard'), 2000);
    },
    onError: (error) => {
      showAlert('error', error?.message || 'Failed to update record');
    },
  });

  useEffect(() => {
    if (data) {
      const trx = data?.transactions || data;
      setCategory({ target: { value: trx.type || '' } });
      setAmount({ target: { value: trx.amount?.toString() || '' } });
      setNotes({ target: { value: trx.notes || '' } });
      setDate({ target: { value: trx.transaction_date || '' } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const showAlert = (type, message, duration = 2000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({}), duration);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0 || notes.trim() === '' || date.trim() === '') {
      showAlert('error', 'Please complete all required fields.');
      return;
    }

    updateRecord({
      id,
      data: {
        type: category,
        amount: Number(amount),
        notes,
        transaction_date: date,
      },
    });
  };

  return (
    <>
      {alert.message && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({})}
        />
      )}
      <UpdateInput
        titleLabel="Update Record"
        category={category}
        onCategoryChange={setCategory}
        amount={amount}
        onAmountChange={setAmount}
        notes={notes}
        onNotesChange={setNotes}
        date={date}
        onDateChange={setDate}
        onSubmit={handleSubmit}
        submitLabel={isUpdating ? 'Updating...' : isFetching ? 'Loading...' : 'Update Record'}
        disabled={isUpdating || isFetching}
        onCancel={() => navigate('/dashboard')}
      />
    </>
  );
};

export default UpdateRecordPage;