import React from 'react';
import { Activity, Users, BarChart2, Settings, Zap, BookType } from 'lucide-react';

function FeatureDisplay() {
  return (
    <div className="mt-5 p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">
          <h3 className="flex content-center text-emerald-400 font-medium text-lg whitespace-pre-line mb-2">
          <Activity className=" text-emerald-400 mr-5 mt-3" />
            Real-time
            Feedback
          </h3>
          <p className="text-zinc-400 text-sm">
            Get instant feedback of typing-speed /  accuracy.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">
          <h3 className="flex content-center text-sky-400 font-medium text-lg whitespace-pre-line mb-2">
            <Users className="text-sky-400 mr-5 mt-3" />
            Challenge
            Friends
          </h3>
          <p className="text-zinc-400 text-sm">
            Compete with friends in real-time typing races.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">
          <h3 className="flex content-center text-yellow-400 font-medium text-lg whitespace-pre-line mb-2">
            <BarChart2 className="text-yellow-400 mr-5 mt-3" />
            Detailed
            Statistics
          </h3>
          <p className="text-zinc-400 text-sm">
            Track progress over time with comprehensive stats.
          </p>
        </div>

        <div className="md:col-span-3/2 bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">
          <h3 className="flex content-center text-purple-400 font-medium text-lg whitespace-pre-line mb-2">
            <Settings className="text-purple-400 mr-5 mt-3" />
            Customizable
            Options
          </h3>
          <p className="text-zinc-400 text-sm">
            Personalize your typing experience.
          </p>
        </div>

        <div className="md:col-span-3/2 bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">
          <h3 className="flex content-center text-[#F2F9FF] font-medium text-lg whitespace-pre-line mb-2">
            <Zap className="text-[#F2F9FF] mr-5 mt-3" />
            Minimalist
            Interface
          </h3>
          <p className="text-zinc-400 text-sm">
            Clean and focused design for better concentration.
          </p>
        </div>
        <div className="md:col-span-3/2 bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors duration-200">
          <h3 className="flex content-center text-[#F4D793] font-medium text-lg whitespace-pre-line mb-2">
            <BookType className="text-[#F4D793] mr-5 mt-3" />
            Improved
            Performance
          </h3>
          <p className="text-zinc-400 text-sm">
            Added some features which improves performance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeatureDisplay;