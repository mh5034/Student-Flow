"use client";
import CourseCard from "@/components/CourseCard";
import { courses } from "../../data/courses";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses
    .filter((course) => {
      if (activeFilter === "all") return true;
      return activeFilter === course.category.toLowerCase();
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
              value="all"
              onClick={(e) => setActiveFilter(e.target.value)}
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            >
              ALL
            </button>
            <button
              value="frontend"
              onClick={(e) => setActiveFilter(e.target.value)}
              className={`filter-btn ${activeFilter === "frontend" ? "active" : ""}`}
            >
              FRONTEND
            </button>
            <button
              value="javascript"
              onClick={(e) => setActiveFilter(e.target.value)}
              className={`filter-btn ${activeFilter === "javascript" ? "active" : ""}`}
            >
              JAVASCRIPT
            </button>
            <button
              value="react"
              onClick={(e) => setActiveFilter(e.target.value)}
              className={`filter-btn ${activeFilter === "react" ? "active" : ""}`}
            >
              REACT
            </button>
            <button
              value="nextjs"
              onClick={(e) => setActiveFilter(e.target.value)}
              className={`filter-btn ${activeFilter === "nextjs" ? "active" : ""}`}
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
