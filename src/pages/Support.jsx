export default function Support() {
  return (
    <div className="min-h-[80vh] p-6 flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-medical-dark dark:text-gray-100">
        System Support
      </h1>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          If you experience issues with the RFID tracking system, please contact our biomedical engineering support team using the information below:
        </p>

        <div className="text-gray-700 dark:text-gray-300 space-y-2">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:raveneye.help@outlook.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              raveneye.help@outlook.com
            </a>
          </p>
          <p><strong>Phone:</strong> +964 780 000 0000</p>
        </div>
      </div>
    </div>
  );
}