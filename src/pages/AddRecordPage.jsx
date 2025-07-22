import { useState } from 'react';
import { useInput } from '../hooks/useInput';
import RecordInput from '../components/RecordInput';
import AlertBox from '../components/AlertBox';
import { useNavigate } from 'react-router-dom';
import { useAddTransaction } from '../hooks/useAddTransaction';

const AddRecordPage = () => {
  const [category, setCategory] = useInput('');
  const [amount, setAmount] = useInput('');
  const [notes, setNotes] = useInput('');
  const [date, setDate] = useInput('');

  const [alert, setAlert] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const {
    mutate: addTransaction,
    isPending,
  } = useAddTransaction({
    onSuccess: () => {
      showAlert('success', 'Record successfully added!');
      resetForm();
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    },
    onError: (error) => {
      showAlert('error', error.message || 'Failed to add record.');
    },
  });

  const showAlert = (type, message, duration = 2000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({}), duration);
  };

  const resetForm = () => {
    setCategory({ target: { value: '' } });
    setAmount({ target: { value: '' } });
    setNotes({ target: { value: '' } });
    setDate({ target: { value: '' } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = Number(amount);
    if (!category || !parsedAmount || notes.trim() === '' || date.trim() === '') {
      showAlert('error', 'Please complete all required fields.');
      return;
    }

    addTransaction({
      type: category,
      amount: parsedAmount,
      notes,
      transaction_date: date,
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

      <RecordInput
        titleLabel="Add New Record"
        category={category}
        onCategoryChange={setCategory}
        amount={amount}
        onAmountChange={setAmount}
        notes={notes}
        onNotesChange={setNotes}
        date={date}
        onDateChange={setDate}
        onSubmit={handleSubmit}
        submitLabel={isPending ? 'Submitting...' : 'Add Record'}
        disabled={isPending}
      />
    </>
  );
};

export default AddRecordPage;
