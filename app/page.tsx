"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { GenerateRequest } from "@/types";

const LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

const EXAMPLE_GOALS = [
  "Become a Data Scientist",
  "Master Full Stack Web Development",
  "Learn Machine Learning & AI",
  "Build a career in Cloud & DevOps",
  "Master React and Frontend Development",
];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<GenerateRequest>({
    goal: "",
    duration_months: 6,
    current_level: "beginner",
    hours_per_week: 10,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.goal.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate-curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      sessionStorage.setItem("suggestion", JSON.stringify(data));
      router.push(`/results${data.id ? `?id=${data.id}` : ""}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to generate. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="border-b border-indigo-100 bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            SW
          </div>
          <span className="font-semibold text-gray-900">SkillWeaver</span>
          <span className="text-xs text-gray-400 ml-1">Weaving courses into a structured roadmap</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Your personalised<br />
            <span className="text-indigo-600">learning roadmap</span>
          </h1>
          <p className="text-lg text-gray-500">
            Tell us your goal. We&apos;ll generate a complete curriculum and match the best courses
            from Udemy &amp; TuteDude — in seconds.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What do you want to learn?
            </label>
            <input
              type="text"
              required
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              placeholder="e.g. Become a Data Scientist"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {EXAMPLE_GOALS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setForm({ ...form, goal: g })}
                  className="text-xs bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 text-gray-500 border border-gray-200 px-3 py-1 rounded-full transition"
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your current level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm({ ...form, current_level: value })}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium transition ${
                    form.current_level === value
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                value={form.duration_months}
                onChange={(e) => setForm({ ...form, duration_months: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                {[3, 6, 9, 12, 18, 24].map((m) => (
                  <option key={m} value={m}>
                    {m} months
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours per week
              </label>
              <select
                value={form.hours_per_week}
                onChange={(e) => setForm({ ...form, hours_per_week: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                {[5, 10, 15, 20, 25, 30].map((h) => (
                  <option key={h} value={h}>
                    {h} hrs/week
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !form.goal.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generating your roadmap...
              </>
            ) : (
              "Generate My Learning Roadmap →"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Free to use · Courses from Udemy &amp; TuteDude · Takes ~10 seconds
        </p>
      </div>
    </main>
  );
}
