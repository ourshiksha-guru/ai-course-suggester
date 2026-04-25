import { Course } from "@/types";

export const COURSES: Course[] = [
  // ── PYTHON ──────────────────────────────────────────────────────────────
  {
    id: "u-python-bootcamp",
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    platform: "udemy",
    url: "https://www.udemy.com/course/100-days-of-code/",
    instructor: "Dr. Angela Yu",
    rating: 4.7,
    reviews: 350000,
    price_inr: 499,
    duration_hours: 60,
    level: "beginner",
    topics: ["python", "programming", "coding", "beginner", "basics", "scripting"],
  },
  {
    id: "u-python-ds",
    title: "Python for Data Science and Machine Learning Bootcamp",
    platform: "udemy",
    url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
    instructor: "Jose Portilla",
    rating: 4.6,
    reviews: 140000,
    price_inr: 499,
    duration_hours: 25,
    level: "beginner",
    topics: ["python", "data science", "machine learning", "pandas", "numpy", "matplotlib"],
  },
  {
    id: "td-python",
    title: "Python Programming Masterclass",
    platform: "tutedude",
    url: "https://tutedude.com/course/python-programming",
    instructor: "TuteDude Faculty",
    rating: 4.5,
    reviews: 12000,
    price_inr: 299,
    duration_hours: 30,
    level: "beginner",
    topics: ["python", "programming", "basics", "oop", "scripting"],
  },

  // ── DATA SCIENCE ────────────────────────────────────────────────────────
  {
    id: "u-ds-az",
    title: "Data Science A-Z™: Real-Life Data Science Exercises",
    platform: "udemy",
    url: "https://www.udemy.com/course/datascience/",
    instructor: "Kirill Eremenko",
    rating: 4.5,
    reviews: 85000,
    price_inr: 499,
    duration_hours: 21,
    level: "beginner",
    topics: ["data science", "statistics", "data analysis", "sql", "tableau"],
  },
  {
    id: "td-data-science",
    title: "Data Science & Analytics Full Course",
    platform: "tutedude",
    url: "https://tutedude.com/course/data-science",
    instructor: "TuteDude Faculty",
    rating: 4.6,
    reviews: 8000,
    price_inr: 399,
    duration_hours: 40,
    level: "beginner",
    topics: ["data science", "python", "pandas", "numpy", "visualization", "statistics"],
  },

  // ── MACHINE LEARNING ────────────────────────────────────────────────────
  {
    id: "u-ml-az",
    title: "Machine Learning A-Z: AI, Python & R + ChatGPT",
    platform: "udemy",
    url: "https://www.udemy.com/course/machinelearning/",
    instructor: "Kirill Eremenko & Hadelin de Ponteves",
    rating: 4.5,
    reviews: 200000,
    price_inr: 499,
    duration_hours: 44,
    level: "intermediate",
    topics: ["machine learning", "python", "regression", "classification", "clustering", "deep learning"],
  },
  {
    id: "u-ml-andrew",
    title: "Machine Learning Specialization",
    platform: "udemy",
    url: "https://www.udemy.com/course/machine-learning/",
    instructor: "Andrew Ng",
    rating: 4.9,
    reviews: 180000,
    price_inr: 499,
    duration_hours: 35,
    level: "beginner",
    topics: ["machine learning", "supervised learning", "neural networks", "algorithms", "mathematics"],
  },
  {
    id: "td-ml",
    title: "Machine Learning with Python",
    platform: "tutedude",
    url: "https://tutedude.com/course/machine-learning",
    instructor: "TuteDude Faculty",
    rating: 4.5,
    reviews: 5000,
    price_inr: 399,
    duration_hours: 35,
    level: "intermediate",
    topics: ["machine learning", "python", "scikit-learn", "algorithms", "model evaluation"],
  },

  // ── DEEP LEARNING / AI ──────────────────────────────────────────────────
  {
    id: "u-dl-az",
    title: "Deep Learning A-Z 2024: Neural Networks, AI & ChatGPT",
    platform: "udemy",
    url: "https://www.udemy.com/course/deeplearning/",
    instructor: "Kirill Eremenko & Hadelin de Ponteves",
    rating: 4.5,
    reviews: 130000,
    price_inr: 499,
    duration_hours: 23,
    level: "intermediate",
    topics: ["deep learning", "neural networks", "tensorflow", "keras", "cnn", "rnn", "nlp"],
  },
  {
    id: "u-pytorch",
    title: "PyTorch for Deep Learning & Machine Learning",
    platform: "udemy",
    url: "https://www.udemy.com/course/pytorch-for-deep-learning/",
    instructor: "Daniel Bourke",
    rating: 4.7,
    reviews: 55000,
    price_inr: 499,
    duration_hours: 44,
    level: "intermediate",
    topics: ["pytorch", "deep learning", "neural networks", "computer vision", "nlp"],
  },
  {
    id: "td-dl",
    title: "Deep Learning & AI Fundamentals",
    platform: "tutedude",
    url: "https://tutedude.com/course/deep-learning",
    instructor: "TuteDude Faculty",
    rating: 4.4,
    reviews: 3500,
    price_inr: 399,
    duration_hours: 30,
    level: "intermediate",
    topics: ["deep learning", "tensorflow", "neural networks", "ai", "image recognition"],
  },

  // ── WEB DEVELOPMENT ─────────────────────────────────────────────────────
  {
    id: "u-web-2024",
    title: "The Complete 2024 Web Development Bootcamp",
    platform: "udemy",
    url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    instructor: "Dr. Angela Yu",
    rating: 4.7,
    reviews: 420000,
    price_inr: 499,
    duration_hours: 61,
    level: "beginner",
    topics: ["html", "css", "javascript", "react", "nodejs", "sql", "web development", "frontend", "backend"],
  },
  {
    id: "td-webdev",
    title: "Full Stack Web Development",
    platform: "tutedude",
    url: "https://tutedude.com/course/web-development",
    instructor: "TuteDude Faculty",
    rating: 4.5,
    reviews: 15000,
    price_inr: 299,
    duration_hours: 50,
    level: "beginner",
    topics: ["html", "css", "javascript", "react", "nodejs", "mongodb", "full stack", "web development"],
  },

  // ── JAVASCRIPT / REACT ──────────────────────────────────────────────────
  {
    id: "u-js-complete",
    title: "The Complete JavaScript Course 2024",
    platform: "udemy",
    url: "https://www.udemy.com/course/the-complete-javascript-course/",
    instructor: "Jonas Schmedtmann",
    rating: 4.7,
    reviews: 220000,
    price_inr: 499,
    duration_hours: 69,
    level: "beginner",
    topics: ["javascript", "es6", "dom", "oop", "async", "node", "frontend"],
  },
  {
    id: "u-react",
    title: "React - The Complete Guide 2024 (incl. Next.js)",
    platform: "udemy",
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.6,
    reviews: 210000,
    price_inr: 499,
    duration_hours: 68,
    level: "intermediate",
    topics: ["react", "nextjs", "hooks", "redux", "typescript", "frontend"],
  },
  {
    id: "td-react",
    title: "React JS Complete Course",
    platform: "tutedude",
    url: "https://tutedude.com/course/react-js",
    instructor: "TuteDude Faculty",
    rating: 4.5,
    reviews: 9000,
    price_inr: 299,
    duration_hours: 35,
    level: "intermediate",
    topics: ["react", "hooks", "redux", "context api", "frontend", "javascript"],
  },

  // ── SQL / DATABASES ─────────────────────────────────────────────────────
  {
    id: "u-sql",
    title: "The Complete SQL Bootcamp: Go from Zero to Hero",
    platform: "udemy",
    url: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
    instructor: "Jose Portilla",
    rating: 4.7,
    reviews: 140000,
    price_inr: 499,
    duration_hours: 9,
    level: "beginner",
    topics: ["sql", "database", "postgresql", "queries", "joins", "data analysis"],
  },
  {
    id: "td-sql",
    title: "SQL & Database Management",
    platform: "tutedude",
    url: "https://tutedude.com/course/sql-database",
    instructor: "TuteDude Faculty",
    rating: 4.4,
    reviews: 6000,
    price_inr: 299,
    duration_hours: 20,
    level: "beginner",
    topics: ["sql", "mysql", "database", "queries", "normalization"],
  },

  // ── STATISTICS / MATH ───────────────────────────────────────────────────
  {
    id: "u-stats",
    title: "Statistics & Mathematics for Data Science & ML",
    platform: "udemy",
    url: "https://www.udemy.com/course/statistics-for-data-science-data-analytics/",
    instructor: "Ryan Ahmed",
    rating: 4.5,
    reviews: 35000,
    price_inr: 499,
    duration_hours: 16,
    level: "beginner",
    topics: ["statistics", "probability", "mathematics", "linear algebra", "calculus", "data science"],
  },

  // ── CLOUD / DEVOPS ──────────────────────────────────────────────────────
  {
    id: "u-aws",
    title: "AWS Certified Solutions Architect – Associate 2024",
    platform: "udemy",
    url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
    instructor: "Stephane Maarek",
    rating: 4.7,
    reviews: 220000,
    price_inr: 499,
    duration_hours: 27,
    level: "intermediate",
    topics: ["aws", "cloud", "devops", "infrastructure", "deployment", "s3", "ec2"],
  },
  {
    id: "td-cloud",
    title: "Cloud Computing & DevOps Fundamentals",
    platform: "tutedude",
    url: "https://tutedude.com/course/cloud-devops",
    instructor: "TuteDude Faculty",
    rating: 4.4,
    reviews: 4000,
    price_inr: 349,
    duration_hours: 30,
    level: "beginner",
    topics: ["cloud", "aws", "devops", "docker", "kubernetes", "deployment"],
  },

  // ── EXCEL / ANALYTICS TOOLS ─────────────────────────────────────────────
  {
    id: "u-excel",
    title: "Microsoft Excel - Excel from Beginner to Advanced",
    platform: "udemy",
    url: "https://www.udemy.com/course/microsoft-excel-2013-from-beginner-to-advanced-and-beyond/",
    instructor: "Kyle Pew",
    rating: 4.6,
    reviews: 540000,
    price_inr: 499,
    duration_hours: 19,
    level: "beginner",
    topics: ["excel", "spreadsheet", "data analysis", "formulas", "pivot tables", "visualization"],
  },
];

function scoreMatch(course: Course, topics: string[]): number {
  const queryTopics = topics.map((t) => t.toLowerCase());
  let score = 0;
  for (const qt of queryTopics) {
    for (const ct of course.topics) {
      if (ct.includes(qt) || qt.includes(ct)) score += 1;
    }
  }
  return score;
}

export function matchCourses(topics: string[], level: string, limit = 3): Course[] {
  const levelMap: Record<string, number> = { beginner: 0, intermediate: 1, advanced: 2 };
  const userLevel = levelMap[level] ?? 0;

  return COURSES.filter((c) => {
    const courseLevel = levelMap[c.level] ?? 0;
    return courseLevel <= userLevel + 1;
  })
    .map((c) => ({ course: c, score: scoreMatch(c, topics) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.course.rating - a.course.rating)
    .slice(0, limit)
    .map((x) => x.course);
}
