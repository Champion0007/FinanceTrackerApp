import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>
      </div>

      {/* Logo */}
      <img
        src="/weborbit.png"
        alt="weborbit logo"
        className="h-20 w-20 rounded-2xl shadow-lg shadow-blue-500/20"
      />

      {/* Hero */}
      <header className="mt-6 max-w-md space-y-3">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          FinanceTrackerApp
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed">
          Build fast. Learn faster.{" "}
          <span className="block mt-1">
            Powered by{" "}
            <a
              href="https://www.weborbitsolution.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition font-medium"
            >
              weborbit
            </a>
          </span>
        </p>
      </header>

      {/* Card */}
      <main className="mt-10 w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-2xl shadow-black/40">

        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] hover:shadow-blue-500/40"
        >
          Clicked {count} times
        </button>

        <p className="mt-4 text-sm text-slate-500">
          Edit{" "}
          <code className="bg-white/10 px-1 py-0.5 rounded">
            src/App.jsx
          </code>{" "}
          and save to test HMR
        </p>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-xs text-slate-600">
        ⚡ Crafted with{" "}
        <span className="text-slate-400 font-medium">weborbit</span>
      </footer>
    </div>
  );
}