import { business } from './business';
import type { ServiceId } from './types';

/**
 * Keyword clusters from CLAUDE.md §6.3. These brief the copy; they are never rendered
 * as a list, stuffed into a page, or hidden in markup. Each cluster names the one place
 * its primary term belongs, so a reviewer can check the term is actually there.
 */
export type KeywordCluster = {
  id: ServiceId | 'brand';
  /** Where the primary term must appear. */
  placement: string;
  primary: { en: string[]; ur: string[] };
  secondary: { en: string[]; ur: string[] };
  /** As customers actually type it into Google. */
  romanUrdu: string[];
};

const city = business.address.city;

export const keywordClusters: readonly KeywordCluster[] = [
  {
    id: 'boring',
    placement: 'Services row "Water boring", About process, Work captions (Boring)',
    primary: {
      en: [`water boring service in ${city.en}`, `boring contractor in ${city.en}`],
      ur: ['پانی کی بورنگ', 'بورنگ کا کام'],
    },
    secondary: {
      en: [
        'tubewell boring',
        'deep water boring',
        'borehole drilling',
        're-boring',
        'boring plant installation',
        'water boring cost per foot',
      ],
      ur: ['ٹیوب ویل', 'گہری بورنگ', 'بورنگ کا ریٹ'],
    },
    romanUrdu: ['pani ki boring', 'boring wala', 'boring ka kaam', 'tubewell lagwana'],
  },
  {
    id: 'pumps',
    placement: 'Services row "Pumps and motors", Work captions (Pumps)',
    primary: {
      en: [`water pump shop in ${city.en}`, 'submersible pump installation'],
      ur: ['پانی کی موٹر', 'واٹر پمپ'],
    },
    secondary: {
      en: [
        'water motor price',
        'donkey pump',
        'pressure pump for home',
        'solar water pump',
        'monoblock pump',
        'motor repair and fitting',
      ],
      ur: ['ڈونکی پمپ', 'سب مرسیبل پمپ', 'پریشر پمپ', 'سولر واٹر پمپ'],
    },
    romanUrdu: ['pani ki motor', 'donkey pump price', 'submersible motor', 'solar pump lagwana'],
  },
  {
    id: 'sanitary',
    placement: 'Services row "Sanitary installation", Work captions (Sanitary)',
    primary: {
      en: [`sanitary fitting in ${city.en}`, 'bathroom fittings installation'],
      ur: ['سینیٹری فٹنگ', 'باتھ روم فٹنگ'],
    },
    secondary: {
      en: [
        'sanitary ware shop',
        'washroom renovation',
        'water tank installation',
        'geyser fitting',
        'kitchen sink fitting',
      ],
      ur: ['سینیٹری کا سامان', 'پانی کی ٹینکی', 'گیزر فٹنگ'],
    },
    romanUrdu: ['sanitary ka kaam', 'bathroom fitting', 'tanki fitting'],
  },
  {
    id: 'plumbing',
    placement: 'Services row "Plumbing repairs", FAQ',
    primary: {
      en: [`plumber in ${city.en}`, 'plumbing repair near me'],
      ur: ['پلمبر', 'پلمبنگ کا کام'],
    },
    secondary: {
      en: [
        'pipe leakage repair',
        'water line repair',
        'drain blockage',
        'PPR pipe fitting',
        'low water pressure fix',
      ],
      ur: ['پائپ لیکیج', 'پانی کی لائن', 'نالی بند'],
    },
    romanUrdu: ['plumber chahiye', 'pipe leakage', 'nali band'],
  },
  {
    id: 'brand',
    placement: 'Page title, footer, JSON-LD',
    primary: {
      en: ['Mian Salamat boring', 'Mian Salamat sanitary'],
      ur: ['میاں سلامت بورنگ', 'میاں سلامت سینیٹری'],
    },
    secondary: {
      en: [`boring and sanitary house ${city.en}`],
      ur: [`بورنگ اینڈ سینیٹری ہاؤس ${city.ur}`],
    },
    // Service area names belong here too, once business.serviceAreas is confirmed.
    romanUrdu: [],
  },
];
