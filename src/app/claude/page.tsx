"use client";

export default function ClaudePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Gradient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Claude AI
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Meet Claude, your intelligent AI assistant built by Anthropic
            </p>
          </div>

          {/* Main Description Card */}
          <div className="p-8 rounded-xl bg-white/5 border border-white/10 mt-12">
            <h2 className="text-2xl font-semibold mb-4">What is Claude?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Claude is a next-generation AI assistant built by Anthropic. It's designed to be helpful, harmless, and honest in all interactions.
              Whether you need help with complex reasoning, creative writing, coding, mathematics, or simple conversation, Claude is here to assist you.
            </p>
            <p className="text-gray-300 leading-relaxed">
              With advanced natural language understanding and generation capabilities, Claude can understand context, maintain coherent conversations,
              and provide thoughtful, nuanced responses to a wide range of queries.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Intelligent Reasoning</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Advanced reasoning capabilities for complex problem-solving, analysis, and decision-making tasks
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Code Assistance</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Expert help with programming across multiple languages, debugging, and software architecture
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Creative Writing</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Assistance with creative content, from storytelling to professional writing and editing
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Safe & Responsible</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Built with safety in mind, designed to be helpful, harmless, and honest in all interactions
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Natural Conversations</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Engage in flowing, context-aware conversations that feel natural and human-like
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Versatile Applications</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                From research and analysis to creative projects and technical tasks, Claude adapts to your needs
              </p>
            </div>
          </div>

          {/* Key Capabilities Section */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="p-8 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20">
              <h3 className="text-2xl font-semibold mb-4">Key Capabilities</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Process and analyze large amounts of text and data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Write and debug code in multiple programming languages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Provide detailed explanations and breakdowns of complex topics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Assist with creative writing and content generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Perform mathematical calculations and reasoning</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
              <h3 className="text-2xl font-semibold mb-4">Built by Anthropic</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Anthropic is an AI safety company dedicated to building reliable, interpretable, and steerable AI systems.
                Claude is the result of extensive research in AI safety and alignment.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The company's mission is to ensure that artificial intelligence has a positive impact on the world,
                prioritizing safety and beneficial outcomes in all their work.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center p-12 rounded-xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 border border-orange-500/20 mt-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Claude?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Start using Claude today and discover how AI can enhance your productivity, creativity, and problem-solving abilities.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all hover:scale-105">
                Try Claude
              </button>
              <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg font-medium hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
