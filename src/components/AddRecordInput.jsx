const AddRecordInput = ({
  category,
  onCategoryChange,
  amount,
  onAmountChange,
  notes,
  onNotesChange,
  date,
  onDateChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box max-w-2xl mx-auto border p-4">
        <legend className="fieldset-legend text-2xl">Add Record</legend>

        {/* Kategori */}
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <select className="select w-full" value={category} onChange={onCategoryChange}>
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </select>

        {/* Nominal */}
        <label className="label mt-4">
          <span className="label-text">Amount</span>
        </label>
        <input
          type="number"
          className="input w-full"
          placeholder="Masukkan jumlah"
          value={amount}
          onChange={onAmountChange}
        />

        {/* Notes */}
        <label className="label mt-4">
          <span className="label-text">Notes</span>
        </label>
        <textarea
          className="textarea w-full"
          placeholder="Tambahkan catatan"
          value={notes}
          onChange={onNotesChange}
        ></textarea>

        {/* Tanggal */}
        <label className="label mt-4">
          <span className="label-text">Date</span>
        </label>
        <input
          type="date"
          className="input w-full"
          value={date}
          onChange={onDateChange}
        />

        {/* Submit */}
        <button type="submit" className="btn btn-success my-4">
          Tambah Record
        </button>
      </fieldset>
    </form>
  );
};

export default AddRecordInput;