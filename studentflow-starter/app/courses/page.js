"use client";
import CourseCard from "@/components/CourseCard";
import { courses } from "../../data/courses";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses
    .filter((course) => {
      if (activeFilter === "ALL") return true;
      return activeFilter.toLowerCase() === course.category.toLowerCase();
    })
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Course Catalog</h1>
          <p className="page-subtitle">
            Explore modules designed to take you from web fundamentals to modern
            React &amp; Next.js.
          </p>
        </div>
      </div>
      {/* TODO: Implement Course list, SearchBar, and Category Filters */}
      <div className="filters-container">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search courses, instructors, topics..."
        />
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <div className="filter-buttons">
            <button
              onClick={() => setActiveFilter("ALL")}
              className={`filter-btn ${activeFilter === "ALL" ? "active" : ""}`}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveFilter("FRONTEND")}
              className={`filter-btn ${activeFilter === "FRONTEND" ? "active" : ""}`}
            >
              FRONTEND
            </button>
            <button
              onClick={() => setActiveFilter("JAVASCRIPT")}
              className={`filter-btn ${activeFilter === "JAVASCRIPT" ? "active" : ""}`}
            >
              JAVASCRIPT
            </button>
            <button
              onClick={() => setActiveFilter("REACT")}
              className={`filter-btn ${activeFilter === "REACT" ? "active" : ""}`}
            >
              REACT
            </button>
            <button
              onClick={() => setActiveFilter("NEXTJS")}
              className={`filter-btn ${activeFilter === "NEXTJS" ? "active" : ""}`}
            >
              NEXTJS
            </button>
          </div>
        </div>
      </div>
      <div className="cards-grid">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
