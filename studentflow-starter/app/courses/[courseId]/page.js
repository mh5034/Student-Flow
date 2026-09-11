export default async function CourseDetailPage({ params }) {
  const { courseId } = await params;

  return (
    <div className="container">
      <h1 className="page-title">Course Detail: {courseId}</h1>
      {/* TODO: Fetch course details, topics, and course-specific tasks with progress bar */}
    </div>
  );
}
