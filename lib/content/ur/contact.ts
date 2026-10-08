import type { ContactCopy } from '../types';

export const contact = {
  heading: 'رابطہ',
  intro: 'کال کریں، یا واٹس ایپ پر اپنی ضرورت لکھ کر بھیج دیں۔',
  callLabel: 'ابھی کال کریں',
  whatsappLabel: 'واٹس ایپ پر پیغام بھیجیں',
  whatsappMessage:
    'السلام علیکم۔ میں نے آپ کی ویب سائٹ دیکھی ہے۔ مجھے ایک کام کے بارے میں پوچھنا ہے۔',
  emailLabel: 'ای میل کریں',
  addressHeading: 'دکان کا پتہ',
  hoursHeading: 'اوقات',
  hoursAlwaysOpen: 'چوبیس گھنٹے، ہفتے کے ساتوں دن کھلے',
  mapsLabel: 'گوگل میپس میں کھولیں',
  form: {
    heading: 'تفصیل بھیجیں',
    helper: 'اس سے واٹس ایپ کھل جائے گا اور آپ کا پیغام بھیجنے کے لیے تیار ہوگا۔',
    submit: 'واٹس ایپ پر بھیجیں',
    errorSummary: 'نشان زدہ خانے درست کریں اور دوبارہ بھیجیں۔',
    fields: {
      name: {
        label: 'آپ کا نام',
        placeholder: '',
        required: 'اپنا نام لکھیں۔',
      },
      area: {
        label: 'آپ کا علاقہ',
        placeholder: '',
        required: 'اپنا علاقہ یا پتہ لکھیں۔',
        hint: 'علاقہ معلوم ہو تو ہم بہتر بتا سکتے ہیں کہ کام میں کیا لگے گا۔',
      },
      phone: {
        label: 'فون نمبر',
        placeholder: '',
        hint: 'اختیاری۔ اگر آپ چاہتے ہیں کہ ہم کال کریں تو نمبر لکھ دیں۔',
        invalid: 'گیارہ ہندسوں والا نمبر لکھیں، مثلاً 03001234567۔',
      },
      service: {
        label: 'آپ کو کیا کروانا ہے؟',
        placeholder: 'کام کی قسم چنیں',
        required: 'کام کی قسم چنیں۔',
        options: [
          { value: 'boring', label: 'پانی کی بورنگ' },
          { value: 'pumps', label: 'پمپ اور موٹر' },
          { value: 'sanitary', label: 'سینیٹری فٹنگ' },
          { value: 'plumbing', label: 'پلمبنگ کی مرمت' },
          { value: 'other', label: 'کوئی اور کام' },
        ],
      },
      details: {
        label: 'تفصیل',
        placeholder: '',
        required: 'مختصر لکھیں کہ آپ کو کیا کروانا ہے۔',
      },
    },
    messageTemplate: [
      'آپ کی ویب سائٹ سے نیا پیغام',
      '',
      'نام: {name}',
      'علاقہ: {area}',
      '{phoneLine}',
      'کام: {service}',
      'تفصیل: {details}',
    ].join('\n'),
    phoneLineTemplate: 'فون: {phone}',
  },
} satisfies ContactCopy;
