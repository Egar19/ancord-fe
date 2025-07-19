import { useState } from 'react';
import { useInput } from '../hooks/useInput';
import { supabase } from '../utils/supabase';
import UpdateInput from '../components/UpdateInput';
import AlertBox from '../components/AlertBox';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTransaction, getTransactionById } from '../utils/api';
import { useEffect } from 'react';

const UpdateRecordPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useInput('');
  const [amount, setAmount] = useInput('');
  const [notes, setNotes] = useInput('');
  const [date, setDate] = useInput('');
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        const token = data?.session?.access_token;
        if (!token) {
          setAlert({ type: 'error', message: 'No session token. Please login again.' });
          setLoading(false);
          return;
        }
        const result = await getTransactionById(id, token);
        if (result && (result.success || result.data)) {
          const trx = result.data || result;
          console.log('Fetched trx:', trx);
          const data = trx.transactions || trx;
          setCategory({ target: { value: data.type || '' } });
          setAmount({ target: { value: data.amount?.toString() || '' } });
          setNotes({ target: { value: data.notes || '' } });
          setDate({ target: { value: data.transaction_date || '' } });
        } else {
          // Tampilkan pesan error dari respons jika ada
          setAlert({ type: 'error', message: result?.message || 'Failed to fetch record.' });
          if (result && result.error) {
            // eslint-disable-next-line no-console
            console.error('API error:', result.error);
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        setAlert({ type: 'error', message: err?.message || 'Server error.' });
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const showAlert = (type, message, duration = 2000) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({});
    }, duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0 || notes.trim() === '' || date.trim() === '') {
      showAlert('error', 'Please complete all required fields.');
      return;
    }
    setLoading(true);
    const updatedRecord = {
      type: category,
      amount: Number(amount),
      notes,
      transaction_date: date,
    };
    try {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;
      const result = await updateTransaction(id, updatedRecord, token);
      if (result.status === 'success') {
        showAlert('success', result.message || 'Record successfully updated!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        showAlert('error', result.message || 'Failed to update record.');
      }
    } catch {
      showAlert('error', 'Server error.');
    }
    setLoading(false);
  };

  return (
    <>
      {alert.message && alert.type && (
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
        submitLabel="Update Record"
        onCancel={() => navigate('/dashboard')}
      />
    </>
  );
};

export default UpdateRecordPage;
