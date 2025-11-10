export function DocsView(){
  const el=document.createElement('div');
  el.innerHTML=`
  <h2 class="h5 mb-3"><i class="bi bi-journal-text me-2"></i>Docs & Decision Flows</h2>
  <div class="card p-4 mb-3">
    <h3 class="h6">Acquisition Journey</h3>
    <div class="mermaid">
    journey
      title Acquisition Journey
      section Sourcing
        Identify opportunity: 3: Analyst
        Land comps & planning review: 3: Analyst
      section Evaluation
        GDV & costs model: 3: Analyst
        SDLT / CIL / S106 checks: 2: BA
        Risk & sensitivities: 2: BA
      section Governance
        IC pack & sign-off: 2: BA
        Heads of Terms & solicitor instruction: 3: Team
      section Completion
        Exchange & completion: 2: Legal
        Handover to PM: 2: Team
    </div>
  </div>
  <div class="card p-4">
    <h3 class="h6">SDLT Decision (illustrative)</h3>
    <div class="mermaid">
    flowchart TD
      A[Property acquisition] --> B{Residential?}
      B -->|Yes| C{Main home?}
      C -->|Yes| D[Use Residential bands]
      C -->|No| E[Use Additional bands]
      B -->|No| F[Use Non-res/Mixed bands]
      D --> G[Check reliefs]
      E --> G
      F --> G
      G --> H[Compute SDLT]
    </div>
  </div>`;
  return el;
}
