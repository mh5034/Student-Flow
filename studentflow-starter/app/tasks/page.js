"use client";
import SearchBar from "@/components/SearchBar";
import TaskCard from "@/components/TaskCard";
import TaskFilters from "@/components/TaskFilters";
import Link from "next/link";
import { useState } from "react";
import { useTasks } from "@/context/TaskContext";
import { courses } from "@/data/courses";

export default function TasksPage() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const completedTasks = tasks.filter((task) => task.status === "completed");

  const filteredTasks = tasks
    .filter((task) => {
      if (statusFilter === "all") return true;
      return statusFilter === task.status.toLowerCase();
    })
    .filter((task) => {
      if (priorityFilter === "all") return true;
      return priorityFilter === task.priority.toLowerCase();
    })
    .filter((task) => {
      if (courseFilter === "all") return true;
      return courseFilter === task.courseId.toLowerCase();
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const onReset = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setCourseFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Task Manager</h1>
          <p className="page-subtitle">
            Manage, filter, and track all your course assignments (
            {completedTasks.length} of {tasks.length} completed).
          </p>
        </div>
        <div className="page-header-actions">
          <Link className="btn btn-primary btn-sm" href="/tasks/new">
            + Add New Task
          </Link>
        </div>
      </div>
      {/* TODO: Connect to TaskContext, SearchBar, TaskFilters, and TaskCard list */}
      <div className="search-margin">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search tasks by keyword or description..."
        />
      </div>
      <TaskFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        courseFilter={courseFilter}
        setCourseFilter={setCourseFilter}
        onReset={onReset}
        courses={courses}
      />
      <div className="list-margin">
        {filteredTasks.length > 0 ? (
          <div>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                courses={courses}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No tasks match your criteria</h3>
            <p className="text-muted search-margin">
              Try adjusting your filter settings or create a new task.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setPriorityFilter("all");
                setCourseFilter("all");
              }}
              href="/tasks/new"
              className="btn btn-secondary btn-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
