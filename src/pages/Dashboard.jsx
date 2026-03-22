import { useEffect, useState } from "react";
import { getInstruments, getScans } from "../services/api";

function Dashboard() {
  const [total, setTotal] = useState(0);
  const [scanned, setScanned] = useState(0);
  const [missing, setMissing] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instrumentsRes = await getInstruments();
        const scansRes = await getScans();

        const instruments = instrumentsRes.data || [];
        const scans = scansRes.data || [];

        const totalCount = instruments.length;

        const scannedSet = new Set(
          scans.map((scan) => scan.rfid_tag)
        );

        const scannedCount = scannedSet.size;
        const missingList = instruments.filter(
          (inst) => !scannedSet.has(inst.rfid)
        );

        const missingCount = missingList.length;

        setTotal(totalCount);
        setScanned(scannedCount);
        setMissing(missingCount);

        // 🚨 SMART ALERT GENERATION
        generateAlerts(missingList);

      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);

  }, []);

  // 🧠 ALERT ENGINE
  const generateAlerts = (missingList) => {
    const existingAlerts =
      JSON.parse(localStorage.getItem("smartAlerts")) || [];

    const existingMessages = existingAlerts.map(
      (a) => a.message
    );

    const newAlerts = [];

    missingList.forEach((instrument) => {
      const message = `${instrument.name} is missing!`;

      if (!existingMessages.includes(message)) {
        newAlerts.push({
          type: "critical",
          title: "Missing Instrument",
          message,
          time: new Date().toISOString(),
        });
      }
    });

    if (newAlerts.length > 0) {
      const updated = [...existingAlerts, ...newAlerts];
      localStorage.setItem("smartAlerts", JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-6">

      <h2 className="text-3xl font-bold text-medical-dark dark:text-gray-100">
        Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-gray-500">Instruments Total</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-gray-500">Instruments Scanned</h3>
          <p className="text-2xl font-bold">{scanned}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-gray-500">Missing</h3>
          <p className="text-2xl font-bold text-red-500">{missing}</p>
        </div>
      </div>

      {/* keep your table unchanged */}
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
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;