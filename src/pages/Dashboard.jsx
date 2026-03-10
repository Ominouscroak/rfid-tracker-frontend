// src/pages/Dashboard.jsx
function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Page Title */}
      <h2 className="text-3xl font-bold text-medical-dark dark:text-gray-100">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-gray-500">Instruments Total</h3>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-gray-500">Instruments Scanned</h3>
          <p className="text-2xl font-bold">80</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-gray-500">Missing</h3>
          <p className="text-2xl font-bold text-red-500">2</p>
        </div>
      </div>

      {/* Instruments Table */}
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Recent Instruments</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-medical-green text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">001</td>
              <td className="px-4 py-2">Scalpel</td>
              <td className="px-4 py-2 text-green-600">OK</td>
            </tr>
            <tr className="text-center border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">002</td>
              <td className="px-4 py-2">Forceps</td>
              <td className="px-4 py-2 text-red-600">Missing</td>
            </tr>
            <tr className="text-center border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">003</td>
              <td className="px-4 py-2">Scissors</td>
              <td className="px-4 py-2 text-green-600">OK</td>
            </tr>
            <tr className="text-center border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">004</td>
              <td className="px-4 py-2">Tweezers</td>
              <td className="px-4 py-2 text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;