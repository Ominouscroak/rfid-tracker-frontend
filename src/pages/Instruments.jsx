import { useState } from "react";

export default function Instruments() {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const instruments = [
    { id: 1, rfid: "RFID001", name: "Scalpel", status: "Sterile", location: "Tray A" },
    { id: 2, rfid: "RFID002", name: "Forceps", status: "In Use", location: "Operating Room 1" },
    { id: 3, rfid: "RFID003", name: "Retractor", status: "Sterile", location: "Tray B" },
    { id: 4, rfid: "RFID004", name: "Clamp", status: "Missing", location: "Unknown" }
  ];

  const filteredInstruments = instruments.filter((instrument) => {

    const matchesSearch =
      instrument.name.toLowerCase().includes(search.toLowerCase()) ||
      instrument.rfid.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || instrument.status === statusFilter;

    const matchesLocation =
      locationFilter === "" || instrument.location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">
          Instrument Inventory
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Instrument
        </button>
      </div>

      {/* Filters */}

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Search instruments..."
          className="border rounded-lg px-3 py-2 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Sterile">Sterile</option>
          <option value="In Use">In Use</option>
          <option value="Missing">Missing</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Tray A">Tray A</option>
          <option value="Tray B">Tray B</option>
          <option value="Operating Room 1">Operating Room 1</option>
          <option value="Unknown">Unknown</option>
        </select>

      </div>

      {/* Table */}

      <div className="bg-white shadow rounded-xl p-4">

        <table className="w-full text-left">

          <thead className="border-b text-gray-500 text-sm">
            <tr>
              <th className="py-2">RFID Tag</th>
              <th>Instrument</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>

            {filteredInstruments.map((instrument) => (

              <tr key={instrument.id} className="border-b hover:bg-gray-50">

                <td className="py-2 font-mono">{instrument.rfid}</td>

                <td>{instrument.name}</td>

                <td>

                  {instrument.status === "Sterile" && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Sterile
                    </span>
                  )}

                  {instrument.status === "In Use" && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      In Use
                    </span>
                  )}

                  {instrument.status === "Missing" && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                      Missing
                    </span>
                  )}

                </td>

                <td>{instrument.location}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}