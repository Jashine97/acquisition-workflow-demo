export function HomeView(){
  const el=document.createElement('div');
  el.innerHTML = `
  <section class="hero mb-4">
    <div class="row g-4 align-items-center">
      <div class="col-12 col-lg-7">
        <h1 class="h3 mb-2">Business Analyst Portfolio — London Property Acquisition</h1>
        <p class="small-muted mb-3">By <strong>Josue Nganmoue</strong>. Demonstrates <span class="badge badge-soft">SDLC</span> <span class="badge badge-soft">Agile</span> <span class="badge badge-soft">BPMN</span> and a configurable <span class="badge badge-soft">SDLT</span> calculator.</p>
        <div class="d-flex flex-wrap gap-2">
          <a class="btn btn-primary btn-sm" href="#/bpmn"><i class="bi bi-diagram-3 me-1"></i>Acquisition BPMN</a>
          <a class="btn btn-outline-dark btn-sm" href="#/sdlt"><i class="bi bi-cash-coin me-1"></i>SDLT & CIL</a>
          <a class="btn btn-outline-dark btn-sm" href="#/agile"><i class="bi bi-kanban me-1"></i>Agile board</a>
        </div>
      </div>
      <div class="col-12 col-lg-5">
        <div class="kpi mb-2"><i class="bi bi-speedometer2"></i><div><div class="small-muted">Avg cycle time</div><div class="fw-semibold">6.8 days</div></div></div>
        <div class="kpi"><i class="bi bi-graph-up"></i><div><div class="small-muted">Throughput (6 sprints)</div><div class="fw-semibold">+18%</div></div></div>
      </div>
    </div>
  </section>
  <div class="row g-3">
    <div class="col-12 col-lg-4"><div class="card p-3 h-100">
      <div class="fw-semibold mb-1">BPMN Workflow</div>
      <div class="small-muted">Editable process from sourcing → DD → IC → Exchange; SDLT branch (res/additional/non-res) and London CIL checkpoint.</div>
      <a class="mt-2 small" href="#/bpmn">Open BPMN &rarr;</a>
    </div></div>
    <div class="col-12 col-lg-4"><div class="card p-3 h-100">
      <div class="fw-semibold mb-1">SDLT + CIL</div>
      <div class="small-muted">Band calculator with editable rates, borough presets, Mayoral CIL, and affordable-GIA deduction.</div>
      <a class="mt-2 small" href="#/sdlt">Open SDLT &rarr;</a>
    </div></div>
    <div class="col-12 col-lg-4"><div class="card p-3 h-100">
      <div class="fw-semibold mb-1">Agile Delivery</div>
      <div class="small-muted">Kanban with local persistence for discovery, DD and approvals tasks.</div>
      <a class="mt-2 small" href="#/agile">Open Agile &rarr;</a>
    </div></div>
  </div>`;
  return el;
}
