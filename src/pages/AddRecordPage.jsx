import { useInput } from "../hooks/useInput";
import RecordInput from "../components/RecordInput";

const AddRecordPage = ({ onAddRecord }) => {
  const [category, setCategory] = useInput("income");
  const [amount, setAmount] = useInput(0);
  const [notes, setNotes] = useInput("");
  const [date, setDate] = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: All fields must be filled
    if (!amount || Number(amount) <= 0 || notes.trim() === "" || date.trim() === "") {
      alert("Please complete all required fields.");
      return;
    }

    // Create new record
    const newRecord = {
      id: Date.now().toString(),
      type: category,
      amount: Number(amount),
      notes,
      date,
    };

    onAddRecord(newRecord);
    alert("Record successfully added!");

    // Reset form to default values
    setCategory({ target: { value: "income" } });
    setAmount({ target: { value: 0 } });
    setNotes({ target: { value: "" } });
    setDate({ target: { value: "" } });
  };

  return (
    <RecordInput
      category={category}
      onCategoryChange={setCategory}
      amount={amount}
      onAmountChange={setAmount}
      notes={notes}
      onNotesChange={setNotes}
      date={date}
      onDateChange={setDate}
      onSubmit={handleSubmit}
      submitLabel="Add Record"
    />
  );
};

export default AddRecordPage;