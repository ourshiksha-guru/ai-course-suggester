export interface CurriculumModule {
  title: string;
  description: string;
  duration_weeks: number;
  topics: string[];
  skills: string[];
  order: number;
}

export interface Curriculum {
  goal: string;
  total_duration_months: number;
  level: string;
  modules: CurriculumModule[];
  summary: string;
}

export interface Course {
  id: string;
  title: string;
  platform: "udemy" | "tutedude";
  url: string;
  instructor: string;
  rating: number;
  reviews: number;
  price_inr: number;
  duration_hours: number;
  level: string;
  topics: string[];
  thumbnail?: string;
}

export interface MatchedModule {
  module: CurriculumModule;
  courses: Course[];
}

export interface SuggestionResult {
  curriculum: Curriculum;
  matched_modules: MatchedModule[];
}

export interface GenerateRequest {
  goal: string;
  duration_months: number;
  current_level: "beginner" | "intermediate" | "advanced";
  hours_per_week: number;
}
