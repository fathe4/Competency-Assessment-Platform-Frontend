import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  PageContainer,
  ActionCard,
  ClipboardListIcon,
  ChartBarIcon,
  CertificateIcon,
} from "../shared";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartAssessment = () => {
    navigate("/assessment-test");
  };

  const handleViewProgress = () => {
    // Navigate to progress page when implemented
    console.log("Navigate to progress page");
  };

  const handleViewCertificates = () => {
    // Navigate to certificates page when implemented
    console.log("Navigate to certificates page");
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <PageContainer className="py-8">
        {/* Welcome Header - Enhanced */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Welcome back, {user?.fullName || "Student"}!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to continue your learning journey? Choose an action below to
            get started on your path to digital competency certification.
          </p>
        </div>

        {/* Quick Actions - Enhanced Design */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Actions
          </h2>
          <div className="flex flex-row lg:flex-col gap-6 sm:gap-8">
            <div className="flex-1">
              <ActionCard
                title="Start Assessment"
                description="Begin your 3-step evaluation journey."
                icon={<ClipboardListIcon />}
                buttonText="Start Now"
                onClick={handleStartAssessment}
                variant="primary"
              />
            </div>

            <div className="flex-1">
              <ActionCard
                title="View Progress"
                description="Track your learning achievements."
                icon={<ChartBarIcon />}
                buttonText="View Progress"
                onClick={handleViewProgress}
                variant="success"
              />
            </div>

            <div className="flex-1">
              <ActionCard
                title="Certificates"
                description="Access your earned certificates."
                icon={<CertificateIcon />}
                buttonText="View Certificates"
                onClick={handleViewCertificates}
                variant="info"
              />
            </div>
          </div>
        </div>

        {/* Information Panels - Enhanced Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Assessment Levels */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              Assessment Levels
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-2xl">
                <span className="text-sm font-semibold text-blue-700">
                  A1-A2 Level
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold">
                  Basic
                </span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-indigo-50 rounded-2xl">
                <span className="text-sm font-semibold text-indigo-700">
                  B1-B2 Level
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-full text-xs font-semibold">
                  Intermediate
                </span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-purple-50 rounded-2xl">
                <span className="text-sm font-semibold text-purple-700">
                  C1-C2 Level
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-xs font-semibold">
                  Advanced
                </span>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              Assessment Tips
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Score ≥75% to advance levels
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                &lt;25% on Step 1 prevents retakes
              </li>
              <li className="flex items-start text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Complete all steps for certificate
              </li>
            </ul>
          </div>

          {/* User Stats */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
              Your Progress
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
                <div className="text-sm font-medium text-gray-500">
                  Completed
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
                <div className="text-sm font-medium text-gray-500">
                  Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default Dashboard;
