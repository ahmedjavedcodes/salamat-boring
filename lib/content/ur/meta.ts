import { business } from '../business';
import type { PageMeta } from '../types';

const city = business.address.city.ur;

export const meta = {
  title: `${city} میں پانی کی بورنگ اور سینیٹری کا کام | میاں سلامت`,
  description: `${city} میں پانی کی بورنگ، سب مرسیبل اور سولر پمپ کی فٹنگ، سینیٹری فٹنگ اور پلمبنگ کی مرمت۔ اندازہ لینے کے لیے میاں سلامت کو واٹس ایپ پر پیغام بھیجیں۔`,
  ogTitle: `میاں سلامت بورنگ اینڈ سینیٹری ہاؤس، ${city}`,
  ogDescription:
    'بورنگ، پمپ اور موٹر، سینیٹری فٹنگ اور پلمبنگ۔ ہمارا کام دیکھیں اور واٹس ایپ پر پیغام بھیجیں۔',
  ogImageAlt: 'بورنگ کے کراس سیکشن کی تصویر، ساتھ میاں سلامت کا نام',
} satisfies PageMeta;
