import type { WorkCopy } from '../types';

export const work = {
  heading: 'ہمارا حالیہ کام',
  intro: 'پانی کی بورنگ، پمپ و موٹر کی فروخت، سینیٹری فٹنگ اور پلمبنگ کے مکمل کیے گئے کام۔',
  trust: {
    heading: 'ہمارے گاہک',
    lead: 'ہم نے شہر بھر میں بہت سے گاہکوں کا کام کیا ہے، نئے پلاٹوں پر بھی اور بنے ہوئے گھروں میں بھی۔',
    customersServed: '{count}+ گاہک',
    satisfactionPercent: '{count}% گاہکوں کی اطمینان',
    yearsActive: '{count} سال کا تجربہ',
    projectsCompleted: '{count} کامیاب پراجیکٹس',
  },
  filterLabel: 'کام کی قسم چنیں',
  filters: [
    { id: 'all', label: 'سب' },
    { id: 'boring', label: 'پانی کی بورنگ' },
    { id: 'pumps', label: 'پمپ اور موٹر' },
    { id: 'sanitary', label: 'سینیٹری' },
    { id: 'plumbing', label: 'پلمبنگ' },
  ],
  showMore: 'مزید کام دیکھیں',
  empty: {
    title: 'تصاویر شامل کی جا رہی ہیں',
    body: 'ہم اپنے کام کی تصاویر جمع کر رہے ہیں۔ تب تک واٹس ایپ پر پیغام بھیج کر اپنے کام کے بارے میں پوچھ لیں۔',
    cta: 'واٹس ایپ پر پیغام بھیجیں',
    whatsappMessage:
      'السلام علیکم۔ میں نے آپ کی ویب سائٹ دیکھی ہے۔ مجھے ایسے ہی ایک کام کے بارے میں پوچھنا ہے۔',
  },
  lightbox: {
    label: 'کام کی تصویر',
    close: 'بند کریں',
    previous: 'پچھلی تصویر',
    next: 'اگلی تصویر',
    counter: '{total} میں سے {current}',
    open: 'تصویر کھولیں',
  },
} satisfies WorkCopy;
