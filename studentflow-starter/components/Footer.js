import Link from "next/link";

export default function Footer() {
  // TODO: Build your Footer component here
  return (
    <footer className="footer-wrapper">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="logo-brand">
            <div className="logo-icon sm">⚡</div>
            <span className="logo-text">StudentFlow</span>
          </div>
          <p className="footer-desc">
            The all-in-one learning workspace and task tracker for modern
            frontend development students.
          </p>
        </div>
        <div className="footer-links-group">
          <h4>Navigation</h4>
          <ul>
            <li>
              <Link href="/">Dashboard</Link>
            </li>
            <li>
              <Link href="/courses">All Courses</Link>
            </li>
            <li>
              <Link href="/tasks">Task Manager</Link>
            </li>
            <li>
              <Link href="/resources">Learning Resources</Link>
            </li>
          </ul>
        </div>
        <div className="footer-links-group">
          <h4>Capstone Project</h4>
          <ul>
            <li>
              <span>Next.js 15+ App Router</span>
            </li>
            <li>
              <span>React 19 & Context API</span>
            </li>
            <li>
              <span>Vanilla CSS System</span>
            </li>
            <li>
              <span>LocalStorage Sync</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} StudentFlow. Frontend Web Development
          Final Project.
        </p>
      </div>
    </footer>
  );
}
