function EmptyState({
  title,
  message,
  actionText,
  onAction,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-12 text-center">

      <h2 className="text-2xl font-bold text-gray-700">
        {title}
      </h2>

      <p className="text-gray-500 mt-3">
        {message}
      </p>

      {actionText && (
        <button
          onClick={onAction}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          {actionText}
        </button>
      )}

    </div>
  );
}

export default EmptyState;