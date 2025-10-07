import Link from "next/link";

export function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
      <Link href="/">
        <div className="text-xl font-semibold">Cursor</div>
      </Link>
      <div className="flex items-center gap-8">
        <a
          href="/features"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Features
        </a>
        <a
          href="/aiorb"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          AIORB
        </a>
        <a
          href="/api"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Api
        </a>
        <a
          href="#"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Pricing
        </a>
        <a
          href="#"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Download
        </a>
        <button className="px-4 py-2 text-sm bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
          Sign In
        </button>
      </div>
    </nav>
  );
}
