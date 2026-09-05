function KPICard({
  label,
  value,
  description
}) {
  return (
    <article className="kpi-card">
      <span className="kpi-label">
        {label}
      </span>

      <strong className="kpi-value">
        {value}
      </strong>

      <small className="kpi-description">
        {description}
      </small>
    </article>
  );
}

export default KPICard;