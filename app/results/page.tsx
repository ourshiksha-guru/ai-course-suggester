"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SuggestionResult, Course, MatchedModule } from "@/types";

const PLATFORM_COLORS: Record<string, string> = {
  udemy: "bg-orange-100 text-orange-700",
  tutedude: "bg-green-100 text-green-700",
};

function CourseCard({ course }: { course: Course }) {
  return (
    <a
      href={course.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition group"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-700 transition line-clamp-2">
          {course.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{course.instructor}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${PLATFORM_COLORS[course.platform]}`}
          >
            {course.platform === "tutedude" ? "TuteDude" : "Udemy"}
          </span>
          <span className="text-xs text-yellow-500">★ {course.rating}</span>
          <span className="text-xs text-gray-400">({(course.reviews / 1000).toFixed(0)}k)</span>
          <span className="text-xs text-gray-400">{course.duration_hours}h</span>
          <span className="text-xs font-medium text-gray-700">₹{course.price_inr}</span>
        </div>
      </div>
      <span className="text-indigo-400 group-hover:text-indigo-600 text-xs mt-1">↗</span>
    </a>
  );
}

function ModuleCard({ matched, index }: { matched: MatchedModule; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold flex items-center justify-center flex-shrink-0">
          {matched.module.order}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{matched.module.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {matched.module.duration_weeks} weeks · {matched.courses.length} courses matched
          </p>
        </div>
        <span className="text-gray-300 text-lg">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
          <p className="text-sm text-gray-500 pt-4">{matched.module.description}</p>

          <div className="flex flex-wrap gap-2">
            {matched.module.topics.map((t) => (
              <span
                key={t}
                className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          {matched.module.skills.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1.5">You will be able to:</p>
              <ul className="space-y-1">
                {matched.module.skills.map((s) => (
                  <li key={s} className="text-xs text-gray-600 flex items-start gap-1.5">
                    <span className="text-indigo-400 mt-0.5">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {matched.courses.length > 0 ? (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Recommended courses:</p>
              <div className="space-y-2">
                {matched.courses.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">
              No specific courses matched — search &quot;{matched.module.title}&quot; on Udemy.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<SuggestionResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("suggestion");
    if (!raw) {
      router.replace("/");
      return;
    }
    try {
      setResult(JSON.parse(raw));
    } catch {
      router.replace("/");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const { curriculum, matched_modules } = result;
  const totalCourses = matched_modules.reduce((s, m) => s + m.courses.length, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              OS
            </div>
            <span className="font-semibold text-gray-900">Our Shiksha</span>
          </div>
          <Link
            href="/"
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            ← New roadmap
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Summary card */}
        <div className="bg-indigo-600 text-white rounded-2xl p-6">
          <p className="text-indigo-200 text-sm mb-1">Your learning goal</p>
          <h1 className="text-2xl font-bold mb-3">{curriculum.goal}</h1>
          <p className="text-indigo-100 text-sm leading-relaxed">{curriculum.summary}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-bold">{curriculum.total_duration_months}</p>
              <p className="text-xs text-indigo-200">months</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-bold">{curriculum.modules.length}</p>
              <p className="text-xs text-indigo-200">modules</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-bold">{totalCourses}</p>
              <p className="text-xs text-indigo-200">courses matched</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-bold capitalize">{curriculum.level}</p>
              <p className="text-xs text-indigo-200">level</p>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Learning Path</h2>
          <div className="space-y-3">
            {matched_modules.map((m, i) => (
              <ModuleCard key={i} matched={m} index={i} />
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-400">
            Curriculum generated by GPT-4o · Courses from Udemy &amp; TuteDude
          </p>
          <Link href="/" className="text-sm text-indigo-600 hover:underline mt-1 inline-block">
            Generate another roadmap
          </Link>
        </div>
      </div>
    </main>
  );
}
