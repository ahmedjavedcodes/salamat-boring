import { business } from '../business';
import type { PageMeta } from '../types';

const city = business.address.city.ur;

export const meta = {
  title: `${city} میں پانی کی بورنگ، پمپ اور سینیٹری فٹنگ | میاں سلامت`,
  description: `${city} میں پانی کی بورنگ، واٹر پمپ کی فروخت اور تنصیب، سینیٹری ہاؤس فٹنگ اور پلمبنگ کی مرمت۔ اندازہ لینے کے لیے میاں سلامت بورنگ اینڈ موٹر پمپ کو واٹس ایپ پر پیغام بھیجیں۔`,
  ogTitle: `میاں سلامت بورنگ اینڈ موٹر پمپ، ${city}`,
  ogDescription:
    'پانی کی بورنگ، پمپ اور موٹر کی فروخت، سینیٹری فٹنگ اور پلمبنگ۔ ہمارا کام دیکھیں اور واٹس ایپ پر پیغام بھیجیں۔',
  ogImageAlt: 'بورنگ کے کراس سیکشن کی تصویر، ساتھ میاں سلامت بورنگ اینڈ موٹر پمپ کا نام',
} satisfies PageMeta;
