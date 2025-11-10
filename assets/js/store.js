const KEY='josue_agile_board_v1';
export function readBoard(){
  try{ return JSON.parse(localStorage.getItem(KEY)) || {
    backlog:[
      {id:'t1',title:'Source opportunity',detail:'Broker IM / Off-market lead / Portal scrape'},
      {id:'t2',title:'Title & planning scan',detail:'Land Reg, conservation, previous refs'},
      {id:'t3',title:'SDLT & CIL quick check',detail:'Res vs Non-res, borough presets'},
    ],
    doing:[{id:'t4',title:'Data room request',detail:'Tenancy, red-book, surveys'}],
    done:[{id:'t5',title:'Baseline GDV model',detail:'Comps / rent / cap rates / build costs'}]
  }}catch(e){return {backlog:[],doing:[],done:[]}};
}
export function writeBoard(s){ localStorage.setItem(KEY, JSON.stringify(s)); }
