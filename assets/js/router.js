import { HomeView } from './views/home.js';
import { BpmnView } from './views/bpmn.js';
import { AgileView } from './views/agile.js';
import { SdltView } from './views/sdlt.js';
import { MetricsView } from './views/metrics.js';
import { DocsView } from './views/docs.js';

const routes = {
  '/': HomeView,
  '/bpmn': BpmnView,
  '/agile': AgileView,
  '/sdlt': SdltView,
  '/metrics': MetricsView,
  '/docs': DocsView,
};

async function render(){
  const path = location.hash.replace('#','') || '/';
  const View = routes[path] || HomeView;
  const app = document.getElementById('app');
  app.innerHTML = '';
  const node = await View();
  app.appendChild(node);
  if(path==='/docs'){ mermaid.run({ querySelector: '.mermaid' }); }
}
addEventListener('hashchange', render);
addEventListener('load', render);
