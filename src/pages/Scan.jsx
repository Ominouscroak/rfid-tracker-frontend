import { useState, useEffect } from "react";
import { getScans } from "../services/api";

export default function Scan() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize readers with unknown status
  const [readers, setReaders] = useState([
    { id: 1, name: "Reader 1 (Operating Room)", online: null },
    { id: 2, name: "Reader 2 (Sterilization)", online: null },
    { id: 3, name: "Reader 3 (Storage)", online: null },
  ]);

  useEffect(() => {
    // Fetch scans from backend
    const fetchScans = async () => {
      try {
        const res = await getScans();
        setScans(res.data); 
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch scans:", err);
        setLoading(false);
      }
    };

    fetchScans();
    const interval = setInterval(fetchScans, 3000);
    return () => clearInterval(interval);
  }, []);

  // Function to update a reader's status (call this when receiving MQTT/backend updates)
  const updateReaderStatus = (readerId, status) => {
    setReaders((prev) =>
      prev.map((r) => (r.id === readerId ? { ...r, online: status } : r))
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-100">
        RFID Live Scan
      </h1>

      {/* Scanner Status Card */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Scanner Status
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monitoring all connected RFID readers
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {readers.map((reader) => (
            <div
              key={reader.id}
              className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
              style={{
                backgroundColor:
                  reader.online === null
                    ? "rgb(243, 244, 246)" // gray-100 for unknown
                    : reader.online
                    ? "rgb(220, 253, 230)" // green-100
                    : "rgb(254, 226, 226)", // red-100
                color:
                  reader.online === null
                    ? "rgb(107, 114, 128)" // gray-500
                    : reader.online
                    ? "rgb(21, 128, 61)" // green-700
                    : "rgb(220, 38, 38)", // red-700
              }}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  reader.online === null
                    ? "bg-gray-500"
                    : reader.online
                    ? "bg-green-700"
                    : "bg-red-700"
                }`}
              ></span>
              {reader.name}
            </div>
          ))}
        </div>
      </div>

      {/* Scan Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Recent RFID Scans
        </h2>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading scans...</p>
        ) : (
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
              <tr>
                <th className="py-2">RFID Tag</th>
                <th>Instrument</th>
                <th>Location</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {scans.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No scans yet.
                  </td>
                </tr>
              ) : (
                scans.map((scan) => (
                  <tr
                    key={scan.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-2 font-mono">{scan.rfid_tag}</td>
                    <td>{scan.instrument || "Unknown"}</td>
                    <td>{scan.room}</td>
                    <td>{new Date(scan.timestamp).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}