/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand:   '#DDBE6F', // ذهبي فاتح: الأزرار، الأسعار، الروابط
        gold:    '#B89A55', // ذهبي: الحدود
        deep:    '#2A5A3A', // أخضر: خلفية الصفحة
        surface: '#224D31', // أخضر أغمق: البطاقات والهيدر والفوتر
        ink:     '#EAF1EC',
        mute:    '#B9CBC0', // نص ثانوي
        line:    '#4A7F5E', // فواصل
        leaf:    '#58B368', // دوائر الـ check
      },
    },
  },
  plugins: [],
};
