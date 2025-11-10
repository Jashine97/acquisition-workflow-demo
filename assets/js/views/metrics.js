export function MetricsView(){
  const el=document.createElement('div');
  el.innerHTML=`
  <h2 class="h5 mb-3"><i class="bi bi-graph-up-arrow me-2"></i>Delivery Metrics</h2>
  <div class="card p-4"><canvas id="kpi" height="120"></canvas></div>`;
  setTimeout(()=>{
    const ctx=el.querySelector('#kpi');
    new Chart(ctx,{type:'line',data:{
      labels:['S1','S2','S3','S4','S5','S6'],
      datasets:[{label:'Throughput',data:[7,9,8,12,11,14]},{label:'Cycle Time (days)',data:[9,8,7,7,6,6],yAxisID:'y1'}]
    },options:{responsive:true, scales:{y:{beginAtZero:true},y1:{beginAtZero:true,position:'right'}}}});
  },0);
  return el;
}
