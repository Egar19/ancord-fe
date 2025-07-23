const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="skeleton h-24 w-full rounded-xl"></div>
        <div className="skeleton h-24 w-full rounded-xl"></div>
        <div className="skeleton h-24 w-full rounded-xl"></div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3">
        <div className="skeleton h-9 w-16 rounded-full"></div>
        <div className="skeleton h-9 w-16 rounded-full"></div>
        <div className="skeleton h-9 w-16 rounded-full"></div>
      </div>

      {/* History Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array(4).fill().map((_, idx) => (
          <div key={idx} className="bg-base-200 p-4 rounded-xl flex justify-between items-center">
            <div>
              <div className="skeleton h-4 w-20 mb-2 rounded"></div>
              <div className="skeleton h-4 w-48 rounded"></div>
            </div>
            <div className="skeleton h-8 w-16 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
