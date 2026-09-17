"use client";
import StatsCard from "@/components/StatsCard";
import Link from "next/link";
import { useTasks } from "@/context/TaskContext";
import TaskCard from "@/components/TaskCard";
import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import { getUpcomingTasks, isOverdue } from "@/lib/helpers";

export default function HomePage() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  const upcomingTasks = getUpcomingTasks(tasks);
  const completedTasks = tasks.filter((task) => {
    return task.status === "completed";
  });
  const overdueTasks = tasks.filter((task) => {
    return isOverdue(task);
  });

  const pendingTasks = tasks.length - completedTasks.length;

  const completionRate = ((completedTasks.length / tasks.length) * 100).toFixed(
    0,
  );

  const statsCard = [
    {
      title: "Total tasks",
      icon: "📝",
      value: tasks.length,
      subtitle: "All assigned tasks",
      colorVariant: "primary",
    },
    {
      title: "Completed",
      icon: "✅",
      value: completedTasks.length,
      subtitle: `${completionRate}% completion rate`,
      colorVariant: "success",
    },
    {
      title: "Pending",
      icon: "⏳",
      value: pendingTasks,
      subtitle: "Tasks in progress",
      colorVariant: "warning",
    },
    {
      title: "Overdue",
      icon: "⚠️",
      value: overdueTasks.length,
      subtitle: "Needs attention",
      colorVariant: "danger",
    },
  ];
  return (
    <div className="container">
      <section className="hero-banner">
        <h1 className="hero-title">Welcome back to StudentFlow 🚀</h1>
        <p className="hero-subtitle">
          Track your course progression, organize your assignments, and discover
          curated frontend learning resources all in one place.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/tasks/new">
            + Create New Task
          </Link>
          <Link className="btn btn-secondary" href="/courses">
            Explore Courses
          </Link>
        </div>
      </section>
      <section className="dashboard-stats-section">
        <div className="stats-grid">
          {statsCard.map((statCard) => (
            <StatsCard
              key={statCard.title}
              title={statCard.title}
              icon={statCard.icon}
              value={statCard.value}
              subtitle={statCard.subtitle}
              colorVariant={statCard.colorVariant}
            />
          ))}
        </div>
        <div className="dashboard-upcoming-section">
          <div className="page-header dashboard-upcoming-header">
            <div>
              <h3 className="dashboard-upcoming-title">
                ⏰ Upcoming Deadlines (Next 7 Days)
              </h3>
              <p className="dashboard-upcoming-subtitle">
                Stay on top of your upcoming course milestones.
              </p>
            </div>
            <Link className="btn btn-outline btn-sm" href="/tasks">
              View All Tasks →
            </Link>
          </div>
          {upcomingTasks.length > 0 ? (
            <div className="tasks-list">
              {upcomingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  courses={courses}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🎉</div>
              <h4>No tasks due in the next 7 days!</h4>
              <p className="text-muted">
                You are all caught up or have no pending deadlines this week.
              </p>
            </div>
          )}
          <div className="tasks-list">
            {upcomingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                courses={courses}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="dashboard-courses-sections">
        <div className="page-header">
          <div>
            <h2 className="page-title">Enrolled Courses</h2>
            <p className="page-subtitle">
              Your core curriculum in the frontend development program.
            </p>
          </div>
          <Link className="btn btn-outline btn-sm" href="/courses">
            Browse All ({courses.length}) →
          </Link>
        </div>
        <div className="cards-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
