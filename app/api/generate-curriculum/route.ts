import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { GenerateRequest, Curriculum } from "@/types";
import { matchCourses } from "@/lib/courses";
import { saveSuggestion } from "@/lib/supabase";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();
    const { goal, duration_months, current_level, hours_per_week } = body;

    if (!goal || !duration_months || !current_level || !hours_per_week) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = `You are an expert learning curriculum designer. Create a structured learning curriculum for:

Goal: ${goal}
Duration: ${duration_months} months
Current Level: ${current_level}
Available Time: ${hours_per_week} hours/week

Return ONLY valid JSON in this exact format:
{
  "goal": "${goal}",
  "total_duration_months": ${duration_months},
  "level": "${current_level}",
  "summary": "2-3 sentence overview of the learning journey",
  "modules": [
    {
      "order": 1,
      "title": "Module title",
      "description": "What this module covers",
      "duration_weeks": 3,
      "topics": ["topic1", "topic2", "topic3"],
      "skills": ["skill1", "skill2"]
    }
  ]
}

Rules:
- Create 5-8 modules that logically build on each other
- Total duration_weeks across all modules should equal ${duration_months * 4} weeks
- Topics must be specific and searchable (e.g. "python basics", "linear regression", "sql joins")
- Skills should be concrete outcomes (e.g. "write Python scripts", "build REST APIs")
- Tailor difficulty progression to ${current_level} level
- Keep it practical and job-market relevant`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const curriculum: Curriculum = JSON.parse(
      completion.choices[0].message.content || "{}"
    );

    // Match courses for each module
    const matched_modules = curriculum.modules.map((module) => ({
      module,
      courses: matchCourses(module.topics, current_level, 3),
    }));

    // Save to Supabase
    let suggestionId: string | null = null;
    try {
      suggestionId = await saveSuggestion(goal, curriculum, matched_modules);
    } catch {
      // Non-fatal: proceed even if DB save fails
    }

    return NextResponse.json({ curriculum, matched_modules, id: suggestionId });
  } catch (err) {
    console.error("Curriculum generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate curriculum. Please try again." },
      { status: 500 }
    );
  }
}
