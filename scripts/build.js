import {mkdir,cp,readdir,writeFile,readFile,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const folder of ['assets','css','js'])await cp(folder,`dist/${folder}`,{recursive:true,filter:src=>!src.endsWith('chicken-hero.png')&&!src.endsWith('.md')});
const pages=(await readdir('.')).filter(file=>file.endsWith('.html'));
const origin=process.env.SITE_URL?.replace(/\/$/,'');
if(origin&&!/^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(origin))throw new Error('SITE_URL must be an HTTPS origin, e.g. https://your-domain.com');
for(const file of pages){let html=await readFile(file,'utf8');if(origin)html=html.replace('</head>',`<link rel="canonical" href="${origin}/${file==='index.html'?'':file}"><meta property="og:url" content="${origin}/${file==='index.html'?'':file}"><meta property="og:image" content="${origin}/assets/images/chicken-hero.jpg"></head>`);await writeFile(`dist/${file}`,html);}
await cp('robots.txt','dist/robots.txt');
await cp('sitemap.xml','dist/sitemap.xml');
if(origin){const urls=pages.filter(p=>p!=='meal-details.html').map(file=>`${origin}/${file==='index.html'?'':file}`);for(const {products} of [await import('../js/data.js')])for(const p of products)urls.push(`${origin}/meal-details.html?id=${p.id}`);await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${url}</loc></url>`).join('')}</urlset>\n`);await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);}console.log(`Built ${pages.length} pages in dist/. ${origin?'Canonical URLs and sitemap configured.':'Preview is excluded from crawling; set SITE_URL after business approval.'}`);
