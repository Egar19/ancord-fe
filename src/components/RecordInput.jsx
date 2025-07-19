
import React, { useRef, useState } from 'react';
import { formatRupiah } from '../utils/formatRupiah';
import { FaCheck, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RecordInput = ({
  category,
  onCategoryChange,
  amount,
  onAmountChange,
  notes,
  onNotesChange,
  date,
  onDateChange,
  onSubmit,
  titleLabel = 'Add Record',
  submitLabel = 'Add Record',
  onCancel,
}) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const amountRef = useRef(null);
  const [displayAmount, setDisplayAmount] = useState(amount);

  React.useEffect(() => {
    setDisplayAmount(amount);
  }, [amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!category) newErrors.category = 'Category is required';
    if (!amount || Number(amount) <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    onSubmit(e);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box max-w-2xl mx-auto border p-4 md:p-8">
        <legend className="fieldset-legend text-2xl mb-2">
          {titleLabel}
        </legend>

        {/* Category */}
        <label className="label" htmlFor="category">
          <span className="label-text">Category</span>
        </label>
        <select
          className="select w-full focus:outline-none focus:ring-2 focus:ring-primary" id="category"
          value={category}
          onChange={onCategoryChange}
        >
          <option value="" disabled hidden>Choose Category</option>
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </select>
        {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}

        {/* Amount */}
        <label className="label mt-4" htmlFor="amount">
          <span className="label-text">Amount</span>
        </label>
        <input
          type="text"
          id="amount"
          ref={amountRef}
          className={`input w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.amount ? 'border-red-500' : ''}`}
          placeholder="Enter amount"
          value={displayAmount}
          onChange={e => {
            const raw = e.target.value.replace(/[^\d]/g, '');
            setDisplayAmount(raw);
            onAmountChange({ target: { value: raw } });
          }}
          onBlur={e => {
            if (displayAmount && !isNaN(displayAmount)) {
              setDisplayAmount(formatRupiah(Number(displayAmount)));
            }
          }}
          onFocus={e => {
            setDisplayAmount(amount);
          }}
          min={1}
          inputMode="numeric"
        />
        {errors.amount && <span className="text-red-500 text-sm">{errors.amount}</span>}

        {/* Notes */}
        <label className="label mt-4" htmlFor="notes">
          <span className="label-text">Notes</span>
        </label>
        <textarea
          id="notes"
          className="textarea w-full focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Add notes"
          value={notes}
          onChange={onNotesChange}
        ></textarea>

        {/* Date */}
        <label className="label mt-4" htmlFor="date">
          <span className="label-text">Date</span>
        </label>
        <div className="relative">
          <DatePicker
            id="date"
            selected={date ? new Date(date) : null}
            onChange={d => onDateChange({ target: { value: d ? d.toISOString().slice(0, 10) : '' } })}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className={`input w-full focus:outline-none focus:ring-2 focus:ring-primary pr-10 ${errors.date ? 'border-red-500' : ''}`}
            wrapperClassName="w-full"
            autoComplete="off"
          />
          <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}

        {/* Buttons */}
        <div className="mt-6 flex gap-2">
          <button type="submit" className="btn btn-success flex items-center gap-2" disabled={loading}>
            <FaCheck />
            {loading ? 'Saving...' : submitLabel}
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn btn-ghost flex items-center gap-2"
              onClick={onCancel}
            >
              <FaTimes />
              Cancel
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
};

export default RecordInput;