import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";
import AlertCard from "../components/AlertCard";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await getAlerts();
        setAlerts(res.data);
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
        {alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            type={alert.type}
            title={alert.title}
            message={alert.message}
            time={new Date(alert.time).toLocaleString()}
          />
        ))}
      </div>
    </div>
  );
}