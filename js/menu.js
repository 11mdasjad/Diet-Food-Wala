import {products, productById, catalog, categories, categoryById, dietLabels, itemPrice, itemName} from './data.js';
import {el, icon, currency, whatsappURL} from './utils.js';
import {addItem} from './cart.js';

export function filterProducts({search='', category='all', diet='all', sort='featured'} = {}) {
  const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const result = products.filter(product => {
    const searchable = `${product.name} ${product.sourceName} ${product.description} ${product.ingredients} ${product.badge}`.toLowerCase();
    return (category === 'all' || product.categories.includes(category)) &&
      (diet === 'all' || product.diet === diet || (diet === 'nonveg' && product.diet === 'egg')) &&
      terms.every(term => searchable.includes(term));
  });
  if (sort === 'low') result.sort((a,b) => a.price-b.price);
  if (sort === 'high') result.sort((a,b) => b.price-a.price);
  if (sort === 'name') result.sort((a,b) => a.name.localeCompare(b.name));
  return result;
}

function dietTag(product) {
  return el('span',{class:`diet-label ${product.diet}`,text:`${product.diet === 'unspecified' ? '' : '● '}${dietLabels[product.diet]}`});
}
function foodArtwork(product, detail = false) {
  const source = `assets/images/${product.image}.jpg`;
  const responsive = product.image.startsWith('catalog/');
  const img = el('img',{
    src:source,
    ...(responsive ? {srcset:`assets/images/${product.image}-small.jpg 480w, ${source} 960w`,sizes:detail ? '(max-width: 767px) 92vw, 560px' : '(max-width: 767px) 92vw, (max-width: 1179px) 45vw, 400px'} : {}),
    alt:`Illustrative serving of ${product.name}`,
    width:960,height:720,loading:detail ? 'eager' : 'lazy',decoding:'async',
  });
  return el('figure',{class:'meal-photo'},[img,el('figcaption',{text:'Serving suggestion'})]);
}

function orderingControls(product, context) {
  let variantId = product.variants?.[0].id;
  const price = el('strong',{class:'product-price',text:currency(itemPrice(product,variantId))});
  const priceRow = el('div',{class:'product-price-row'},[price,dietTag(product)]);
  const add = el('button',{class:'btn primary',type:'button','aria-label':`Add ${product.name} to cart`},[icon('bag'),'Add to bag']);
  add.addEventListener('click',() => addItem(product.id,variantId));
  const enquire = el('a',{class:'icon-btn','aria-label':`Enquire about ${product.name} on WhatsApp`},[icon('chat')]);
  const updateLink = () => { enquire.href = whatsappURL(`Hello Diet Food Wala, I would like ${itemName(product,variantId)} (${currency(itemPrice(product,variantId))}). Please confirm availability and ingredients.`); };
  updateLink();
  const nodes = [];
  if (product.variants) {
    const select = el('select',{id:`${context}-${product.id}`, 'aria-label':`Choose portion for ${product.name}`},product.variants.map(variant => el('option',{value:variant.id,text:`${variant.name} · ${currency(variant.price)}`})));
    select.addEventListener('change',() => { variantId=select.value; price.textContent=currency(itemPrice(product,variantId)); updateLink(); });
    nodes.push(el('label',{class:'portion-select',for:select.id},['Portion / size',select]));
  }
  nodes.push(priceRow,el('div',{class:'product-actions'},[add,enquire]));
  return nodes;
}

export function productCard(product, featured = false) {
  const detailURL = `meal-details.html?id=${encodeURIComponent(product.id)}`;
  const card = el('article',{class:`product-card catalog-card${featured ? ' featured-card' : ''}`});
  card.append(el('a',{class:'product-image',href:detailURL,'aria-label':`View ${product.name}`},[foodArtwork(product)]));
  const info = el('div',{class:'product-info'},[
    el('div',{class:'catalog-card-heading'},[
      el('div',{},[el('span',{class:'catalog-category',text:product.badge}),el('h3',{},[el('a',{href:detailURL,text:product.name})])]),
    ]),
    el('p',{class:'product-portion',text:product.portion || 'Ask us about ingredients and serving size.'}),
    el('div',{class:'catalog-card-order'},orderingControls(product,featured ? 'featured' : 'catalog')),
    el('a',{class:'details-link',href:detailURL,text:'View details →'}),
  ]);
  card.append(info);
  return card;
}

