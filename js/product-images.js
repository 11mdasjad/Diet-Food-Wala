// Illustrative food photography. Related menu variants share a serving image.
// Original prompts and provenance: data/catalog-image-prompts.json, assets/ASSETS.md.
const generated = name => `catalog/${name}`;
export function productImage(product) {
  const name = product.name.toLowerCase();
  if (product.id === 'boiled-chicken') return generated('boiled-chicken');
  if (product.id === 'grilled-chicken') return generated('grilled-chicken');
  if (name.includes('mutton')) return generated('mutton-keema');
  if (name.includes('salami')) return generated('chicken-salami');
  if (product.category === 'fish') return generated('fish-salad');
  if (product.category === 'chicken') return generated('chicken-salad');
  if (product.category === 'eggs') return generated(name.includes('omelette') ? 'omelette' : /bhurji|scrambled/.test(name) ? 'egg-bhurji' : 'egg-salad');
  if (product.category === 'veg-salads') {
    if (name.includes('paneer') || name.includes('creamy')) return 'paneer-bowl';
    if (name.includes('tofu')) return generated('tofu-chickpea');
    if (name.includes('sprout')) return generated('sprouts');
    if (name.includes('potato')) return generated('potato-salad');
    if (name.includes('poha')) return generated('poha-salad');
    return generated('veg-salad');
  }
  if (product.category === 'rice') {
    if (name.includes('chicken')) return 'chicken-rice-bowl';
    if (product.diet === 'egg') return generated('rice-egg');
    return generated(name.includes('paneer') ? 'rice-veg' : 'rice-vegetable');
  }
  if (product.category === 'fried-rice') return generated(name.includes('chicken') ? 'fried-rice-chicken' : 'fried-rice-veg');
  if (product.category === 'pizza') return generated(name.includes('paneer') ? 'pizza' : 'pizza-cheese');
  if (product.category === 'burgers') return generated(name.includes('chicken') ? 'burger-chicken' : 'burger-veg');
  if (product.category === 'fries') return generated('fries');
  if (product.category === 'sandwiches') return generated('sandwich');
  if (product.category === 'drinks') {
    if (name.includes('coffee')) return generated('cold-coffee');
    if (name.includes('strawberry')) return generated('shake-strawberry');
    if (name.includes('choco')) return generated('shake-chocolate');
    return generated('shake-plain');
  }
  if (product.category === 'starters') {
    if (name.includes('momos')) return generated('momos');
    if (name.includes('roll') || name.includes('platter')) return generated('spring-rolls');
    if (name.includes('chicken')) return generated('chilli-chicken');
    if (name.includes('mushroom')) return generated('mushroom');
    if (name.includes('paneer')) return generated('chilli-paneer');
    if (name.includes('potato')) return generated('chilli-potato');
    if (name.includes('chaap')) return generated('soya-chaap');
    return generated('manchurian');
  }
  return generated('veg-salad');
}
