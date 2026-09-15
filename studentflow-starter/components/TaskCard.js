"use client";

import Link from "next/link";
import { formatDate, getPriorityClass, isOverdue } from "@/lib/helpers";

export default function TaskCard({ task, courses, onToggle, onDelete }) {
  // TODO: Build your TaskCard component here
  const course = courses.find((course) => course.id === task.courseId);
  return (
    <div key={task.id} className="task-card">
      {/* TODO: Add completion checkbox, title link, tags, priority badge, and delete button */}
      <div className="task-card-main">
        <button
          type="button"
          className={`checkbox-custom ${task.status === "completed" ? "checked" : ""}`}
          aria-label="Mark task as incomplete"
          onClick={() => onToggle(task.id)}
        >
          ✓
        </button>
        <div className="task-content">
          <div className="task-header-row">
            <Link className="task-title-link" href={`/tasks/${task.id}`}>
              <h4
                className={`task-title ${task.status === "completed" ? "line-through" : ""}`}
              >
                {task.title}
              </h4>
            </Link>
          </div>
          <p className="task-desc">{task.description}</p>
          <div className="task-tags-row">
            <span className={`badge ${getPriorityClass(task.priority)}`}>
              {task.priority}
            </span>
            <span className="badge badge-course">{course.title}</span>
            <span
              className={`task-due-date ${isOverdue(task) ? "text-danger" : ""}`}
            >
              📅 {formatDate(task.dueDate)}
              {task.status === "pending" && isOverdue(task) ? " (Overdue)" : ""}
            </span>
            <span
              className={`badge badge-status ${task.status === "completed" ? "badge-done" : "badge-pending"}`}
            >
              {task.status}
            </span>
          </div>
        </div>
      </div>
      <div className="task-card-actions">
        <Link className="btn btn-ghost btn-sm" href={`/tasks/${task.id}`}>
          Details
        </Link>
        <button
          className="btn btn-danger-ghost btn-sm"
          aria-label="Delete task"
          onClick={() => onDelete(task.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
