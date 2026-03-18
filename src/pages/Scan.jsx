import { useState, useEffect } from "react";
import { getScans } from "../services/api";

export default function Scan() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await getScans();
        setScans(res.data);
      } catch (err) {
        console.error("Error fetching scans:", err);
      }
    };

    fetchScans();
    const interval = setInterval(fetchScans, 2000);

    return () => clearInterval(interval);
  }, []);

  const roomLabels = {
    OR: "Operating Room",
    STERILIZATION: "Sterilization",
    STORAGE: "Storage",
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-100">
        RFID Live Scan
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Scanner Status
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Connected to RFID Reader
          </p>
        </div>

        <span className="px-4 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm">
          Online
        </span>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Recent RFID Scans
        </h2>

        <table className="w-full text-left">
          <thead className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
            <tr>
              <th className="py-2">RFID Tag</th>
              <th>Instrument</th>
              <th>Room</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {scans.map((scan) => (
              <tr
                key={scan.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-2 font-mono">{scan.rfid_tag}</td>
                <td>{scan.instrument}</td>
                <td>{roomLabels[scan.room] || scan.room}</td>
                <td>
                  {new Date(scan.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}