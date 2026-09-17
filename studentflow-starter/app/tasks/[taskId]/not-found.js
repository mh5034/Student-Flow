import Link from "next/link";
import React from "react";

export default function TaskNotFound() {
  return (
    <div className="container status-screen">
      <div className="status-icon">🔍</div>
      <h2 className="status-title">Task Not Found</h2>
      <p className="status-desc">
        This task may have been deleted or does not exist.
      </p>
      <Link className="btn btn-primary" href="/tasks">
        ← Back to Tasks
      </Link>
    </div>
  );
}
