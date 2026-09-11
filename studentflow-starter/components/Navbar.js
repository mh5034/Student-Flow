"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // TODO: Build your Navbar component here
  const path = usePathname();
  return (
    <header className="navbar-wrapper">
      <div className="container navbar-inner">
        <Link href="/" className="logo-brand">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">
            Student<span className="logo-accent">Flow</span>
          </span>
        </Link>
        {/* TODO: Add navigation links for '/', '/courses', '/tasks', '/resources' and a link button for '/tasks/new' */}
        <nav className="desktop-nav">
          <Link className={`nav-link ${path === "/" ? "active" : ""}`} href="/">
            Dashboard
          </Link>
          <Link
            className={`nav-link ${path === "/courses" ? "active" : ""}`}
            href="/courses"
          >
            Courses
          </Link>
          <Link
            className={`nav-link ${path === "/tasks" ? "active" : ""}`}
            href="/tasks"
          >
            Tasks
          </Link>
          <Link
            className={`nav-link ${path === "/resources" ? "active" : ""}`}
            href="/resources"
          >
            Resources
          </Link>
        </nav>
        <div className="nav-actions">
          <button className="btn btn-primary btn-sm">+ New Task</button>
        </div>
      </div>
    </header>
  );
}
