"use client";
import { useTasks } from "@/context/TaskContext";
import { formatDate, getPriorityClass, isOverdue } from "@/lib/helpers";
import Link from "next/link";
import { use } from "react";
import { courses } from "@/data/courses";
import NotFound from "./not-found";
import { useRouter } from "next/navigation";

export default function TaskDetailPage({ params }) {
  const { taskId } = use(params);
  const { tasks, toggleTask, deleteTask } = useTasks();
  const task = tasks.find((task) => task.id === taskId);
  const router = useRouter();

  if (!task) return NotFound();

  const course = courses.find((course) => course.id === task.courseId);

  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
      deleteTask(taskId);
      router.push("/tasks");
    }
  };

  return (
    <div className="container task-detail-container">
      {/* TODO: Connect to TaskContext, display task info, toggle status, and delete */}
      <div className="page-back-btn">
        <Link className="btn btn-ghost btn-sm" href="/tasks">
          ← Back to Tasks
        </Link>
      </div>
      <div className="card task-detail-card">
        <div className="task-detail-header-row">
          <div className="task-detail-badges">
            <span className={`badge ${getPriorityClass(task.priority)}`}>
              {task.priority} Priority
            </span>
            <span
              className={`badge badge-status ${task.status === "completed" ? "badge-done" : "badge-pending"} `}
            >
              {task.status}
            </span>
            {isOverdue(task) && (
              <span className="badge priority-high">Overdue</span>
            )}
          </div>
          <span className="task-detail-id">ID: {taskId}</span>
        </div>
        <h1 className="task-detail-title">{task.title}</h1>
        <div className="task-meta-grid">
          <div>
            <span className="task-meta-label">Course</span>
            <Link
              className="task-meta-course-link"
              href={`/courses/${task.courseId}`}
            >
              {course.title} →
            </Link>
          </div>

          <div>
            <span className="task-meta-label">Due Date</span>
            <span
              className={`task-meta-value ${isOverdue(task) && "text-danger"}`}
            >
              📅 {formatDate(task.dueDate)}
            </span>
          </div>
          <div>
            <span className="task-meta-label">Status</span>
            <span className="task-meta-value">
              {task.status === "pending" ? "⏳ In Progress" : "✅ Completed"}
            </span>
          </div>
        </div>
        <div className="task-detail-body">
          <h3 className="task-section-title">Task Details & Instructions</h3>
          <p className="task-detail-text">{task.description}</p>
        </div>
        <div className="task-detail-actions">
          <button
            onClick={() => toggleTask(taskId)}
            type="button"
            className={`btn ${task.status === "completed" ? "btn-secondary" : "btn-primary"}  `}
          >
            {task.status === "completed"
              ? "↺ Mark as Incomplete"
              : "✓ Mark as Completed"}
          </button>
          <div>
            <button
              onClick={handleDelete}
              type="button"
              className="btn btn-danger-ghost"
            >
              🗑️ Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
