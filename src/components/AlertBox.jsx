import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const iconMap = {
  success: <FaCheckCircle className="text-green-600 w-6 h-6" />,
  error: <FaTimesCircle className="text-red-600 w-6 h-6" />,
  info: <FaInfoCircle className="text-blue-600 w-6 h-6" />,
  warning: <FaExclamationTriangle className="text-yellow-600 w-6 h-6" />,
};

const AlertBox = ({ type = 'info', message, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8">

      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* ALERT BOX */}
      <div className={`alert shadow-lg z-10 ${getAlertClass(type)} w-full max-w-md mx-auto`}>
        {iconMap[type]}
        <span className="text-sm">{message}</span>
        <div className="ml-auto space-x-2">
          {onConfirm ? (
            <>
              <button className="btn btn-sm" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-sm btn-error" onClick={onConfirm}>
                Confirm
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-ghost" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const getAlertClass = (type) => {
  switch (type) {
    case 'success':
      return 'alert-success';
    case 'error':
      return 'alert-error';
    case 'warning':
      return 'alert-warning';
    case 'info':
    default:
      return 'alert-info';
  }
};

export default AlertBox;
