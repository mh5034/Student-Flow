"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TaskContext";
import { generateId } from "@/lib/helpers";

export default function TaskForm({ courses = [] }) {
  // TODO: Build your controlled TaskForm component here
  // 1. Create state for title, description, courseId, dueDate, priority, error
  // 2. Validate inputs on submit
  // 3. Call addTask() and redirect to '/tasks'
  const { addTask } = useTasks();
  const router = useRouter();
  const [enteredValues, setEnteredValues] = useState({
    title: "",
    description: "",
    courseId: courses[0].id,
    dueDate: "",
    priority: "medium",
    error: "",
  });

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!enteredValues.title.trim()) {
      setEnteredValues((prev) => ({
        ...prev,
        error: "⚠️ Please enter a task title.",
      }));
      return;
    }

    if (!enteredValues.dueDate.trim()) {
      setEnteredValues((prev) => ({
        ...prev,
        error: "⚠️ Please choose a due date.",
      }));
      return;
    }

    setEnteredValues((prev) => ({
      ...prev,
      error: "",
    }));

    const task = {
      id: generateId(),
      title: enteredValues.title,
      description: enteredValues.description,
      courseId: enteredValues.courseId,
      dueDate: enteredValues.dueDate,
      priority: enteredValues.priority,
      status: "pending",
    };

    addTask(task);

    router.push("/tasks");
  };

  return (
    <form className="task-form card" onSubmit={handleSubmit}>
      {/* TODO: Add title input, description textarea, course select, dueDate input, priority select, and submit button */}
      {enteredValues.error != "" && (
        <div className="form-error-banner">{enteredValues.error}</div>
      )}
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Task Title *
        </label>
        <input
          id="title"
          placeholder="e.g. Build responsive navbar"
          className="form-input"
          type="text"
          autoFocus
          onChange={(e) => handleInputChange("title", e.target.value)}
          value={enteredValues.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description (optional)
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Add any instructions, links, or notes..."
          className="form-textarea"
          onChange={(e) => handleInputChange("description", e.target.value)}
          value={enteredValues.description}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="courseId" className="form-label">
          Course
        </label>
        <select
          id="courseId"
          className="form-select"
          onChange={(e) => handleInputChange("courseId", e.target.value)}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">
            Due Date *
          </label>
          <input
            id="dueDate"
            type="date"
            className="form-input"
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
            value={enteredValues.dueDate}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="priority">
            Priority Level
          </label>
          <select
            id="priority"
            defaultValue="medium"
            className="form-select"
            onChange={(e) => handleInputChange("priority", e.target.value)}
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button
          onClick={() => router.push("/tasks")}
          type="button"
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Task
        </button>
      </div>
    </form>
  );
}
