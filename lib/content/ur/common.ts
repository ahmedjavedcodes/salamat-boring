import { business } from '../business';
import type { CommonCopy } from '../types';

export const common = {
  skipToContent: 'مرکزی مواد پر جائیں',
  brand: {
    nameShort: 'میاں سلامت بورنگ اینڈ موٹر پمپ',
    homeLabel: `${business.name.ur}، اوپر جائیں`,
  },
  nav: {
    label: 'صفحے کے حصے',
    items: [
      { id: 'services', label: 'خدمات' },
      { id: 'about', label: 'ہمارے بارے میں' },
      { id: 'work', label: 'ہمارا کام' },
      { id: 'contact', label: 'رابطہ' },
    ],
    openMenu: 'مینو کھولیں',
    closeMenu: 'مینو بند کریں',
    menuHeading: 'مینو',
  },
  actions: {
    call: 'ابھی کال کریں',
    whatsapp: 'واٹس ایپ پر پیغام بھیجیں',
    email: 'ای میل کریں',
  },
  whatsapp: {
    label: 'واٹس ایپ پر بات کریں',
    defaultMessage:
      'السلام علیکم۔ میں نے آپ کی ویب سائٹ دیکھی ہے۔ مجھے بورنگ اور سینیٹری کے کام کے بارے میں پوچھنا ہے۔',
  },
  languageToggle: {
    label: 'زبان',
  },
  languagePrompt: {
    titleEn: 'Choose your language',
    titleUr: 'اپنی زبان منتخب کریں',
    chooseEnglish: 'English',
    chooseUrdu: 'اردو',
    close: 'بند کریں اور انگریزی میں جاری رکھیں',
  },
  footer: {
    addressHeading: 'دکان کا پتہ',
    contactHeading: 'رابطہ',
    elsewhereHeading: 'اور کہیں',
    facebook: 'فیس بک پیج',
    copyright: `© {year} ${business.name.ur}`,
  },
  errorPage: {
    title: 'اس صفحے میں کوئی خرابی آ گئی ہے',
    body: 'صفحہ ٹھیک طرح نہیں کھلا۔ آپ دوبارہ کھول سکتے ہیں، یا سیدھا ہم سے رابطہ کر لیں۔',
    retry: 'صفحہ دوبارہ کھولیں',
  },
  notFoundPage: {
    title: 'یہ صفحہ موجود نہیں ہے',
    body: 'لنک پرانا ہو سکتا ہے یا لکھنے میں غلطی ہوئی ہے۔ ہمارا سارا کام مرکزی صفحے پر ہے۔',
    home: 'مرکزی صفحے پر جائیں',
  },
} satisfies CommonCopy;
