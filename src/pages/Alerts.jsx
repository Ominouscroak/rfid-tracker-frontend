import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";
import AlertCard from "../components/AlertCard";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        let backendAlerts = [];

        try {
          const res = await getAlerts();
          backendAlerts = res.data || [];
        } catch {
          console.log("Backend alerts not available, using local alerts only");
        }

        // 🧠 get smart alerts from localStorage
        const localAlerts =
          JSON.parse(localStorage.getItem("smartAlerts")) || [];

        // merge both
        const allAlerts = [...backendAlerts, ...localAlerts];

        // sort newest first
        allAlerts.sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        );

        setAlerts(allAlerts);

      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-100">
        System Alerts
      </h1>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No alerts.
          </p>
        ) : (
          alerts.map((alert, index) => (
            <AlertCard
              key={index}
              type={alert.type}
              title={alert.title}
              message={alert.message}
              time={new Date(alert.time).toLocaleString()}
            />
          ))
        )}
      </div>
    </div>
  );
}