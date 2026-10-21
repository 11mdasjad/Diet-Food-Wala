from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
root=Path(__file__).resolve().parent.parent
class Parser(HTMLParser):
 def __init__(self): super().__init__();self.refs=[];self.ids=set();self.h1=0;self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if 'id' in a:self.ids.add(a['id'])
  if tag=='img':self.images.append(a)
  for key in ('href','src'):
   if key in a:self.refs.append(a[key])
parsed={}
for p in root.glob('*.html'):
 parser=Parser();parser.feed(p.read_text());parsed[p.name]=parser
errors=[];count=0
for name,parser in parsed.items():
 if parser.h1!=1:errors.append(f'{name}: expected one H1, found {parser.h1}')
 for im in parser.images:
  if not im.get('alt'):errors.append(f'{name}: missing image alt')
 for ref in parser.refs:
  url=urlsplit(ref)
  if url.scheme or url.netloc:continue
  target=unquote(url.path) or name
  if not (root/target).exists():errors.append(f'{name}: missing {target}')
  if url.fragment and target in parsed and url.fragment not in parsed[target].ids:errors.append(f'{name}: missing anchor {ref}')
  count+=1
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: {len(parsed)} pages, {count} local references, all H1 and static image alt checks')
