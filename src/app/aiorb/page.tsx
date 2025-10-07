"use client";

import { useState } from "react";
import { AIOrb } from "../ui/components/AIOrb";

export default function AIOrbDemo() {
  const [processingHistory, setProcessingHistory] = useState<
    Array<{ timestamp: Date; state: string }>
  >([]);

  const handleStateChange = (isActive: boolean) => {
    setProcessingHistory((prev) => [
      ...prev,
      {
        timestamp: new Date(),
        state: isActive ? "Started" : "Stopped",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Gradient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-12 w-full">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI Orb Interface
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the next generation of AI interaction with our
              sophisticated orb visualization
            </p>
          </div>

          {/* AI Orb Component */}
          <div className="flex justify-center py-12">
            <AIOrb
              size={2}
              onStateChange={handleStateChange}
              advancedAnimation={true}
            />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Real-time Animation
              </h3>
              <p className="text-gray-400 text-sm">
                Smooth, responsive animations that adapt to processing state
                with dynamic speed variations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">State Management</h3>
              <p className="text-gray-400 text-sm">
                Professional state handling with proper transitions and debounce
                protection.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fully Customizable</h3>
              <p className="text-gray-400 text-sm">
                Extensive configuration options for size, speed, colors, and
                animation behavior.
              </p>
            </div>
          </div>

          {/* Activity Log */}
          {processingHistory.length > 0 && (
            <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Activity Log
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {processingHistory
                  .slice(-10)
                  .reverse()
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm py-2 px-3 rounded bg-white/5"
                    >
                      <span className="text-gray-300">{entry.state}</span>
                      <span className="text-gray-500">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
