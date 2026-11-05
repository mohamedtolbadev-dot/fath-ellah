/* FATHIUM - settings: prices, WhatsApp number, ingredients */
const SINGLE=239, BUNDLE=399, JARS=2;
const SINGLE_DELIVERY_FEE=null; // رقم (مثلاً 30) عند تحديد ثمن التوصيل؛ null = يُحدد قبل التأكيد
const WHATSAPP='212698818972';              // رقم واتساب بالصيغة الدولية بلا + (مثال: 2126XXXXXXXX)؛ فارغ = الزر مخفي
const ORDER_ENDPOINT='https://script.google.com/macros/s/AKfycbw2r-SZ--hf5J9uAEi904s01Wt4qXIGqZhV9OhYe8oUuvQz9ZdEDCaDPOR83eOCVQ_QXg/exec';      // رابط Web App ديال Google Apps Script (كيسالي بـ /exec). شوف google-sheet/Code.gs
/* Meta Pixel: حط الـ Pixel ID (أرقام فقط، 15-16 رقم) من Meta Events Manager؛ فارغ = التتبع مطفي */
const META_PIXEL_ID='1457671739762412';
const META_CURRENCY='MAD';
const META_ORDER_EVENT='Lead';   // الحدث ملي كيتبعت الطلب بنجاح: 'Lead' ولا 'Purchase'
/* TikTok Pixel: حط الـ Pixel ID من TikTok Events Manager (حروف كبيرة + أرقام، مثال: C1ABCDEF2GHIJKL3MNOP)؛ فارغ = التتبع مطفي */
const TIKTOK_PIXEL_ID='DBJT593C77UCRTSK06F0';
const TIKTOK_ORDER_EVENT='PlaceAnOrder';   // الحدث ملي كيتبعت الطلب بنجاح: 'PlaceAnOrder' ولا 'CompletePayment' ولا 'SubmitForm'
const ING=['بتيكولا','بذور الأكبي','الصويا','بذور الكتان','اللوز','الفول السوداني','بذور اليقطين','كيجليا','الماكا','حب العزيز','الفصة','بذور الفصة','الحمص','العدس الأحمر','حبوب اللقاح','العكبر'];