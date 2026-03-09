export default function Alerts() {
  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold text-slate-800">
        System Alerts
      </h1>

      {/* Filter buttons */}
      <div className="flex gap-3">

        <button className="px-3 py-1 rounded bg-red-100 text-red-700">
          Critical
        </button>

        <button className="px-3 py-1 rounded bg-yellow-100 text-yellow-700">
          Warning
        </button>

        <button className="px-3 py-1 rounded bg-blue-100 text-blue-700">
          Info
        </button>

      </div>

      {/* Alerts List */}

      <div className="space-y-4">

        <div className="bg-white shadow rounded-xl p-4 flex justify-between">

          <div>
            <p className="font-semibold">
              Instrument Missing
            </p>

            <p className="text-sm text-gray-500">
              Scalpel not returned to tray
            </p>
          </div>

          <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs">
            CRITICAL
          </span>

        </div>


        <div className="bg-white shadow rounded-xl p-4 flex justify-between">

          <div>
            <p className="font-semibold">
              Instrument Outside OR
            </p>

            <p className="text-sm text-gray-500">
              Forceps scanned in hallway
            </p>
          </div>

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs">
            WARNING
          </span>

        </div>

      </div>

    </div>
  );
}