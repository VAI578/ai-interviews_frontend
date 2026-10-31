import { useState } from 'react'

export default function ResumeAnalyzer() {
  const [fileName, setFileName] = useState('')

  return (
    <>
      <div className="page-heading"><div><h1>Resume analyzer</h1><p>Check analyzer availability before uploading a document.</p></div></div>
      <section className="card form-card">
        <div className="alert info">Resume analysis is not available yet. The current backend does not include a resume analyzer endpoint, so no file is uploaded or analyzed here.</div>
        <div className="file-drop">
          <div className="stat-icon" style={{ margin: '0 auto 12px' }}>▤</div>
          <strong style={{ fontSize: 13 }}>Resume analysis coming soon</strong>
          <p className="field-hint" style={{ marginTop: 7 }}>We will let you know when this feature is ready.</p>
          <input type="file" accept=".pdf,.doc,.docx" aria-label="Choose a resume file" onChange={(event) => setFileName(event.target.files?.[0]?.name || '')} />
          {fileName && <p className="field-hint" style={{ marginTop: 8 }}>{fileName} selected locally; it has not been uploaded.</p>}
        </div>
      </section>
    </>
  )
}
