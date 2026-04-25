import { NextRequest, NextResponse } from "next/server";
import { matchCourses } from "@/lib/courses";

export async function POST(req: NextRequest) {
  try {
    const { topics, level, limit } = await req.json();

    if (!topics || !Array.isArray(topics)) {
      return NextResponse.json({ error: "topics must be an array" }, { status: 400 });
    }

    const courses = matchCourses(topics, level ?? "beginner", limit ?? 5);
    return NextResponse.json({ courses });
  } catch (err) {
    console.error("Course match error:", err);
    return NextResponse.json({ error: "Failed to match courses" }, { status: 500 });
  }
}