export function initMenu() {
  const grid = document.querySelector('[data-products]');
  if (grid?.dataset.products === 'featured') grid.replaceChildren(...products.filter(product=>product.featured).slice(0,4).map(product=>productCard(product,true)));
  else if (grid) {
    const search=document.querySelector('#meal-search'), diet=document.querySelector('#diet-filter'), sort=document.querySelector('#price-sort');
    const tabsContainer=document.querySelector('#catalog-categories');
    const params=new URLSearchParams(location.search);
    const supportedCategories=[...categories.map(category=>category.id),'salads','protein','balanced','paneer','chef-specials','custom'];
    let category=supportedCategories.includes(params.get('category')) ? params.get('category') : 'all';
    search.value=params.get('q') || '';
    if (['veg','egg','nonveg','unspecified'].includes(params.get('diet'))) diet.value=params.get('diet');
    const tabs=categories.map(item=>{
      const count=filterProducts({category:item.id}).length;
      const button=el('button',{type:'button','data-category':item.id,'aria-pressed':String(item.id===category)},[item.name,el('span',{class:'category-count',text:String(count)})]);
      button.addEventListener('click',()=>{category=item.id;render();});
      return button;
    });
    tabsContainer.replaceChildren(...tabs);
    function render() {
      const result=filterProducts({search:search.value,category,diet:diet.value,sort:sort.value});
      grid.replaceChildren(...result.map(product=>productCard(product)));
      tabs.forEach(tab=>tab.setAttribute('aria-pressed',String(tab.dataset.category===category)));
      document.querySelector('#results-count').textContent=`${result.length} of ${products.length} items`;
      document.querySelector('#catalog-selection').textContent=categoryById(category)?.name || ({salads:'All salads',protein:'Protein meals',balanced:'Rice meal boxes',paneer:'Paneer favourites','chef-specials':'Chef specials',custom:'Custom meal plans'}[category]);
      document.querySelector('#empty-results').hidden=result.length>0 || category==='custom';
      document.querySelector('.menu-custom').hidden=category!=='custom';
      const next=new URLSearchParams();
      if(category!=='all')next.set('category',category);
      if(search.value.trim())next.set('q',search.value.trim());
      if(diet.value!=='all')next.set('diet',diet.value);
      window.history?.replaceState(null,'',`${location.pathname}${next.size ? `?${next}` : ''}`);
    }
    search.addEventListener('input',render); diet.addEventListener('change',render); sort.addEventListener('change',render);
    document.querySelectorAll('[data-reset-filters]').forEach(button=>button.addEventListener('click',()=>{category='all';search.value='';diet.value='all';sort.value='featured';render();search.focus();}));
    const stat=document.querySelector('[data-catalog-total]'); if(stat)stat.textContent=String(products.length);
    render();
  }
  const details=document.querySelector('#meal-detail');
  if (!details) return;
  const product=productById(new URLSearchParams(location.search).get('id'));
  if (!product) {
    details.replaceChildren(el('div',{class:'empty-state'},[el('h2',{text:'This item could not be found'}),el('p',{text:'Explore the catalog to find your next favourite.'}),el('a',{href:'menu.html',class:'btn primary',text:'Back to the menu'})]));
    return;
  }
  document.title=`${product.name} | Diet Food Wala`;
  const photo=el('div',{class:'detail-art'},[foodArtwork(product,true),el('a',{class:'details-link',href:catalog.url,text:'View original photos on WhatsApp ↗'})]);
  const article=el('article',{class:'meal-detail-copy'},[
    el('span',{class:'eyebrow',text:product.badge}),el('h2',{text:product.name}),
    el('p',{class:'detail-portion',text:product.description}),
    ...orderingControls(product,'detail'),
    ...(product.variants ? [el('p',{class:'small muted',text:'“Listed portion” is the base catalog price. Its size is not specified; confirm with the kitchen.'})] : []),
    el('h3',{text:'Portions & ingredients'}),el('p',{text:product.ingredients}),
    el('h3',{text:'Dietary information'}),el('p',{text:product.allergens}),
    el('p',{class:'catalog-price-note',text:`Prices from the business catalog, checked ${catalog.updated}. Confirm availability and final delivery charges when ordering.`}),
    el('a',{class:'details-link',href:`menu.html?category=${product.category}`,text:`← Back to ${product.badge.toLowerCase()}`}),
  ]);
  details.replaceChildren(el('div',{class:'meal-detail-grid'},[photo,article]));
  const related=products.filter(item=>item.category===product.category && item.id!==product.id).slice(0,3);
  if(related.length)details.append(el('section',{class:'related-products'},[el('h2',{text:'More to try'}),el('div',{class:'product-grid catalog-grid'},related.map(item=>productCard(item)))]));
}
