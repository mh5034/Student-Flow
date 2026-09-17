export default function StatsCard({
  title,
  value,
  icon,
  colorVariant = "default",
  subtitle,
}) {
  // TODO: Build your StatsCard component here
  return (
    <div className={`stats-card variant-${colorVariant}`}>
      {/* TODO: Display icon, title, value, and subtitle */}
      <div className="stats-card-header">
        <span className="stats-title">{title}</span>
        <span className="stats-icon">{icon}</span>
      </div>
      <div className="stats-value">{value}</div>
      <div className="stats-subtitle">{subtitle}</div>
    </div>
  );
}
