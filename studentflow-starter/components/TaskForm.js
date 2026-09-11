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

  return (
    <form className="task-form card">
      {/* TODO: Add title input, description textarea, course select, dueDate input, priority select, and submit button */}
    </form>
  );
}
