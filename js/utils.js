import {business} from './data.js';
export const currency = value => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value);
export function el(tag,attributes={},children=[]){const node=document.createElement(tag);for(const [key,value] of Object.entries(attributes)){if(key==='class')node.className=value;else if(key==='text')node.textContent=value;else node.setAttribute(key,String(value));}for(const child of children)node.append(typeof child==='string'?document.createTextNode(child):child);return node;}
const paths={bag:'M5 7h14l1 14H4L5 7ZM9 8V6a3 3 0 0 1 6 0v2',chat:'M21 11a9 9 0 0 1-13 8l-5 2 1-5A9 9 0 1 1 21 11ZM8 9c1 4 3 5 7 6',arrow:'M4 12h15m-6-6 6 6-6 6'};
export function icon(name){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');for(const [key,value] of Object.entries({class:'icon',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'1.7','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true'}))svg.setAttribute(key,value);const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[name]||paths.arrow);svg.append(path);return svg;}
export const whatsappURL = message => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
let toastTimer;
export function toast(message){const node=document.querySelector('.toast');if(!node)return;node.textContent=message;node.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove('visible'),3000);}
export function validPhone(value){return /^(?:\+?91[\s-]?)?[6-9]\d{9}$/.test(value.replace(/[\s()-]/g,''));}
