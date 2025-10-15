import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clash Royale Battle Arena | Cursor",
  description: "Experience the battle arena with two competing sides",
};

export default function ClashRoyalePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Battle Arena Container */}
      <div className="relative min-h-screen flex flex-col">
        {/* Red Section - Top Half */}
        <section className="relative flex-1 bg-gradient-to-b from-red-600 via-red-700 to-red-800 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-500/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-16 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/60 border border-red-400/30 rounded-full text-sm backdrop-blur-sm">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                <span className="text-red-100">Red Team Territory</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-2xl">
                <span className="bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent">
                  Battle Arena
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto drop-shadow-lg">
                Dominate the battlefield with strategy and power. The red side
                represents strength, aggression, and victory.
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 pt-6 text-sm text-red-100">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
                    100
                  </span>
                  <span className="text-red-200">Trophies</span>
                </div>
                <div className="w-1 h-12 bg-red-400/50 rounded-full"></div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
                    50
                  </span>
                  <span className="text-red-200">Wins</span>
                </div>
                <div className="w-1 h-12 bg-red-400/50 rounded-full"></div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
                    12
                  </span>
                  <span className="text-red-200">Arena</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg hover:from-orange-400 hover:to-red-400 transition-all hover:scale-105 shadow-2xl">
                  Attack!
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Border Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        </section>

        {/* Center Divider - Battle Line */}
        <div className="relative h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 shadow-2xl z-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 -mt-7 bg-yellow-400 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-.95-7-5.35-7-9.93V8.35l7-3.89 7 3.89v1.72c0 4.58-3.14 8.98-7 9.93z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Green Section - Bottom Half */}
        <section className="relative flex-1 bg-gradient-to-b from-green-700 via-green-800 to-emerald-900 overflow-hidden">
          {/* Top Border Effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-16 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/60 border border-green-400/30 rounded-full text-sm backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-100">Green Team Territory</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-2xl">
                <span className="bg-gradient-to-r from-green-200 via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                  Defense Line
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto drop-shadow-lg">
                Protect your towers with precision and tactics. The green side
                represents defense, wisdom, and resilience.
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 pt-6 text-sm text-green-100">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
                    95
                  </span>
                  <span className="text-green-200">Trophies</span>
                </div>
                <div className="w-1 h-12 bg-green-400/50 rounded-full"></div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
                    48
                  </span>
                  <span className="text-green-200">Wins</span>
                </div>
                <div className="w-1 h-12 bg-green-400/50 rounded-full"></div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold text-white drop-shadow-lg">
                    11
                  </span>
                  <span className="text-green-200">Arena</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold text-lg hover:from-emerald-400 hover:to-green-400 transition-all hover:scale-105 shadow-2xl">
                  Defend!
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Battle Info */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-xs text-gray-400">Time Left</div>
              <div className="text-xl font-bold text-white">3:00</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-xs text-gray-400">Mode</div>
              <div className="text-sm font-semibold text-white">1v1 Battle</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
