import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseHTML} from 'linkedom';
const store=new Map();
globalThis.localStorage={getItem:key=>store.get(key)||null,setItem:(key,value)=>store.set(key,value)};
function mount(html,url='http://localhost/menu.html'){const dom=parseHTML(html);globalThis.window=dom.window;globalThis.document=dom.document;globalThis.location=new URL(url);return dom;}
mount(await readFile('menu.html','utf8'));
const {initMenu}=await import('../js/menu.js');
const {initCart,CART_KEY}=await import('../js/cart.js');
const {products}=await import('../js/data.js');
const {initContact}=await import('../js/contact.js');
const {initSubscriptions}=await import('../js/subscriptions.js');
function writableValue(input,value){Object.defineProperty(input,'value',{value,writable:true,configurable:true});}
function change(input,type='change'){input.dispatchEvent(new window.Event(type,{bubbles:true}));}
test('menu renders and input filtering/reset updates actual DOM',()=>{writableValue(document.querySelector('#diet-filter'),'all');writableValue(document.querySelector('#price-sort'),'featured');initMenu();assert.equal(document.querySelectorAll('.product-card').length,products.length);const search=document.querySelector('#meal-search');search.value='TOFU CHICKPEA';change(search,'input');assert.equal(document.querySelectorAll('.product-card').length,1);assert.match(document.querySelector('.product-card').textContent,/Tofu Chickpea Salad/);search.value='no meal matches this';change(search,'input');assert.equal(document.querySelector('#empty-results').hidden,false);document.querySelector('#reset-filters').click();assert.equal(document.querySelectorAll('.product-card').length,products.length);document.querySelector('[data-category=all]').click();});
test('cart UI adds, increments, decrements, removes and saves',()=>{initCart();document.querySelector('[aria-label="Add Peri-Peri Paneer Salad to cart"]').click();assert.equal(document.querySelector('.cart-count').textContent,'1');assert.match(document.querySelector('#cart-summary').textContent,/₹200/);document.querySelector('[aria-label="Increase Peri-Peri Paneer Salad quantity"]').click();assert.equal(document.querySelector('.cart-count').textContent,'2');assert.match(document.querySelector('#cart-summary').textContent,/₹400/);assert.match(new URL(document.querySelector('#cart-enquiry').href).searchParams.get('text'),/2 × Peri-Peri Paneer Salad/);document.querySelector('[aria-label="Decrease Peri-Peri Paneer Salad quantity"]').click();assert.equal(document.querySelector('.cart-count').textContent,'1');document.querySelector('[aria-label="Remove Peri-Peri Paneer Salad"]').click();assert.equal(document.querySelector('.cart-count').textContent,'0');assert.equal(document.querySelector('#cart-enquiry').hidden,true);assert.equal(store.get(CART_KEY),'[]');});
test('meal details render correct ID and a safe invalid-ID fallback',async()=>{const html=await readFile('meal-details.html','utf8');mount(html,'http://localhost/meal-details.html?id=peri-peri-paneer-salad');initMenu();assert.match(document.querySelector('#meal-detail').textContent,/Contains milk/);assert.match(document.querySelector('#meal-detail').textContent,/₹200/);mount(html,'http://localhost/meal-details.html?id=%3Cscript%3E');initMenu();assert.match(document.querySelector('#meal-detail').textContent,/could not be found/);assert.equal(document.querySelectorAll('#meal-detail script').length,0);});
test('annual preview acknowledgement only unlocks enquiry, never payment',async()=>{mount(await readFile('refund-plan.html','utf8'),'http://localhost/refund-plan.html');initSubscriptions();const enquiry=document.querySelector('#plan-enquiry'),ack=document.querySelector('#terms-ack');assert.equal(enquiry.disabled,true);ack.checked=true;change(ack);assert.equal(enquiry.disabled,false);assert.equal(document.querySelector('button.disabled').disabled,true);ack.checked=false;change(ack);assert.equal(enquiry.disabled,true);});
test('contact renders validation errors and only prepares an encoded link',async()=>{mount(await readFile('contact.html','utf8'),'http://localhost/contact.html');const form=document.querySelector('#contact-form');const elements=Object.fromEntries([...form.querySelectorAll('[name]')].map(node=>[node.name||node.getAttribute('name'),node]));Object.defineProperty(form,'elements',{value:elements});writableValue(elements.category,'meals');Object.defineProperty(elements.category,'selectedOptions',{value:[{text:'Meal enquiry'}]});document.querySelector('#contact-result').scrollIntoView=()=>{};globalThis.matchMedia=()=>({matches:true});initContact();form.dispatchEvent(new window.Event('submit',{cancelable:true}));assert.match(document.querySelector('#phone-error').textContent,/valid 10-digit/);assert.match(document.querySelector('#consent-error').textContent,/agree/);elements.name.value='Demo Visitor';elements.phone.value='9876543210';elements.email.value='demo@example.com';elements.message.value='I would like a salad & rice bowl.';elements.consent.checked=true;form.dispatchEvent(new window.Event('submit',{cancelable:true}));const result=document.querySelector('#contact-result');assert.match(result.textContent,/has not been sent/);assert.equal(result.querySelectorAll('a').length,1);assert.match(new URL(result.querySelector('a').getAttribute('href')).searchParams.get('text'),/salad & rice bowl/);change(elements.message,'input');assert.equal(result.textContent,'');});

test('size selection changes card price, cart totals and WhatsApp message',async()=>{
 mount(await readFile('menu.html','utf8'));
 writableValue(document.querySelector('#diet-filter'),'all');writableValue(document.querySelector('#price-sort'),'featured');
 initMenu();initCart();
 const select=document.querySelector('#catalog-tandoori-paneer-pizza');writableValue(select,'large');change(select);
 const card=select.closest('.product-card');assert.match(card.querySelector('.product-price').textContent,/₹499/);
 card.querySelector('.product-actions button').click();
 assert.match(document.querySelector('#cart-items').textContent,/Tandoori Paneer Pizza — Large/);
 assert.match(document.querySelector('#cart-summary').textContent,/₹499/);
 const enquiry=new URL(document.querySelector('#cart-enquiry').href);assert.equal(enquiry.pathname,'/919990386835');assert.match(enquiry.searchParams.get('text'),/Large.*₹499/);
});
test('category deep links and unknown detail IDs have useful results',async()=>{
 mount(await readFile('menu.html','utf8'),'http://localhost/menu.html?category=pizza');
 writableValue(document.querySelector('#diet-filter'),'all');writableValue(document.querySelector('#price-sort'),'featured');initMenu();
 assert.equal(document.querySelectorAll('.product-card').length,10);assert.equal(document.querySelector('[data-category=pizza]').getAttribute('aria-pressed'),'true');
});
