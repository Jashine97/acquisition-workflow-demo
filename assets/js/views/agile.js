import { readBoard, writeBoard } from '../store.js';
function col(title,key,items){
  return `<div class="col-12 col-lg-4">
    <h6 class="mb-2">${title}</h6>
    <div class="drag-col" data-col="${key}" ondragover="event.preventDefault()">
      ${items.map(t=>`
        <div class="card p-3 mb-2 drag-card" draggable="true" data-id="${t.id}">
          <div class="fw-semibold">${t.title}</div>
          <div class="small-muted">${t.detail||''}</div>
        </div>`).join('')}
    </div>
  </div>`;
}
export function AgileView(){
  const state=readBoard();
  const el=document.createElement('div');
  el.innerHTML=`
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h5 mb-0"><i class="bi bi-kanban me-2"></i>Agile Board</h2>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-dark btn-sm" id="add">+ Add</button>
        <button class="btn btn-primary btn-sm" id="save">Save</button>
      </div>
    </div>
    <div class="row g-3">
      ${col('Backlog','backlog',state.backlog)}
      ${col('In-Progress','doing',state.doing)}
      ${col('Done','done',state.done)}
    </div>`;

  el.querySelectorAll('.drag-card').forEach(card=>{
    card.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain', card.dataset.id));
  });
  el.querySelectorAll('.drag-col').forEach(c => {
    c.addEventListener('drop', e=>{
      e.preventDefault();
      const id=e.dataTransfer.getData('text/plain');
      const moved=['backlog','doing','done'].flatMap(k=>state[k]).find(t=>t.id===id);
      if(!moved) return;
      ['backlog','doing','done'].forEach(k=>state[k]=state[k].filter(t=>t.id!==id));
      state[c.dataset.col].push(moved);
      location.hash = '#/agile';
    });
  });
  el.querySelector('#add').addEventListener('click', ()=>{
    const title=prompt('Task title?'); if(!title) return;
    const detail=prompt('Short detail (optional)')||'';
    state.backlog.push({id:'t'+Math.random().toString(36).slice(2,8), title, detail});
    location.hash = '#/agile';
  });
  el.querySelector('#save').addEventListener('click', ()=>{ writeBoard(state); alert('Saved'); });
  return el;
}
