export default function AlertCard({ type, title, message, time }) {
  const colorMap = {
    critical: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {message}
        </p>
      </div>

      <div className="text-right space-y-1">
        <span className={`px-3 py-1 text-xs rounded-full ${colorMap[type]}`}>
          {type.toUpperCase()}
        </span>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}