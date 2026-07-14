function DashboardCard({ title, value, color,children }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 border-l-8 ${color}`}
    >
      <h2 className="text-gray-600 text-lg">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-3">
        {value??0}
      </p>
      {children &&(
        <div className="mt-3">
          {children}
          </div>
      )}
    </div>
  );
}

export default DashboardCard;