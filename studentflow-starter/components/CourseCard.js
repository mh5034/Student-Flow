import Link from "next/link";

export default function CourseCard({ course }) {
  // TODO: Build your CourseCard component here
  return (
    <div className="course-card">
      {/* TODO: Display course icon, category, title, description, instructor, and link to /courses/[courseId] */}
      <div className="course-card">
        <div className="course-card-header">
          <span className="course-icon">{course.icon}</span>
          <span className="badge badge-category">{course.category}</span>
        </div>
        <h3>{course.title}</h3>
        <p className="course-card-desc">{course.description}</p>
        <div className="course-card-meta">
          <div className="meta-item">
            <span className="meta-icon">👤</span>
            <span>{course.instructor}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">⏱️</span>
            <span>{course.duration}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📊</span>
            <span>{course.level}</span>
          </div>
        </div>

        <div className="course-card-footer">
          <Link className="btn btn-outline btn-full" href={`/courses/${course.id}`}>View Course & Tasks →</Link>
        </div>
      </div>
    </div>
  );
}
