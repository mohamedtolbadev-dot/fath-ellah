# FATHIUM Herbal Protein - صفحة هبوط

صفحة هبوط بالدارجة (RTL) لمنتوج بروثين رشاقة من FATHIUM. HTML + Tailwind CSS + JavaScript عادي، بلا framework.

## هيكل المشروع

```
fathium-landing/
├── index.html              ← الصفحة (المحتوى فقط)
├── css/
│   ├── tailwind.css        ← Tailwind مترجم (ما تعدلوش بيدك)
│   └── style.css           ← التصميم المخصص: الألوان، الأزرار، الفورم، الحركات
├── js/
│   ├── config.js           ← الإعدادات: الأثمنة، رقم واتساب، المكونات، المدن
│   ├── main.js             ← منطق الطلب: العرض، الكمية، المجموع، التحقق
│   └── animations.js       ← الحركات: تسلسل الـ Hero، ظهور العناصر عند السكرول
├── images/                 ← الصور (شوف images/README.md للأسماء والمقاسات)
├── src/
│   └── input.css           ← مدخل Tailwind
├── tailwind.config.js      ← ألوان Tailwind (brand, gold, deep, surface, ...)
└── package.json            ← أوامر البناء
```

ترتيب تحميل الملفات: `tailwind.css` ثم `style.css`، وفالأخير `config.js` ثم `main.js` ثم `animations.js`. الترتيب مهم لأن الملفات كتتقاسم نفس المتغيرات.

## التشغيل

ما كاين حتى build ضروري. فتح `index.html` مباشرة، أو استعمل سيرفر محلي:

```bash
npx serve .
```

## التعديلات الشائعة

- **الأثمنة ورقم واتساب:** `js/config.js` (`SINGLE` و`BUNDLE` و`WHATSAPP` و`SINGLE_DELIVERY_FEE`).
  إلا بدلتي الأثمنة، بدلها حتى فـ `index.html` (النصوص المكتوبة بيدك).
- **لائحة المكونات والمدن:** `js/config.js` (`ING` و`CITIES`).
- **الألوان:** المتغيرات فأول `css/style.css` (`:root`) وألوان Tailwind فـ `tailwind.config.js`. بدلهم مع بعض باش يبقاو متطابقين.
- **ربط الطلبات:** `ORDER_ENDPOINT` فـ `js/config.js`، والكود اللي كيرسل خاصو يتزاد فـ `js/main.js` (معلّم بـ TODO). دابا الصفحة كتتحقق من المعلومات غير محلياً وما كترسل والو.

## إعادة بناء Tailwind (اختياري)

كل ما زدتي كلاس Tailwind جديد فـ `index.html` أو `js/`، عاود البناء:

```bash
npm install
npm run build      # كيكتب css/tailwind.css
npm run watch      # بناء تلقائي أثناء التعديل
```

## النشر

المجلد كامل static. تقدر ترفعو على Vercel أو Netlify أو أي استضافة (اسحب المجلد كما هو، بلا `node_modules`).
