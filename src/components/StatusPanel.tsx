type StatusPanelProps = {
  title: string
  copy: string
}

export const StatusPanel = ({ title, copy }: StatusPanelProps) => (
  <section className="status-panel content-card">
    <p className="section-label">Status</p>
    <h2>{title}</h2>
    <p className="copy-block">{copy}</p>
  </section>
)
