"use client";
import Link from "next/link";
import { courses } from "@/data/courses";
import { initialTasks } from "@/data/initialTasks";
import { formatDate, isOverdue } from "@/lib/helpers";
import { useState, use, useEffect } from "react";

export default function CourseDetailPage({ params }) {
  const { courseId } = use(params);

  const course = courses.find((course) => courseId === course.id);
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const completedTasks = tasks.filter((task) => task.status === "completed");
  const completedPercentage =
    tasks.length > 0
      ? ((completedTasks.length / tasks.length) * 100).toFixed(0)
      : 0;

  useEffect(() => {
    const storageKey = `course_tasks_${courseId}`;
    const savedTasks = localStorage.getItem(storageKey);

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      const courseSpecificTasks = initialTasks.filter(
        (task) => task.courseId === courseId,
      );
      setTasks(courseSpecificTasks);
      localStorage.setItem(
        `course_tasks_${courseId}`,
        JSON.stringify(courseSpecificTasks),
      );
    }
    setIsLoaded(true);
  }, [courseId]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(`course_tasks_${courseId}`, JSON.stringify(tasks));
  }, [tasks, courseId, isLoaded]);

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === "completed" ? "pending" : "completed",
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id != taskId);

    setTasks(updatedTasks);
  };

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
        <div className="card">
          <div className="course-tasks-header">
            <h3 className="course-tasks-title">
              📝 Course Tasks & Assignments ({completedTasks.length}/
              {tasks.length})
            </h3>
            <span className="course-tasks-percent">
              {completedPercentage}% Complete
            </span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>
          {tasks.length > 0 ? (
            <>
              <div className="course-tasks-content">
                <div>
                  {/* Task Card */}
                  {tasks.map((task) => (
                    <div key={task.id} className="task-card">
                      <div className="task-card-main">
                        <button
                          type="button"
                          className={`checkbox-custom ${task.status === "completed" ? "checked" : ""}`}
                          aria-label="Mark task as incomplete"
                          onClick={() => toggleTaskStatus(task.id)}
                        >
                          ✓
                        </button>
                        <div className="task-content">
                          <div className="task-header-row">
                            <Link
                              className="task-title-link"
                              href={`/tasks/${task.id}`}
                            >
                              <h4
                                className={`task-title ${task.status === "completed" ? "line-through" : ""}`}
                              >
                                {task.title}
                              </h4>
                            </Link>
                          </div>
                          <p className="task-desc">{task.description}</p>
                          <div className="task-tags-row">
                            <span className={`badge priority-${task.priority}`}>
                              {task.priority}
                            </span>
                            <span className="badge badge-course">
                              {course.title}
                            </span>
                            <span
                              className={`task-due-date ${isOverdue(task) ? "text-danger" : ""}`}
                            >
                              📅 {formatDate(task.dueDate)}
                              {task.status === "pending" && isOverdue(task)
                                ? " (Overdue)"
                                : ""}
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
                        <Link
                          className="btn btn-ghost btn-sm"
                          href={`/tasks/${task.id}`}
                        >
                          Details
                        </Link>
                        <button
                          className="btn btn-danger-ghost btn-sm"
                          aria-label="Delete task"
                          onClick={() => deleteTask(task.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="course-tasks-action-bottom">
                <Link className="btn btn-primary btn-sm" href="/tasks/new">
                  + Add Another Task
                </Link>
              </div>
            </>
          ) : (
            <div className="course-tasks-content">
              <div className="empty-state empty-state-sm">
                <div className="empty-icon">📝</div>
                <h4>No tasks assigned to this course yet.</h4>
                <p className="text-muted search-margin">
                  Add a new task to track your assignments for this module.
                </p>
                <Link className="btn btn-primary btn-sm" href="/tasks/new">
                  + Add Task for this Course
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
