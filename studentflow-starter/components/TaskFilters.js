"use client";

export default function TaskFilters({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  courseFilter,
  setCourseFilter,
  courses = [],
  onReset,
}) {
  // TODO: Build your Status, Priority, and Course filter UI here
  return (
    <div className="filters-container">
      {/* TODO: Add filter buttons & select dropdowns */}
      <div className="filter-group">
        <label className="filter-label">Status</label>
        <div className="filter-buttons">
          <button
            value="all"
            className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
            onClick={(e) => setStatusFilter(e.target.value)}
            type="button"
          >
            All
          </button>
          <button
            value="pending"
            className={`filter-btn ${statusFilter === "pending" ? "active" : ""}`}
            onClick={(e) => setStatusFilter(e.target.value)}
            type="button"
          >
            Pending
          </button>
          <button
            value="completed"
            className={`filter-btn ${statusFilter === "completed" ? "active" : ""}`}
            onClick={(e) => setStatusFilter(e.target.value)}
            type="button"
          >
            Completed
          </button>
        </div>
      </div>
      <div className="filter-group">
        <label className="filter-label">Priority</label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priorities</option>
          <option value="medium">Medium Priorities</option>
          <option value="low">Low Priorities</option>
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">Course</label>
        <select
          value={courseFilter}
          onChange={(e) => {
            setCourseFilter(e.target.value);
          }}
          className="filter-select"
        >
          <option value="all">All Courses</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      {(statusFilter !== "all" ||
        priorityFilter !== "all" ||
        courseFilter !== "all") && (
        <div className="filter-group filter-reset-group">
          <label className="filter-label">&nbsp;</label>
          <button
            onClick={onReset}
            type="button"
            className="btn btn-ghost btn-sm"
          >
            Reset Filters ✕
          </button>
        </div>
      )}
    </div>
  );
}
