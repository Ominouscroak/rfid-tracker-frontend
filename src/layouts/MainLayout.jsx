/** src/layouts/MainLayout.jsx */

import logo from "../assets/logo.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { getAlerts, getScans, getStatus } from "../services/api";

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === "/";

  const [darkMode, setDarkMode] = useState(false);

  // 🔔 notifications
  const [unreadCount, setUnreadCount] = useState(0);

  // 🟢 system status
  const [rfidStatus, setRfidStatus] = useState("Offline");
  const [scannerStatus, setScannerStatus] = useState("Idle");
  const [dbStatus, setDbStatus] = useState("Disconnected");

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  // 🔔 Alerts logic
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await getAlerts();
        const alerts = res.data || [];

        const lastSeen = localStorage.getItem("lastSeenAlertTime");

        let unread = 0;

        if (!lastSeen) unread = alerts.length;
        else {
          unread = alerts.filter(
            (alert) => new Date(alert.time) > new Date(lastSeen)
          ).length;
        }

        setUnreadCount(unread);
      } catch (err) {
        console.error("Alert check failed:", err);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🧠 Clear notifications
  useEffect(() => {
    if (location.pathname === "/alerts") {
      localStorage.setItem("lastSeenAlertTime", new Date().toISOString());
      setUnreadCount(0);
    }
  }, [location.pathname]);

  // 🟢 SYSTEM STATUS (HYBRID)
  useEffect(() => {
    const checkSystem = async () => {
      try {
        // try backend status
        const statusRes = await getStatus();
        const status = statusRes.data;

        setRfidStatus(
          status.rfid_reader === "online" ? "Online" : "Offline"
        );
        setScannerStatus(
          status.scanner === "active" ? "Active" : "Idle"
        );
        setDbStatus(
          status.database === "connected" ? "Connected" : "Disconnected"
        );

      } catch {
        // fallback to scans
        try {
          const res = await getScans();
          const scans = res.data || [];

          setDbStatus("Connected");

          if (scans.length === 0) {
            setRfidStatus("Offline");
            setScannerStatus("Idle");
            return;
          }

          const latestScan = scans.reduce((latest, scan) => {
            return new Date(scan.timestamp) > new Date(latest.timestamp)
              ? scan
              : latest;
          });

          const diffSeconds =
            (new Date() - new Date(latestScan.timestamp)) / 1000;

          if (diffSeconds < 10) {
            setRfidStatus("Online");
            setScannerStatus("Active");
          } else if (diffSeconds < 60) {
            setRfidStatus("Online");
            setScannerStatus("Idle");
          } else {
            setRfidStatus("Offline");
            setScannerStatus("Idle");
          }

        } catch (err) {
          console.error("System check failed:", err);
          setDbStatus("Disconnected");
          setRfidStatus("Offline");
          setScannerStatus("Idle");
        }
      }
    };

    checkSystem();
    const interval = setInterval(checkSystem, 5000);
    return () => clearInterval(interval);

  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setDarkMode(html.classList.contains("dark"));
  };

  const statusColor = (status) => {
    if (["Online", "Connected", "Active"].includes(status))
      return "text-green-600 dark:text-green-400";
    if (status === "Idle") return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex min-h-screen bg-medical-light dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-medical-green text-white p-6 flex flex-col">
        <img src={logo} alt="Hospital RFID Logo" className="w-32 h-auto mb-4" />
        <h1 className="text-2xl font-bold mb-8">Raven Eye</h1>

        <nav className="flex flex-col space-y-4">
          <Link to="/" className="hover:text-medical-turquoise">Dashboard</Link>
          <Link to="/instruments" className="hover:text-medical-turquoise">Instruments</Link>
          <Link to="/scan" className="hover:text-medical-turquoise">Scan</Link>
          <Link to="/alerts" className="hover:text-medical-turquoise">Alerts</Link>
          <Link to="/support" className="hover:text-medical-turquoise">Support</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col p-6 bg-medical-light dark:bg-gray-900">

        {isDashboard && (
          <div className="flex justify-between items-start mb-6 flex-wrap gap-6">

            {/* LEFT */}
            <div className="flex-1 min-w-[300px]">
              <h1 className="text-2xl font-bold text-medical-dark dark:text-gray-100">
                Welcome to Raven Eye the RFID Surgical Tracking System
              </h1>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Monitor instruments, track scans, and detect missing surgical tools in real time.
              </p>

              {/* ✅ RESTORED STATUS CARDS */}
              <div className="flex gap-4 mt-4 flex-wrap">

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 text-sm min-w-[150px]">
                  <p className="text-gray-500 dark:text-gray-400">RFID Reader</p>
                  <p className={`font-semibold ${statusColor(rfidStatus)}`}>
                    {rfidStatus}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 text-sm min-w-[150px]">
                  <p className="text-gray-500 dark:text-gray-400">Scanner Activity</p>
                  <p className={`font-semibold ${statusColor(scannerStatus)}`}>
                    {scannerStatus}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 text-sm min-w-[150px]">
                  <p className="text-gray-500 dark:text-gray-400">Database</p>
                  <p className={`font-semibold ${statusColor(dbStatus)}`}>
                    {dbStatus}
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-end gap-4 min-w-[150px]">

              <div className="flex gap-3 items-center">

                <div
                  className="relative cursor-pointer"
                  onClick={() => navigate("/alerts")}
                >
                  <Bell className="w-6 h-6 text-gray-600 dark:text-gray-200" />

                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full px-1">
                      {unreadCount}
                    </span>
                  )}
                </div>

                <button onClick={toggleDarkMode}>
                  {darkMode ? (
                    <Sun className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Moon className="w-6 h-6 text-gray-600 dark:text-gray-200" />
                  )}
                </button>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium">Dr. Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">System Operator</p>
              </div>

            </div>
          </div>
        )}

        <div className="flex-1">
          <Outlet />
        </div>

        <footer className="text-center text-xs text-gray-400 dark:text-gray-500 py-4 mt-6">
          Biomedical Engineering Senior Project — Raven Eye the RFID Surgical Tracking System
        </footer>
      </main>
    </div>
  );
}

export default MainLayout;