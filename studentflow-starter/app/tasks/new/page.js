import TaskForm from "@/components/TaskForm";
import { courses } from "@/data/courses";
import Link from "next/link";

export default function NewTaskPage() {
  return (
    <div className="container">
      {/* TODO: Render TaskForm component here */}
      <div className="page-back-btn">
        <Link className="btn btn-ghost btn-sm" href="/tasks">
          ← Back to Tasks
        </Link>
      </div>
      <div className="page-title-center">
        <h1 className="page-title">Add New Assignment</h1>
        <p className="page-subtitle">
          Fill in the details below to add a new task to your tracker.
        </p>
      </div>
      <TaskForm courses={courses}/>
    </div>
  );
}
