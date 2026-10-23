import catalogProducts from './catalog-data.js';
import {productImage} from './product-images.js';
export const catalog = {url:'https://wa.me/c/919990386835',updated:'23 October 2026',complete:true};
export const categories = [
  {id:'all',name:'All items',symbol:'✦'},
  {id:'veg-salads',name:'Veg salads',symbol:'🥗'},
  {id:'chicken',name:'Chicken',symbol:'🍗'},
  {id:'eggs',name:'Egg meals',symbol:'🥚'},
  {id:'fish',name:'Fish salads',symbol:'🐟'},
  {id:'specials',name:'Specials',symbol:'✦'},
  {id:'rice',name:'Rice meal boxes',symbol:'🍱'},
  {id:'starters',name:'Starters & momos',symbol:'🥟'},
  {id:'fried-rice',name:'Fried rice',symbol:'🍚'},
  {id:'pizza',name:'Pizzas',symbol:'🍕'},
  {id:'burgers',name:'Burgers',symbol:'🍔'},
  {id:'fries',name:'French fries',symbol:'🍟'},
  {id:'drinks',name:'Shakes & coffee',symbol:'🥤'},
  {id:'sandwiches',name:'Sandwiches',symbol:'🥪'},
];
export const categoryById = id => categories.find(category => category.id === id);
const kitchenNote = 'Ask the kitchen for the full ingredients, dressings, allergens and cross-contact information before ordering.';
export const products = catalogProducts.map(product => ({
  ...product,
  image: productImage(product),
  description: product.portion || `${product.name} from the Diet Food Wala catalog.`,
  ingredients: product.portion || 'Full ingredients and serving size are available from the kitchen.',
  badge: categoryById(product.category).name,
  allergens: `${/paneer|cheese/i.test(product.name + product.portion) ? 'Contains milk. ' : ''}${/egg|omelet/i.test(product.name + product.portion) ? 'Contains egg. ' : ''}${/fish/i.test(product.name) ? 'Contains fish. ' : ''}${/sesame/i.test(product.name) ? 'Contains sesame. ' : ''}${/soya|tofu/i.test(product.name) ? 'Contains soy. ' : ''}${kitchenNote}`,
}));
export const productById = id => products.find(product => product.id === id);
export const business = {phone:'+917529973199',whatsapp:'919990386835',whatsappVerified:true};
export const dietLabels = {veg:'Veg',egg:'Contains egg',nonveg:'Non-veg',unspecified:'Ask about ingredients'};
export function productVariant(product, variantId) { return product.variants?.find(variant => variant.id === variantId) || product.variants?.[0]; }
export function itemPrice(product, variantId) { return productVariant(product, variantId)?.price ?? product.price; }
export function itemName(product, variantId) { const variant = productVariant(product, variantId); return `${product.name}${variant ? ` — ${variant.name}` : ''}`; }
