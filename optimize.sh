#!/usr/bin/env bash
# شغلو من جذر المشروع (فين كاين index.html و images/ و css/)
# المتطلبات: cwebp  (macOS: brew install webp | Ubuntu: sudo apt install webp)
set -e
mkdir -p backup && cp -n index.html backup/index.html.bak || true

# 1) تحويل التصاويس لـ WebP مع تصغير الأبعاد (الأصليات كتبقى jpg، ومهمة لـ og:image)
conv(){ f="$1"; w="$2"; cwebp -quiet -q 76 -resize "$w" 0 "$f" -o "${f%.*}.webp"; }
conv images/product.jpg   800
conv images/olive.jpg     900
conv images/lifestyle.jpg 700
conv images/model.jpg     900
conv images/usage-1.jpg   800
conv images/usage-2.jpg   800
conv images/ingredients.jpg 900
conv images/logo.jpg      160
for f in images/reviews/review-*.jp*g; do cwebp -quiet -q 72 -resize 560 0 "$f" -o "${f%.*}.webp"; done

# 2) تعويض المراجع فـ index.html و main.js (من غير og:image)
sed -i -E '/og:image/! s#(\./images/[A-Za-z0-9_/-]+)\.(jpg|jpeg)#\1.webp#g' index.html
sed -i -E 's#(\./images/[A-Za-z0-9_/-]+)\.(jpg|jpeg)#\1.webp#g' js/main.js 2>/dev/null || true

# 3) دمج CSS فـ <style> داخل الصفحة (كيحيد الـ render-blocking)
python3 - <<'PY'
import re
s=open('index.html',encoding='utf-8').read()
css=open('css/tailwind.css',encoding='utf-8').read()+"\n"+open('css/style.css',encoding='utf-8').read()
s=s.replace('<link rel="stylesheet" href="./css/tailwind.css">\n','').replace('<link rel="stylesheet" href="./css/style.css">','<style>'+css+'</style>')
open('index.html','w',encoding='utf-8').write(s)
PY
echo "تم. قارن الأحجام:"; du -h images/*.webp images/reviews/*.webp | sort -h
