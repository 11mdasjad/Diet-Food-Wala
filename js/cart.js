import {productById, itemPrice, itemName} from './data.js';
import {currency,el,whatsappURL,toast} from './utils.js';
export const CART_KEY='dfw-catalog-cart-v2';
const rowKey = row => `${row.id}:${row.variant || ''}`;
export function normalizeCart(value) {
  if(!Array.isArray(value))return [];
  const merged=new Map();
  for(const row of value) {
    const product=row && productById(row.id);
    if(!product || !Number.isInteger(row.quantity) || row.quantity<=0)continue;
    if(row.variant && !product.variants?.some(variant=>variant.id===row.variant))continue;
    const normalized={id:row.id,quantity:row.quantity};
    if(product.variants)normalized.variant=row.variant || product.variants[0].id;
    const key=rowKey(normalized), existing=merged.get(key);
    normalized.quantity=Math.min(99,(existing?.quantity || 0)+row.quantity);
    merged.set(key,normalized);
  }
  return [...merged.values()];
}
export function cartTotal(rows) { return normalizeCart(rows).reduce((sum,row)=>sum+itemPrice(productById(row.id),row.variant)*row.quantity,0); }
let cart=[], storageAvailable=true;
try { cart=normalizeCart(JSON.parse(localStorage.getItem(CART_KEY)||'[]')); } catch { storageAvailable=false; }
function persist() {
  try { localStorage.setItem(CART_KEY,JSON.stringify(cart));storageAvailable=true; } catch { storageAvailable=false; }
  renderCart();
}
export function addItem(id,variant) {
  const product=productById(id); if(!product)return;
  if(variant && !product.variants?.some(option=>option.id===variant))return;
  const candidate={id,quantity:1,...(product.variants?{variant:variant||product.variants[0].id}:{})};
  const row=cart.find(item=>rowKey(item)===rowKey(candidate));
  if(row?.quantity>=99){toast('Maximum 99 of each item per enquiry.');return;}
  if(row)row.quantity++;else cart.push(candidate);
  persist();toast(`${itemName(product,candidate.variant)} added to your bag.${storageAvailable?'':' Saved for this visit only.'}`);
}
function changeQuantity(key,amount) {
  const row=cart.find(item=>rowKey(item)===key);if(!row)return;
  row.quantity=Math.min(99,row.quantity+amount);cart=cart.filter(item=>item.quantity>0);persist();
}
function renderCart() {
  document.querySelectorAll('.cart-count').forEach(node=>node.textContent=cart.reduce((sum,row)=>sum+row.quantity,0));
  const items=document.querySelector('#cart-items');if(!items)return;
  items.replaceChildren();
  for(const row of cart) {
    const product=productById(row.id), name=itemName(product,row.variant), key=rowKey(row);
    const controls=el('div',{class:'quantity-controls'});
    for(const [text,delta,label] of [['−',-1,'Decrease'],['+',1,'Increase']]) {
      const ariaLabel=`${label} ${name} quantity`;
      const button=el('button',{type:'button',text,'aria-label':ariaLabel});
      button.addEventListener('click',()=>{
        changeQuantity(key,delta);
        const target=[...document.querySelectorAll('.quantity-controls button')].find(node=>node.getAttribute('aria-label')===ariaLabel);
        (target||document.querySelector('[data-close-cart]')).focus();
      });
      if(delta===1)controls.append(el('span',{text:String(row.quantity),'aria-label':`${row.quantity} items`}));
      controls.append(button);
    }
    const remove=el('button',{class:'remove-item',type:'button',text:'Remove','aria-label':`Remove ${name}`});
    remove.addEventListener('click',()=>{cart=cart.filter(item=>rowKey(item)!==key);persist();document.querySelector('[data-close-cart]').focus();});
    items.append(el('div',{class:'cart-row'},[
      el('img',{class:'cart-product-photo',src:`assets/images/${product.image}.jpg`,alt:`Illustrative ${product.name}`,width:60,height:60,loading:'lazy'}),
      el('div',{},[el('h3',{text:name}),el('p',{text:currency(itemPrice(product,row.variant)*row.quantity)}),controls]),remove,
    ]));
  }
  const summary=document.querySelector('#cart-summary'), enquiry=document.querySelector('#cart-enquiry');
  summary.replaceChildren();
  if(!cart.length) {
    items.append(el('p',{class:'cart-empty',text:'Your bag is waiting for something good. Explore the menu and add your favourites.'}));enquiry.hidden=true;
  } else {
    summary.append(el('div',{class:'cart-total'},[el('span',{text:'Subtotal'}),el('span',{text:currency(cartTotal(cart))})]),el('p',{class:'small muted',text:'Delivery charges and any applicable taxes will be confirmed by the business.'}));
    enquiry.hidden=false;
    enquiry.href=whatsappURL(`Hello Diet Food Wala, I would like to enquire about:\n${cart.map(row=>`${row.quantity} × ${itemName(productById(row.id),row.variant)} (${currency(itemPrice(productById(row.id),row.variant)*row.quantity)})`).join('\n')}\nCatalog subtotal: ${currency(cartTotal(cart))}. Please confirm availability, ingredients, final prices and delivery charges. This is an enquiry, not a confirmed order.`);
  }
}
export function initCart() {
  const dialog=document.querySelector('#cart-dialog');if(!dialog)return;
  document.querySelectorAll('.cart-toggle').forEach(button=>button.addEventListener('click',()=>dialog.showModal()));
  document.querySelectorAll('[data-close-cart]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  window.addEventListener('storage',event=>{if(event.key===CART_KEY){try{cart=normalizeCart(JSON.parse(event.newValue||'[]'));renderCart();}catch{}}});
  renderCart();
}
