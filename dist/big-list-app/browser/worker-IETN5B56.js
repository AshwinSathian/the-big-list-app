var n={status:["Triage","Backlog","Todo","In Progress","In Review","Done"],labels:["Bug","Feature","Performance","Security","Documentation","User Request","Immediate","Next Release","Major Release"],priority:["none","low","medium","high","critical"],assignee:["Has Assignee","No Assignee"]};addEventListener("message",({data:r})=>{let{tickets:o,filterKey:t}=r,e=c(o,t);postMessage(e)});addEventListener("error",r=>{console.error("Worker error:",r)});var c=(r,o)=>{let t=n[o],e={};for(let s of t)e[s]=[];for(let s of r){let i=s[o];if(["priority","status"].includes(o))e[i].push(s);else if(o==="labels")for(let a of i)e[a].push(s);else o==="assignee"&&(i?e["Has Assignee"].push(s):e["No Assignee"].push(s))}return e};
