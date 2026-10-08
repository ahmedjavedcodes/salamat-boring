import { business } from '../business';
import type { HeroCopy } from '../types';

const city = business.address.city.ur;

export const hero = {
  title: `${city} میں پانی کی بورنگ، پمپ اور سینیٹری فٹنگ`,
  support:
    'ہم نئی بورنگ کرتے ہیں، پمپ اور موٹر بیچتے اور لگاتے ہیں، اور باتھ روم، کچن اور پلمبنگ کا کام کرتے ہیں۔',
  whatsappCta: 'واٹس ایپ پر پیغام بھیجیں',
  whatsappMessage: `السلام علیکم۔ میں نے آپ کی ویب سائٹ دیکھی ہے۔ مجھے ${city} میں پانی کی بورنگ اور سینیٹری کے کام کے بارے میں پوچھنا ہے۔`,
  callCta: 'ابھی کال کریں',
  areasLabel: 'ہمارے کام کے علاقے',
  illustration: {
    title: 'بورنگ زمین میں پانی تک کیسے پہنچتی ہے',
    description:
      'زمین کا کراس سیکشن: اوپر مٹی، چکنی مٹی اور ریت، اور نیچے پانی والی تہ۔ ان کے درمیان سے بورنگ کا پائپ گزرتا ہے اور پانی والی تہ کے سامنے فلٹر لگا ہوتا ہے۔',
    layers: {
      topsoil: 'اوپر کی مٹی',
      clay: 'چکنی مٹی',
      sand: 'ریت',
      water: 'پانی والی تہ',
    },
    pipe: 'بورنگ کا پائپ',
  },
} satisfies HeroCopy;
