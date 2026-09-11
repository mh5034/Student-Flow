import CourseCard from "@/components/CourseCard";
import { courses } from "../../data/courses";

export default function CoursesPage() {
  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Course Catalog</h1>
          <p className="page-subtitle">Explore modules designed to take you from web fundamentals to modern React &amp; Next.js.</p>
        </div>
      </div>
      {/* TODO: Implement Course list, SearchBar, and Category Filters */}
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
