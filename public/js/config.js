/* FATHIUM - settings: prices, WhatsApp number, ingredients */
const SINGLE=299, BUNDLE=499, JARS=2;
const SINGLE_DELIVERY_FEE=null; // رقم (مثلاً 30) عند تحديد ثمن التوصيل؛ null = يُحدد قبل التأكيد
const WHATSAPP='212643299680';              // رقم واتساب بالصيغة الدولية بلا + (مثال: 2126XXXXXXXX)؛ فارغ = الزر مخفي
const ORDER_ENDPOINT='https://script.google.com/macros/s/AKfycbyGNPpuFKvL_nXJ86kaooIysLVNlP35txfgWVgm1hZAwWpyUXVCNjsrYEiIZMoQS6v7uA/exec';      // رابط Web App ديال Google Apps Script (كيسالي بـ /exec). شوف google-sheet/Code.gs
const ING=['بتيكولا','بذور الأكبي','الصويا','بذور الكتان','اللوز','الفول السوداني','بذور اليقطين','كيجليا','الماكا','حب العزيز','الفصة','بذور الفصة','الحمص','العدس الأحمر','حبوب اللقاح','العكبر'];