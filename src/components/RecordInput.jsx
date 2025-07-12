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
  return (
    <form onSubmit={onSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box max-w-2xl mx-auto border p-4">
        <legend className="fieldset-legend text-2xl">
          {titleLabel}
        </legend>

        {/* Category */}
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <select
          className="select w-full"
          value={category}
          onChange={onCategoryChange}
        >
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </select>

        {/* Amount */}
        <label className="label mt-4">
          <span className="label-text">Amount</span>
        </label>
        <input
          type="number"
          className="input w-full"
          placeholder="Enter amount"
          value={amount}
          onChange={onAmountChange}
        />

        {/* Notes */}
        <label className="label mt-4">
          <span className="label-text">Notes</span>
        </label>
        <textarea
          className="textarea w-full"
          placeholder="Add notes"
          value={notes}
          onChange={onNotesChange}
        ></textarea>

        {/* Date */}
        <label className="label mt-4">
          <span className="label-text">Date</span>
        </label>
        <input
          type="date"
          className="input w-full"
          value={date}
          onChange={onDateChange}
        />

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button type="submit" className="btn btn-success">
            {submitLabel}
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
};

export default RecordInput;