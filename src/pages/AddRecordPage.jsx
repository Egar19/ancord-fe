import { useInput } from "../hooks/useInput";
import AddRecordInput from "../components/AddRecordInput";

const AddRecordPage = ({ onAddRecord }) => {
  const [category, setCategory] = useInput("income");
  const [amount, setAmount] = useInput(0);
  const [notes, setNotes] = useInput("");
  const [date, setDate] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi: tidak boleh ada yang kosong
    if (!amount || Number(amount) <= 0 || notes.trim() === "" || date.trim() === "") {
      alert("Form belum lengkap!");
      return;
    }

    // Buat record baru
    const newRecord = {
      id: Date.now().toString(),
      type: category,
      amount: Number(amount),
      notes,
      date,
    };

    onAddRecord(newRecord);
    alert("Record berhasil ditambahkan!");

    // Reset form
    setCategory({ target: { value: "income" } });
    setAmount({ target: { value: 0 } });
    setNotes({ target: { value: "" } });
    setDate({ target: { value: "" } });
  };

  return (
    <AddRecordInput
      category={category}
      onCategoryChange={setCategory}
      amount={amount}
      onAmountChange={setAmount}
      notes={notes}
      onNotesChange={setNotes}
      date={date}
      onDateChange={setDate}
      onSubmit={handleSubmit}
    />
  );
};

export default AddRecordPage;