// تشغيل من جذر المشروع:  npm i -D sharp   ثم   node optimize.mjs
// كيحول التصاويس لـ WebP (مع تصغير الأبعاد) وكيبدل المراجع فـ public/index.html.
// الأصليات (jpg) كتبقى كما هي، حيث og:image خاصو يبقى jpg.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PUB = 'public';
const IMG = path.join(PUB, 'images');
const widths = {
  'product.jpg': 800, 'olive.jpg': 900, 'lifestyle.jpg': 700, 'model.jpg': 900,
  'usage-1.jpg': 800, 'usage-2.jpg': 800, 'ingredients.jpg': 900, 'logo.jpg': 160,
};
const kb = f => (fs.statSync(f).size / 1024).toFixed(0) + ' KB';

const jobs = Object.entries(widths).map(([n, w]) => [path.join(IMG, n), w, 76]);
const rdir = path.join(IMG, 'reviews');
if (fs.existsSync(rdir))
  for (const n of fs.readdirSync(rdir).filter(n => /\.jpe?g$/i.test(n)))
    jobs.push([path.join(rdir, n), 560, 72]);

for (const [src, w, q] of jobs) {
  if (!fs.existsSync(src)) { console.warn('⚠ ما لقيتش', src); continue; }
  const out = src.replace(/\.jpe?g$/i, '.webp');
  await sharp(src).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: q }).toFile(out);
  console.log(path.relative(PUB, src).padEnd(26), kb(src).padStart(8), '→', kb(out).padStart(7));
}

// تعويض المراجع فـ index.html (من غير سطر og:image)، وغير إلا كان ملف webp كاين
const htmlPath = path.join(PUB, 'index.html');
fs.mkdirSync('backup', { recursive: true });
if (!fs.existsSync('backup/index.html.bak')) fs.copyFileSync(htmlPath, 'backup/index.html.bak');
let n = 0;
const html = fs.readFileSync(htmlPath, 'utf8').split('\n').map(line => {
  if (line.includes('og:image')) return line;
  return line.replace(/\.\/(images\/[A-Za-z0-9_\/-]+)\.(jpe?g)/gi, (m, p) => {
    if (fs.existsSync(path.join(PUB, p + '.webp'))) { n++; return './' + p + '.webp'; }
    return m;
  });
}).join('\n');
fs.writeFileSync(htmlPath, html);
console.log(`\n✔ بدلت ${n} مرجع فـ index.html (النسخة القديمة فـ backup/index.html.bak)`);
