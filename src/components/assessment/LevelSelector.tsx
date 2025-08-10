import React from "react";
import { ClockIcon } from "../shared";

interface Level {
  id: 1 | 2 | 3;
  title: string;
  subtitle: string;
  description: string;
  questions: number;
  color: string;
  borderColor: string;
  icon: string;
  letter: string;
}

interface LevelSelectorProps {
  isLoading: boolean;
  onSelectLevel: (levelId: 1 | 2 | 3) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  isLoading,
  onSelectLevel,
}) => {
  const levels: Level[] = [
    {
      id: 1,
      title: "Foundation Level",
      subtitle: "A1 - A2 Competencies",
      description: "Basic digital literacy and fundamental computer skills",
      questions: 44,
      color: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      icon: "📚",
      letter: "A",
    },
    {
      id: 2,
      title: "Professional Level",
      subtitle: "B1 - B2 Competencies",
      description: "Intermediate skills for professional environments",
      questions: 44,
      color: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      icon: "💼",
      letter: "B",
    },
    {
      id: 3,
      title: "Expert Level",
      subtitle: "C1 - C2 Competencies",
      description: "Advanced competencies for specialized roles",
      questions: 44,
      color: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      icon: "🎯",
      letter: "C",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
        Choose Your Assessment Level
      </h2>

      <div className="grid sm:grid-cols-1 grid-cols-3 gap-6 lg:gap-8">
        {levels.map((levelData) => (
          <div
            key={levelData.id}
            className="group cursor-pointer h-full"
            onClick={() => {
              if (!isLoading) {
                onSelectLevel(levelData.id);
              }
            }}
          >
            <div
              className={`bg-gradient-to-br ${levelData.color} rounded-3xl p-6 lg:p-8 border-2 ${levelData.borderColor} hover:border-gray-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl h-full flex flex-col`}
            >
              <div className="text-center mb-6 flex-grow">
                <div className="text-3xl lg:text-4xl mb-4">
                  {levelData.icon}
                </div>
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md">
                  <span className="text-xl lg:text-2xl font-bold text-gray-900">
                    {levelData.letter}
                  </span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                  {levelData.title}
                </h3>
                <p className="text-gray-600 mb-2 text-sm lg:text-base">
                  {levelData.subtitle}
                </p>
                <p className="text-xs lg:text-sm text-gray-500 mb-4 leading-relaxed">
                  {levelData.description}
                </p>
                <div className="inline-flex items-center bg-white rounded-full px-3 py-2 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium text-gray-700">
                  <ClockIcon className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                  {levelData.questions} Questions
                </div>
              </div>

              <button
                className="w-full bg-gray-900 text-white rounded-2xl py-3 lg:py-4 px-4 lg:px-6 font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center text-sm lg:text-base mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Starting..." : "Begin Assessment"}
                <svg
                  className="w-4 h-4 lg:w-5 lg:h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
