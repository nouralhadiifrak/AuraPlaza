# Assemble un dossier client en un seul fichier HTML autonome (aperçu à partager)
# Usage : python3 tools/apercu-fichier-unique.py clients/aura-plaza aura-plaza-apercu.html
# Facultatif : le site fonctionne sans cette étape. Sert à envoyer un aperçu (un seul fichier) par WhatsApp ou e-mail.
import sys, os, json, base64, mimetypes
src, out = sys.argv[1], sys.argv[2]
r = lambda f: open(os.path.join(src, f), encoding='utf-8').read()
cfg = r('config.js')
assets = {}
for f in sorted(os.listdir(os.path.join(src, 'images'))):
    if f.startswith('.') or f not in cfg: continue
    mt = mimetypes.guess_type(f)[0] or 'application/octet-stream'
    assets[f] = 'data:%s;base64,%s' % (mt, base64.b64encode(open(os.path.join(src, 'images', f), 'rb').read()).decode())
html = r('index.html')
for a, b in [('<link rel="stylesheet" href="style.css">', '<style>\n' + r('style.css') + '\n</style>'),
             ('<script src="config.js"></script>', '<script>\n' + cfg + '\nwindow.SITE_ASSETS = ' + json.dumps(assets) + ';\n</script>'),
             ('<script src="script.js"></script>', '<script>\n' + r('script.js') + '\n</script>')]:
    assert a in html; html = html.replace(a, b)
open(out, 'w', encoding='utf-8').write(html)
print(os.path.basename(out), len(html) // 1024, 'KB', list(assets))
