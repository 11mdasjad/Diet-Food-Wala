import {initCart} from './cart.js';
import {initMenu} from './menu.js';
import {initContact} from './contact.js';
import {initSubscriptions} from './subscriptions.js';
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
function closeNav(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeNav();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeNav();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeNav();});
matchMedia('(min-width: 1180px)').addEventListener('change',closeNav);
initCart();initMenu();initContact();initSubscriptions();
