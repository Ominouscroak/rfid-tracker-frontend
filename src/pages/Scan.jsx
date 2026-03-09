import { useState, useEffect } from "react";

export default function Scan() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    // Temporary fake data (replace with backend later)
    const interval = setInterval(() => {
      const newScan = {
        id: Math.random().toString(36).substring(7),
        tag: "RFID-" + Math.floor(Math.random() * 1000),
        instrument: "Forceps",
        location: "Operating Room 1",
        time: new Date().toLocaleTimeString(),
      };

      setScans((prev) => [newScan, ...prev.slice(0, 9)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold text-slate-800">
        RFID Live Scan
      </h1>

      {/* Scanner Status */}
      <div className="bg-white shadow rounded-xl p-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Scanner Status</p>
          <p className="text-sm text-gray-500">Connected to RFID Reader</p>
        </div>

        <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          Online
        </span>
      </div>

      {/* Scan Table */}
      <div className="bg-white shadow rounded-xl p-4">

        <h2 className="text-lg font-semibold mb-4">
          Recent RFID Scans
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="py-2">RFID Tag</th>
              <th>Instrument</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {scans.map((scan) => (
              <tr key={scan.id} className="border-b hover:bg-gray-50">
                <td className="py-2 font-mono">{scan.tag}</td>
                <td>{scan.instrument}</td>
                <td>{scan.location}</td>
                <td>{scan.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}