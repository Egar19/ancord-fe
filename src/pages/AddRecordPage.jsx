import { useState } from 'react';
import { useInput } from '../hooks/useInput';
import { supabase } from '../utils/supabase';
import RecordInput from '../components/RecordInput';
import AlertBox from '../components/AlertBox';
import { useNavigate } from 'react-router-dom';
import { addTransaction } from '../utils/api';

// eslint-disable-next-line no-unused-vars
const AddRecordPage = ({ onAddRecord }) => {
  const [category, setCategory] = useInput('');
  const [amount, setAmount] = useInput('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !category ||
      !amount ||
      Number(amount) <= 0 ||
      notes.trim() === '' ||
      date.trim() === ''
    ) {
      showAlert('error', 'Please complete all required fields.');
      return;
    }

    const newRecord = {
      type: category,
      amount: Number(amount),
      notes,
      transaction_date: date,
    };

    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    
    try {
      const result = await addTransaction(newRecord, token);
      if (result.success || result.id || result.data) {
        showAlert('success', 'Record successfully added!');
        //Reset form
        setCategory({ target: { value: '' } });
        setAmount({ target: { value: '' } });
        setNotes({ target: { value: '' } });
        setDate({ target: { value: '' } });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        showAlert('error', result.message || 'Failed to add record.');
      }
    } catch {
      showAlert('error', 'Server error.');
    }
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
