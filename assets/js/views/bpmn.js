export async function BpmnView(){
  const el=document.createElement('div');
  el.innerHTML=`
  <div class="d-flex align-items-center justify-content-between mb-3">
    <h2 class="h5 mb-0"><i class="bi bi-diagram-3 me-2"></i>Acquisition Workflow (BPMN)</h2>
    <div class="d-flex gap-2">
      <button class="btn btn-outline-dark btn-sm" id="load">Load sample</button>
      <button class="btn btn-primary btn-sm" id="download">Download XML</button>
    </div>
  </div>
  <div id="canvas" style="height:60vh; background:#fffdf2; border:1px solid #e6ddbf; border-radius:12px"></div>
  <div class="small-muted mt-2">Edit the diagram; the sample includes SDLT branches (res/additional/non-res) and a London CIL checkpoint.</div>`;

  const modeler = new BpmnJS({ container: el.querySelector('#canvas') });
  async function load() {
    const xml = await (await fetch('./assets/bpmn/acquisition.bpmn')).text();
    await modeler.importXML(xml);
    modeler.get('canvas').zoom('fit-viewport');
  }
  el.querySelector('#load').addEventListener('click', load);
  el.querySelector('#download').addEventListener('click', async ()=>{
    const { xml } = await modeler.saveXML({ format:true });
    const blob = new Blob([xml], { type:'application/xml' });
    const url = URL.createObjectURL(blob); const a=document.createElement('a');
    a.href=url; a.download='acquisition-custom.bpmn'; a.click(); URL.revokeObjectURL(url);
  });
  load();
  return el;
}
