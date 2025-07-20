import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import { supabase } from '../utils/supabase';
import { updateTransaction, getTransactionById } from '../utils/api';

import UpdateInput from '../components/UpdateInput';
import AlertBox from '../components/AlertBox';

const UpdateRecordPage = ({ onUpdateRecord, refetchRecords }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useInput('');
  const [amount, setAmount] = useInput('');
  const [notes, setNotes] = useInput('');
  const [date, setDate] = useInput('');

  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // ✅ Ambil data transaksi berdasarkan ID
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        const token = data?.session?.access_token;

        if (!token) {
          showAlert('error', 'No session token. Please login again.');
          return;
        }

        const result = await getTransactionById(id, token);
        if (result && (result.success || result.data)) {
          const trx = result.data?.transactions || result.data || result;
          setCategory({ target: { value: trx.type || '' } });
          setAmount({ target: { value: trx.amount?.toString() || '' } });
          setNotes({ target: { value: trx.notes || '' } });
          setDate({ target: { value: trx.transaction_date || '' } });
        } else {
          showAlert('error', result?.message || 'Failed to fetch record.');
        }
      } catch (err) {
        showAlert('error', err?.message || 'Server error.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const showAlert = (type, message, duration = 2000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({}), duration);
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

        // Update state lokal di App (jika ada)
        if (onUpdateRecord) {
          onUpdateRecord(id, updatedRecord);
        }

        // Refetch dari server
        if (refetchRecords) {
          await refetchRecords();
        }

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        showAlert('error', result.message || 'Failed to update record.');
      }
    } catch {
      showAlert('error', 'Server error.');
    } finally {
      setLoading(false);
    }
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
        submitLabel={loading ? 'Updating...' : 'Update Record'}
        onCancel={() => navigate('/dashboard')}
      />
    </>
  );
};

export default UpdateRecordPage;
