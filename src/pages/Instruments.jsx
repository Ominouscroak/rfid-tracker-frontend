import { useState, useEffect } from "react";

export default function Instruments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [instruments, setInstruments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    rfid: "",
    name: "",
    status: "Sterile",
    location: "Operating Room",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("instruments")) || [];
    setInstruments(stored);
  }, []);

  const saveInstruments = (data) => {
    localStorage.setItem("instruments", JSON.stringify(data));
    setInstruments(data);
  };

  const handleAdd = () => {
    if (!form.rfid || !form.name) return;

    const newInstrument = {
      id: Date.now(),
      ...form,
    };

    const updated = [...instruments, newInstrument];
    saveInstruments(updated);

    setForm({
      rfid: "",
      name: "",
      status: "Sterile",
      location: "Operating Room",
    });

    setShowModal(false);
  };

  const filteredInstruments = instruments.filter((instrument) => {
    const matchesSearch =
      instrument.name.toLowerCase().includes(search.toLowerCase()) ||
      instrument.rfid.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "" || instrument.status === statusFilter;
    const matchesLocation = locationFilter === "" || instrument.location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-gray-100">
          Instrument Inventory
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Instrument
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search instruments..."
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Sterile">Sterile</option>
          <option value="In Use">In Use</option>
          <option value="Missing">Missing</option>
        </select>

        <select
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Operating Room">Operating Room</option>
          <option value="Sterilization">Sterilization</option>
          <option value="Storage">Storage</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
            <tr>
              <th className="py-2">RFID Tag</th>
              <th>Instrument</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstruments.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500 dark:text-gray-400">
                  No instruments found.
                </td>
              </tr>
            ) : (
              filteredInstruments.map((instrument) => (
                <tr
                  key={instrument.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-2 font-mono">{instrument.rfid}</td>
                  <td>{instrument.name}</td>
                  <td>
                    {instrument.status === "Sterile" && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs dark:bg-green-900 dark:text-green-300">
                        Sterile
                      </span>
                    )}
                    {instrument.status === "In Use" && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs dark:bg-blue-900 dark:text-blue-300">
                        In Use
                      </span>
                    )}
                    {instrument.status === "Missing" && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs dark:bg-red-900 dark:text-red-300">
                        Missing
                      </span>
                    )}
                  </td>
                  <td>{instrument.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[400px] space-y-4">

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Add New Instrument
            </h2>

            <input
              type="text"
              placeholder="RFID Tag"
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
              value={form.rfid}
              onChange={(e) =>
                setForm({ ...form, rfid: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Instrument Name"
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <select
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Sterile</option>
              <option>In Use</option>
              <option>Missing</option>
            </select>

            <select
              className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            >
              <option>Operating Room</option>
              <option>Sterilization</option>
              <option>Storage</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}