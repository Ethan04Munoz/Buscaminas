(function(){"use strict";self.onmessage=function(w){const{type:M,data:m}=w.data;if(M==="generateMines"){const{eX:f,eY:d,cantidadMinas:u,tableroSize:c,obtenerNumeroAleatorioEntreStr:t,estaEnAreaProhibidaStr:y}=m,i=new Set,s=new Function(`return ${t}`)(),a=new Function(`return ${y}`)();for(;i.size<u;){const e=s(0,c-1),n=s(0,c-1);a(e,n,f,d)||i.add(`${e},${n}`)}const r=Array.from(i).map(e=>{const[n,o]=e.split(",").map(Number);return{x:n,y:o}});self.postMessage({type:"minesGenerated",data:r})}else if(M==="countMines"){let u=function(t,y){let i=Array.from({length:t},()=>Array(t).fill(0));for(let s=0;s<t;s++)for(let a=0;a<t;a++)for(let r=-1;r<=1;r++)for(let e=-1;e<=1;e++){if(r===0&&e===0)continue;let n=s+r,o=a+e;n>=0&&n<t&&o>=0&&o<t&&y.some(l=>l.x===n&&l.y===o)&&i[s][a]++}return i};const{tableroSize:f,ubicacionesMinas:d}=m;console.log("Trabajando en el worker");const c=u(f,d);self.postMessage({type:"minesCounted",data:c})}else if(M==="calculateNeighborMines"){let t=function(i,s,a,r){let e=0;console.log("Ubicaciones minas: ",a);for(let n=-1;n<=1;n++)for(let o=-1;o<=1;o++){if(n===0&&o===0)continue;const l=i+n,g=s+o;l>=0&&l<r&&g>=0&&g<r&&a.some(p=>p.x===l&&p.y===g)&&e++}return console.log("Contador minas",e),e};const{x:f,y:d,ubicacionesMinas:u,tableroSize:c}=m,y=t(f,d,u,c);self.postMessage({type:"neighborMinesCalculated",data:y})}}})();