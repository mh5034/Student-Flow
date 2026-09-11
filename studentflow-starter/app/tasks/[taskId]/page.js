export default async function TaskDetailPage({ params }) {
  const { taskId } = await params;

  return (
    <div className="container">
      <h1 className="page-title">Task Detail: {taskId}</h1>
      {/* TODO: Connect to TaskContext, display task info, toggle status, and delete */}
    </div>
  );
}
