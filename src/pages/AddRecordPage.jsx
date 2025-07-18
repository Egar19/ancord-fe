import { useState } from 'react';
import { useInput } from '../hooks/useInput';
import RecordInput from '../components/RecordInput';
import AlertBox from '../components/AlertBox';
import { useNavigate } from 'react-router-dom';

const AddRecordPage = ({ onAddRecord }) => {
  const [category, setCategory] = useInput('income');
  const [amount, setAmount] = useInput(0);
  const [notes, setNotes] = useInput('');
  const [date, setDate] = useInput('');

  const [alert, setAlert] = useState({ type: '', message: '' });

  const navigate = useNavigate();
  const showAlert = (type, message, duration = 2000) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({});
    }, duration);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !amount ||
      Number(amount) <= 0 ||
      notes.trim() === '' ||
      date.trim() === ''
    ) {
      showAlert('error', 'Please complete all required fields.');
      return;
    }

    const newRecord = {
      id: Date.now().toString(),
      type: category,
      amount: Number(amount),
      notes,
      date,
    };

    onAddRecord(newRecord);
    showAlert('success', 'Record successfully added!');

    //Reset form
    setCategory({ target: { value: 'income' } });
    setAmount({ target: { value: 0 } });
    setNotes({ target: { value: '' } });
    setDate({ target: { value: '' } });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
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
        titleLabel='Add New Record'
        category={category}
        onCategoryChange={setCategory}
        amount={amount}
        onAmountChange={setAmount}
        notes={notes}
        onNotesChange={setNotes}
        date={date}
        onDateChange={setDate}
        onSubmit={handleSubmit}
        submitLabel='Add Record'
      />
    </>
  );
};

export default AddRecordPage;
