// Demonstration catalogue only. Owner approval is required before publication.
export const products = [
 {id:'grilled-chicken-salad',name:'Grilled Chicken Salad',description:'Grilled chicken, fresh greens, avocado & seeds.',price:180,diet:'nonveg',categories:['salads','protein'],image:'chicken-hero',badge:'Signature pick',ingredients:'Chicken, mixed greens, avocado, cucumber, tomatoes and seeds.',allergens:'May contain sesame, egg, dairy or other allergens in dressing. Confirm the recipe.'},
 {id:'chicken-rice-bowl',name:'Chicken Rice Bowl',description:'Chicken, brown rice & colourful steamed vegetables.',price:200,diet:'nonveg',categories:['protein','balanced'],image:'chicken-rice-bowl',badge:'Protein favourite',ingredients:'Chicken, brown rice, broccoli, carrots and seasonal vegetables.',allergens:'Sauces may contain soy, wheat or sesame. Confirm the recipe.'},
 {id:'quinoa-veg-bowl',name:'Quinoa Veg Bowl',description:'Quinoa, mixed vegetables, chickpeas & fresh herbs.',price:160,diet:'veg',categories:['balanced'],image:'quinoa-bowl',badge:'Plant-powered',ingredients:'Quinoa, chickpeas, leafy greens, tomatoes and seasonal vegetables.',allergens:'Dressings may contain sesame or nuts. Confirm the recipe.'},
 {id:'paneer-salad',name:'Paneer Salad',description:'Paneer, crisp greens, cucumber & a light dressing.',price:150,diet:'veg',categories:['salads','protein'],image:'paneer-bowl',badge:'Fresh & colourful',ingredients:'Paneer, mixed greens, cucumber, tomatoes and dressing.',allergens:'Contains milk. Dressing ingredients and cross-contact need confirmation.'}
];
export const productById = id => products.find(product => product.id === id);
export const business = {phone:'+917529973199', whatsapp:'917529973199', whatsappVerified:false};
