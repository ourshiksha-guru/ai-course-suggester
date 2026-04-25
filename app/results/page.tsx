"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SuggestionResult, Course, MatchedModule } from "@/types";

// ─── Scoring ────────────────────────────────────────────────────────────────

interface ScoredCourse {
  course: Course;
  scores: {
    rating: number;       // 0–100
    socialProof: number;  // 0–100
    value: number;        // 0–100 (rating per rupee)
    content: number;      // 0–100 (hours)
  };
  total: number;          // weighted 0–100
  isBest: boolean;
}

function scoreCourses(courses: Course[]): ScoredCourse[] {
  if (courses.length === 0) return [];

  const maxReviews = Math.max(...courses.map((c) => c.reviews));
  const maxHours = Math.max(...courses.map((c) => c.duration_hours));
  const maxValue = Math.max(
    ...courses.map((c) => (c.rating / Math.max(c.price_inr, 1)) * 1000)
  );

  const scored = courses.map((c) => {
    const rating = ((c.rating - 3) / 2) * 100;                               // 3–5 → 0–100
    const socialProof = (c.reviews / maxReviews) * 100;
    const value = ((c.rating / Math.max(c.price_inr, 1)) * 1000 / maxValue) * 100;
    const content = (c.duration_hours / maxHours) * 100;

    const total = rating * 0.35 + socialProof * 0.30 + value * 0.20 + content * 0.15;

    return {
      course: c,
      scores: { rating, socialProof, value, content },
      total: Math.round(total),
      isBest: false,
    };
  });

  const maxTotal = Math.max(...scored.map((s) => s.total));
  scored.forEach((s) => { s.isBest = s.total === maxTotal; });

  return scored.sort((a, b) => b.total - a.total);
}

// ─── ScoreBar ────────────────────────────────────────────────────────────────

function ScoreBar({ value, color = "bg-indigo-500" }: { value: number; color?: string }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div
        className={`${color} h-1.5 rounded-full transition-all`}
        style={{ width: `${Math.max(value, 4)}%` }}
      />
    </div>
  );
}

// ─── CompareModal ────────────────────────────────────────────────────────────

