import Link from "next/link";
import { courses } from "@/data/courses";
import NotFound from "@/app/courses/[courseId]/not-found";
import CourseTasksSection from "./CourseTasksSection";

export async function generateStaticParams() {
  return courses.map((course) => ({
    courseId: course.id,
  }));
}
export default async function CourseDetailPage({ params }) {
  const { courseId } = await params;

  const course = courses.find((course) => courseId === course.id);

  if (!course) return NotFound();

  return (
    <div className="container">
      {/* TODO: Fetch course details, topics, and course-specific tasks with progress bar */}
      <div className="page-back-btn">
        <Link className="btn btn-ghost btn-sm" href="/courses">
          ← Back to Course Catalog
        </Link>
      </div>
      <div className="hero-banner">
        <div className="hero-header-row">
          <span className="hero-header-icon">{course.icon}</span>
          <span className="badge badge-category-glass">{course.category}</span>
        </div>
        <h1 className="hero-title">{course.title}</h1>
        <p className="hero-subtitle">{course.description}</p>
        <div className="hero-meta-row">
          <div>
            <div className="hero-meta-label">Instructor</div>
            <div className="hero-meta-value">{course.instructor}</div>
          </div>
          <div>
            <div className="hero-meta-label">Duration</div>
            <div className="hero-meta-value">{course.duration}</div>
          </div>
          <div>
            <div className="hero-meta-label">Level</div>
            <div className="hero-meta-value">{course.level}</div>
          </div>
        </div>
      </div>
      <div className="course-detail-layout">
        <div className="card">
          <h3 className="topics-title">📖 Key Syllabus Topics</h3>
          <ul className="topics-list">
            {course.topics.map((topic, index) => (
              <li key={index} className="topics-item">
                <span className="topics-number">{index + 1}.</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        <CourseTasksSection courseId={courseId} courses={courses} />
      </div>
    </div>
  );
}
