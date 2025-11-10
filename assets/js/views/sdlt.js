function gbp(n){return new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(n||0);}
const DEFAULT={
  residential:[{upTo:250000,rate:0},{upTo:925000,rate:.05},{upTo:1500000,rate:.10},{upTo:Infinity,rate:.12}],
  additional:[{upTo:250000,rate:.03},{upTo:925000,rate:.08},{upTo:1500000,rate:.13},{upTo:Infinity,rate:.15}],
  nonresidential:[{upTo:150000,rate:0},{upTo:250000,rate:.02},{upTo:Infinity,rate:.05}],
};
function calcBands(price,bands){let tax=0,last=0;for(const b of bands){const cap=Math.min(b.upTo,price);if(cap>last){tax+= (cap-last)*b.rate; last=cap;}}return Math.max(0,Math.round(tax));}

export function SdltView(){
  const el=document.createElement('div');
  el.innerHTML=`
  <div class="row g-4">
    <div class="col-12 col-lg-5"><div class="card p-4">
      <h2 class="h5 mb-3"><i class="bi bi-cash-coin me-2"></i>SDLT Calculator</h2>
      <div class="mb-3">
        <label class="form-label">Price (GBP)</label>
        <input id="price" type="number" class="form-control" value="1250000">
      </div>
      <div class="mb-3">
        <label class="form-label">Property type</label>
        <select id="ptype" class="form-select">
          <option value="residential">Residential – Main home</option>
          <option value="additional">Residential – Additional property</option>
          <option value="nonresidential">Non-residential / Mixed</option>
        </select>
      </div>
      <div class="form-check mb-3">
        <input id="ftb" class="form-check-input" type="checkbox">
        <label class="form-check-label" for="ftb">First-time buyer relief (adjust bands below)</label>
      </div>
      <div class="d-grid gap-2">
        <button id="compute" class="btn btn-primary">Compute</button>
        <button id="bandsBtn" class="btn btn-outline-dark">Edit bands</button>
      </div>
      <div class="small-muted mt-3">Rates vary by date. Bands are editable to avoid stale data.</div>
    </div></div>

    <div class="col-12 col-lg-7"><div class="card p-4 h-100">
      <h3 class="h6">Result</h3>
      <div id="result" class="display-6">–</div>
      <div id="breakdown" class="mt-3 small"></div>
    </div></div>
  </div>

  <div id="bandsCard" class="card p-4 mt-4" style="display:none">
    <h3 class="h6">Edit Bands</h3>
    <div id="bandsWrap" class="row g-4"></div>
    <button id="applyBands" class="btn btn-primary btn-sm mt-3">Apply</button>
  </div>

  <div class="card p-4 mt-4">
    <h3 class="h6 mb-2"><i class="bi bi-buildings me-2"></i>London CIL & MCIL (illustrative)</h3>
    <div class="row g-3">
      <div class="col-12 col-md-3">
        <label class="form-label">Borough</label>
        <select id="cilB" class="form-select">
          <option value="southwark" selected>Southwark</option>
          <option value="city">City of London</option>
          <option value="tower">Tower Hamlets</option>
        </select>
      </div>
      <div class="col-12 col-md-3">
        <label class="form-label">Use</label>
        <select id="cilUse" class="form-select">
          <option value="res" selected>Residential</option>
          <option value="nonres">Non-res</option>
        </select>
      </div>
      <div class="col-12 col-md-3">
        <label class="form-label">GIA (m²)</label>
        <input id="gia" type="number" class="form-control" value="1500">
      </div>
      <div class="col-12 col-md-3">
        <label class="form-label">Affordable % of GIA</label>
        <input id="aff" type="number" class="form-control" value="0">
      </div>
      <div class="col-12 col-md-3">
        <label class="form-label">Borough CIL £/m²</label>
        <input id="rate" type="number" class="form-control" value="300">
      </div>
      <div class="col-12 col-md-3">
        <label class="form-label">MCIL £/m²</label>
        <input id="mcil" type="number" class="form-control" value="80">
      </div>
      <div class="col-12 col-md-3">
        <label class="form-label">Index factor</label>
        <input id="idx" type="number" step="0.01" class="form-control" value="1.00">
      </div>
    </div>
    <div class="d-grid gap-2 mt-3">
      <button id="calcCIL" class="btn btn-outline-dark">Compute CIL</button>
    </div>
    <div id="cilOut" class="mt-2 h6">–</div>
    <div class="small-muted">Note: Borough/Mayoral rates & exemptions vary. This is a portfolio demo.</div>
  </div>
  `;

  let bands = JSON.parse(JSON.stringify(DEFAULT));

  function renderBands(){
    const wrap=el.querySelector('#bandsWrap'); wrap.innerHTML='';
    Object.entries(bands).forEach(([k,arr])=>{
      const col=document.createElement('div'); col.className='col-12 col-lg-4';
      col.innerHTML=`<div class="border rounded p-3"><div class="fw-semibold text-uppercase small mb-2">${k}</div></div>`;
      const box=col.querySelector('div');
      arr.forEach((b,i)=>{
        const row=document.createElement('div'); row.className='d-flex align-items-center gap-2 mb-2';
        row.innerHTML=`<span class="small-muted">≤</span>
        <input class="form-control form-control-sm" data-k="${k}" data-i="${i}" data-f="upTo" type="number" value="${b.upTo===Infinity?'':b.upTo}" placeholder="∞">
        <span class="small-muted">@</span>
        <input class="form-control form-control-sm" data-k="${k}" data-i="${i}" data-f="rate" type="number" step="0.01" value="${b.rate}">`;
        box.appendChild(row);
      });
      wrap.appendChild(col);
    });
  }

  function compute(){
    const price=+el.querySelector('#price').value||0;
    const pt=el.querySelector('#ptype').value;
    const tax=calcBands(price, bands[pt]||[]);
    el.querySelector('#result').textContent=gbp(tax);
    const list=(bands[pt]||[]).map(b=>`<li><code>≤ ${b.upTo===Infinity?'∞':gbp(b.upTo)}</code> @ ${(b.rate*100).toFixed(2)}%</li>`).join('');
    el.querySelector('#breakdown').innerHTML=`<ul class="mb-0">${list}</ul>`;
  }

  function presets(){
    const map={ southwark:{res:300,nonres:200,mcil:80}, city:{res:150,nonres:150,mcil:80}, tower:{res:200,nonres:200,mcil:80} };
    const b=el.querySelector('#cilB').value, use=el.querySelector('#cilUse').value;
    const p=map[b]||map.southwark;
    el.querySelector('#rate').value=p[use]; el.querySelector('#mcil').value=p.mcil;
  }

  el.querySelector('#compute').addEventListener('click', compute);
  el.querySelector('#bandsBtn').addEventListener('click',()=>{ const c=el.querySelector('#bandsCard'); c.style.display=c.style.display==='none'?'block':'none'; renderBands(); });
  el.querySelector('#applyBands').addEventListener('click',()=>{
    el.querySelectorAll('#bandsWrap input').forEach(inp=>{
      const {k,i,f}=inp.dataset; const val = inp.value===''?Infinity:Number(inp.value);
      bands[k][i][f]= f==='rate'?Number(inp.value):val;
    }); alert('Bands updated.');
  });

  el.querySelector('#cilB').addEventListener('change', presets);
  el.querySelector('#cilUse').addEventListener('change', presets);
  presets();

  el.querySelector('#calcCIL').addEventListener('click',()=>{
    const gia=+el.querySelector('#gia').value||0;
    const aff=+el.querySelector('#aff').value||0;
    const eff = Math.max(0, gia * (1 - (aff/100))); // deduct affordable GIA
    const rate=+el.querySelector('#rate').value||0;
    const mcil=+el.querySelector('#mcil').value||0;
    const idx=+el.querySelector('#idx').value||1;
    const bor = eff*rate*idx, mayoral=eff*mcil*idx, total=Math.round(bor+mayoral);
    el.querySelector('#cilOut').textContent=`Effective GIA: ${eff.toLocaleString()} m² → Borough CIL ${gbp(Math.round(bor))} + MCIL ${gbp(Math.round(mayoral))} = Total ${gbp(total)}`;
  });

  return el;
}