function CompareModal({
  courses,
  moduleTitle,
  onClose,
}: {
  courses: Course[];
  moduleTitle: string;
  onClose: () => void;
}) {
  const scored = scoreCourses(courses);

  const PLATFORM_LABEL: Record<string, string> = {
    udemy: "Udemy",
    tutedude: "TuteDude",
  };
  const PLATFORM_COLOR: Record<string, string> = {
    udemy: "bg-orange-100 text-orange-700 border-orange-200",
    tutedude: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Comparing courses for</p>
            <h2 className="font-bold text-gray-900 text-lg">{moduleTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none transition"
          >
            ×
          </button>
        </div>

        {/* Best pick banner */}
        {scored[0] && (
          <div className="mx-6 mt-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div className="flex-1">
              <p className="text-xs text-amber-600 font-medium">Best Pick</p>
              <p className="text-sm font-semibold text-gray-900">{scored[0].course.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Score {scored[0].total}/100 · {scored[0].course.instructor}
              </p>
            </div>
            <a
              href={scored[0].course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex-shrink-0"
            >
              Enroll Now ↗
            </a>
          </div>
        )}

        {/* Cards */}
        <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scored.map(({ course, scores, total, isBest }) => (
            <div
              key={course.id}
              className={`relative rounded-xl border-2 p-4 flex flex-col gap-3 transition ${
                isBest
                  ? "border-amber-400 bg-amber-50/50"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              {isBest && (
                <span className="absolute -top-3 left-4 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  BEST PICK
                </span>
              )}

              {/* Platform + title */}
              <div>
                <span
                  className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border mb-2 ${PLATFORM_COLOR[course.platform]}`}
                >
                  {PLATFORM_LABEL[course.platform]}
                </span>
                <p className="text-sm font-semibold text-gray-900 line-clamp-3 leading-snug">
                  {course.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">{course.instructor}</p>
              </div>

              {/* Stats */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-semibold text-gray-800">★ {course.rating}</span>
                </div>
                <ScoreBar value={scores.rating} color={isBest ? "bg-amber-400" : "bg-indigo-400"} />

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Popularity</span>
                  <span className="font-semibold text-gray-800">
                    {course.reviews >= 1000
                      ? `${(course.reviews / 1000).toFixed(0)}k reviews`
                      : `${course.reviews} reviews`}
                  </span>
                </div>
                <ScoreBar value={scores.socialProof} color={isBest ? "bg-amber-400" : "bg-indigo-400"} />

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Content</span>
                  <span className="font-semibold text-gray-800">{course.duration_hours}h</span>
                </div>
                <ScoreBar value={scores.content} color={isBest ? "bg-amber-400" : "bg-indigo-400"} />

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Value</span>
                  <span className="font-semibold text-gray-800">₹{course.price_inr}</span>
                </div>
                <ScoreBar value={scores.value} color={isBest ? "bg-amber-400" : "bg-indigo-400"} />
              </div>

              {/* Total score */}
              <div
                className={`rounded-lg px-3 py-2 flex items-center justify-between ${
                  isBest ? "bg-amber-100" : "bg-gray-50"
                }`}
              >
                <span className="text-xs font-medium text-gray-600">Overall Score</span>
                <span
                  className={`text-base font-bold ${isBest ? "text-amber-600" : "text-indigo-600"}`}
                >
                  {total}<span className="text-xs font-normal text-gray-400">/100</span>
                </span>
              </div>

              {/* CTA */}
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto w-full text-center text-xs font-semibold py-2.5 rounded-lg transition ${
                  isBest
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                Enroll on {PLATFORM_LABEL[course.platform]} ↗
              </a>
            </div>
          ))}
        </div>

        {/* Score legend */}
        <div className="px-6 pb-5">
          <p className="text-xs text-gray-400 text-center">
            Score = 35% Rating · 30% Popularity · 20% Value for money · 15% Content hours
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── CourseCard ──────────────────────────────────────────────────────────────

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
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${PLATFORM_COLORS[course.platform]}`}>
            {course.platform === "tutedude" ? "TuteDude" : "Udemy"}
          </span>
          <span className="text-xs text-yellow-500">★ {course.rating}</span>
          <span className="text-xs text-gray-400">({(course.reviews / 1000).toFixed(0)}k)</span>
          <span className="text-xs text-gray-400">{course.duration_hours}h</span>
          <span className="text-xs font-medium text-gray-700">₹{course.price_inr}</span>
        </div>
      </div>
      <span className="text-indigo-400 group-hover:text-indigo-600 text-xs mt-1 flex-shrink-0">↗</span>
    </a>
  );
}

// ─── ModuleCard ──────────────────────────────────────────────────────────────

function ModuleCard({ matched, index }: { matched: MatchedModule; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const [comparing, setComparing] = useState(false);

  return (
    <>
      {comparing && (
        <CompareModal
          courses={matched.courses}
          moduleTitle={matched.module.title}
          onClose={() => setComparing(false)}
        />
      )}

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
                <span key={t} className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
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
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-gray-500">Recommended courses:</p>
                  {matched.courses.length >= 2 && (
                    <button
                      onClick={() => setComparing(true)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Compare &amp; Pick Best
                    </button>
                  )}
                </div>
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
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<SuggestionResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("suggestion");
    if (!raw) { router.replace("/"); return; }
    try { setResult(JSON.parse(raw)); } catch { router.replace("/"); }
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
              SW
            </div>
            <span className="font-semibold text-gray-900">SkillWeaver</span>
          </div>
          <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition">
            ← New roadmap
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Summary */}
        <div className="bg-indigo-600 text-white rounded-2xl p-6">
          <p className="text-indigo-200 text-sm mb-1">Your learning goal</p>
          <h1 className="text-2xl font-bold mb-3">{curriculum.goal}</h1>
          <p className="text-indigo-100 text-sm leading-relaxed">{curriculum.summary}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            {[
              { value: curriculum.total_duration_months, label: "months" },
              { value: curriculum.modules.length, label: "modules" },
              { value: totalCourses, label: "courses matched" },
              { value: curriculum.level, label: "level", capitalize: true },
            ].map(({ value, label, capitalize }) => (
              <div key={label} className="bg-white/10 rounded-xl px-4 py-2 text-center">
                <p className={`text-2xl font-bold ${capitalize ? "capitalize" : ""}`}>{value}</p>
                <p className="text-xs text-indigo-200">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Your Learning Path</h2>
            <span className="text-xs text-gray-400 bg-white border border-gray-200 rounded-full px-3 py-1">
              Click &quot;Compare &amp; Pick Best&quot; inside each module
            </span>
          </div>
          <div className="space-y-3">
            {matched_modules.map((m, i) => (
              <ModuleCard key={i} matched={m} index={i} />
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-400">Courses from Udemy &amp; TuteDude · Built with SkillWeaver</p>
          <Link href="/" className="text-sm text-indigo-600 hover:underline mt-1 inline-block">
            Generate another roadmap
          </Link>
        </div>
      </div>
    </main>
  );
}
