const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, '..', 'presentation', 'src', 'slides');
const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(slidesDir, f), 'utf8');
  const matches = content.matchAll(/<pre[^>]*><code>([\s\S]*?)<\/code><\/pre>/g);
  for (const m of matches) {
    console.log(`\n=== File: ${f} ===`);
    const raw = m[1].replace(/<[^>]+>/g, '').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
    const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
    const lengths = lines.map(l => l.length);
    const max = Math.max(...lengths);
    const min = Math.min(...lengths);
    if (min !== max) {
      console.warn(`  ⚠️ MISMATCH (min=${min}, max=${max}) in ${f}:`);
      lines.forEach((l, idx) => {
        console.log(`  [${l.length}] ${l}`);
      });
    } else {
      console.log(`  ✓ Perfect alignment (${min} chars)`);
    }
  }
});
