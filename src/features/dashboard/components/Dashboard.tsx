import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Test School Assessment Platform
        </h1>

        <p className="text-gray-600 mb-6">
          You have successfully logged in to the Test School Assessment
          Platform. Here you can start taking assessments, view your progress,
          and track your competency achievements.
        </p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">
              Start Assessment
            </h3>
            <p className="text-indigo-700 text-sm mb-4">
              Begin your competency assessment journey with our 3-step
              evaluation.
            </p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Start Now
            </button>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              View Progress
            </h3>
            <p className="text-green-700 text-sm mb-4">
              Track your assessment progress and view completed levels.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              View Progress
            </button>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Certificates
            </h3>
            <p className="text-purple-700 text-sm mb-4">
              Access your earned certificates and competency achievements.
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
              View Certificates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
