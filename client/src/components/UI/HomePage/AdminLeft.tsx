"use client";

const AdminLeftPage = () => {
  return (
    <div className="p-2 min-h-screen">
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Top 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* System Balance Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-600">System Balance</h2>
          <p className="text-2xl font-bold text-gray-800 mt-4">$1,200,000</p>
        </div>

        {/* User Count Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-600">User Count</h2>
          <p className="text-2xl font-bold text-gray-800 mt-4">450</p>
        </div>

        {/* Transactions Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-600">
            Total Transactions
          </h2>
          <p className="text-2xl font-bold text-gray-800 mt-4">1,542</p>
        </div>

        {/* Pending Requests Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-600">
            Pending Requests
          </h2>
          <p className="text-2xl font-bold text-gray-800 mt-4">35</p>
        </div>
      </div>

      {/* Additional UI Elements */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        {/* You can add more UI for recent activities, charts, tables, etc. */}
        <div className="text-gray-600">
          <p>No recent activities to display</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLeftPage;
