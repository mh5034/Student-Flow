"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchArticles() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/resources");
      if (!response.ok) throw new Error("Failed to load articles");
      const data = await response.json();
      setResources(data.resources || []);
      console.log(resources);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return Loading();
  if (error)
    return (
      <div className="container status-screen">
        <div className="status-icon">⚠️</div>
        <h2 className="status-title">Failed to load resources</h2>
        <p className="status-desc">
          {error || "An unexpected error occurred while loading this page."}
        </p>
        <div className="status-actions">
          <button
            type="button"
            onClick={fetchArticles}
            className="btn btn-primary"
          >
            Try Again
          </button>
          <Link href="/" className="btn btn-secondary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Learning Resources & Articles</h1>
          <p className="page-subtitle">
            Curated web development articles fetched from our internal API
            route.
          </p>
        </div>
      </div>
      {/* TODO: Fetch resources from /api/resources using useEffect, handle loading/error/success states */}
      <div className="cards-grid">
        {resources.map((article) => (
          <div key={article.id} className="card resource-card">
            <div className="resource-card-header">
              <span className="badge badge-category">{article.tag}</span>
              <span className="text-muted">⏱️ {article.readingTime}</span>
            </div>
            <h3 className="resource-card-title">{article.title}</h3>
            <p className="resource-card-desc">{article.description}</p>
            <div className="resource-card-footer">
              <span className="resource-author">By {article.author}</span>
              <Link className="btn btn-primary btn-sm" href={article.url}>
                Read Article ↗
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
