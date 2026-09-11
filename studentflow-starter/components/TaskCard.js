"use client";

import Link from "next/link";
import { formatDate, getPriorityClass, isOverdue } from "@/lib/helpers";

export default function TaskCard({ task, courses = [], onToggle, onDelete }) {
  // TODO: Build your TaskCard component here
  return (
    <div className="task-card">
      {/* TODO: Add completion checkbox, title link, tags, priority badge, and delete button */}
    </div>
  );
}
