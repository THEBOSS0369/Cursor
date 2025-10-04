export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Gradient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-gray-300">Now with GPT-4 and Claude</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Build software
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              faster
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            The AI-first code editor. Write, edit, and chat about your code with
            a powerful AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-all hover:scale-105">
              Download for Free
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-400">
            <div>
              <span className="text-white font-semibold">100K+</span> developers
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div>
              <span className="text-white font-semibold">1M+</span> lines of
              code
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div>
              <span className="text-white font-semibold">50+</span> languages
            </div>
          </div>
        </div>

        {/* Editor Preview */}
        <div className="mt-20 max-w-6xl mx-auto w-full">
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-2xl">
            {/* Window controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="ml-4 text-sm text-gray-400">main.tsx</div>
            </div>

            {/* Code editor mockup */}
            <div className="p-6 font-mono text-sm space-y-2 bg-black/40">
              <div className="text-purple-400">
                import <span className="text-blue-400">React</span> from{" "}
                <span className="text-green-400">'react'</span>;
              </div>
              <div className="text-gray-500">// AI-powered code completion</div>
              <div className="text-purple-400">
                function <span className="text-yellow-400">App</span>() {"{"}
              </div>
              <div className="pl-4 text-purple-400">
                return <span className="text-gray-300">(</span>
              </div>
              <div className="pl-8 text-gray-300">
                &lt;<span className="text-blue-400">div</span>{" "}
                <span className="text-purple-400">className</span>=
                <span className="text-green-400">"app"</span>&gt;
              </div>
              <div className="pl-12 text-gray-300">
                &lt;<span className="text-blue-400">h1</span>&gt;Hello
                World&lt;/<span className="text-blue-400">h1</span>&gt;
              </div>
              <div className="pl-8 text-gray-300">
                &lt;/<span className="text-blue-400">div</span>&gt;
              </div>
              <div className="pl-4 text-gray-300">);</div>
              <div className="text-purple-400">{"}"}</div>
              <div className="h-20"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything you need to code
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
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
              <h3 className="text-xl font-semibold mb-2">AI Autocomplete</h3>
              <p className="text-gray-400">
                Write code faster with intelligent AI suggestions that
                understand your context.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
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
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat with AI</h3>
              <p className="text-gray-400">
                Ask questions about your codebase and get instant, contextual
                answers.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
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
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Edit in Natural Language
              </h3>
              <p className="text-gray-400">
                Describe changes in plain English and watch your code transform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-8 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2025 Cursor. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
