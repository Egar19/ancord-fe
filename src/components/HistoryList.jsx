import HistoryBody from "./HistoryBody";

const HistoryList = ({ records }) => {
  return (
    <div className="my-4">
      {records.length > 0 ? (
        records.map((record) => <HistoryBody key={record.id} {...record} />)
      ) : (
        <p>Belum ada history</p>
      )}
    </div>
  );
};

export default HistoryList;