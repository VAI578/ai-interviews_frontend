export default function StatCard({ label, value, note, icon }) {
  return (
    <section className="card stat-card">
      <div className="stat-top"><span className="stat-label">{label}</span><span className="stat-icon" aria-hidden="true">{icon}</span></div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </section>
  )
}
