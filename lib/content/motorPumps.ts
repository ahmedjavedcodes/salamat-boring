import type { StaticImageData } from 'next/image';

import goldenDynamic from '@/lib/images/golden dynamic.png';
import goldenMonoPump from '@/lib/images/golden mono pump.png';
import goldenVacuumPump from '@/lib/images/golden vaccum pump.png';
import motor from '@/lib/images/motor.png';

import type { LocalizedText } from './business';

export interface MotorPumpItem {
  id: string;
  image: StaticImageData;
  /** Product/brand name, not translated — rendered in both locales via <bdi dir="ltr"> (§4.6). */
  label: string;
  alt: LocalizedText;
}

/**
 * Product photos for the Motor Pumps subsection under Services (CLAUDE.md §8).
 *
 * Labels are the client's own product names, supplied directly (same handling as the
 * Work-section trust figures: client-supplied, so VERIFY rather than invented — see
 * business.pumpBrands, now holding "Golden" on the same basis).
 */
export const motorPumpItems: readonly MotorPumpItem[] = [
  {
    id: 'golden-dynamic',
    image: goldenDynamic,
    label: 'Golden Dynamic',
    alt: {
      en: 'Golden Dynamic water pump',
      ur: 'گولڈن ڈائنامک واٹر پمپ',
    },
  },
  {
    id: 'golden-mono-pump',
    image: goldenMonoPump,
    label: 'Golden Mono Pump',
    alt: {
      en: 'Golden Mono Pump',
      ur: 'گولڈن مونو پمپ',
    },
  },
  {
    id: 'golden-vacuum-pump',
    image: goldenVacuumPump,
    label: 'Golden Vacuum Pump',
    alt: {
      en: 'Golden Vacuum Pump',
      ur: 'گولڈن ویکیوم پمپ',
    },
  },
  {
    id: 'motor',
    image: motor,
    label: 'Water Pump Motor',
    alt: {
      en: 'Water pump motor',
      ur: 'پانی کی پمپ موٹر',
    },
  },
];
