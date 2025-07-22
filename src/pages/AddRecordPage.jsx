import { useState } from 'react';
import { useInput } from '../hooks/useInput';
import { supabase } from '../utils/supabase';
import RecordInput from '../components/RecordInput';
import AlertBox from '../components/AlertBox';
import { useNavigate } from 'react-router-dom';
import { addTransaction } from '../utils/api';

const AddRecordPage = ({ refetchRecords }) => {
  const [category, setCategory] = useInput('');
  const [amount, setAmount] = useInput('');
  const [notes, setNotes] = useInput('');
  const [date, setDate] = useInput('');

  const [alert, setAlert] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const showAlert = (type, message, duration = 2000) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({});
    }, duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedAmount = Number(amount);
    if (
      !category ||
      !parsedAmount ||
      notes.trim() === '' ||
      date.trim() === ''
    ) {
      showAlert('error', 'Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    const newRecord = {
      type: category,
      amount: parsedAmount,
      notes,
      transaction_date: date,
    };

    try {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;

      if (!token) {
        showAlert('error', 'Unauthorized. Please login again.');
        return;
      }

      const result = await addTransaction(newRecord, token);

      if (result.success || result.id || result.data) {
        // Refetch dari backend agar data valid dan lengkap
        if (refetchRecords) {
          await refetchRecords();
        }

        showAlert('success', 'Record successfully added!');

        // Reset form
        setCategory({ target: { value: '' } });
        setAmount({ target: { value: '' } });
        setNotes({ target: { value: '' } });
        setDate({ target: { value: '' } });

        // Redirect setelah sukses
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        showAlert('error', result.message || 'Failed to add record.');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      showAlert('error', 'Server error. Please try again.');
    } finally {
      setIsSubmitting(false);
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
        submitLabel={isSubmitting ? 'Submitting...' : 'Add Record'}
        disabled={isSubmitting}
      />
    </>
  );
};

export default AddRecordPage;