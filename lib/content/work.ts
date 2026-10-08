import type { StaticImageData } from 'next/image';

import boringRigStreet from '@/lib/images/1.jpg';
import boringRigPlot from '@/lib/images/2.jpg';
import boringCrewDrillString from '@/lib/images/3.jpg';

import type { LocalizedText } from './business';
import type { ServiceId } from './types';

export interface WorkItem {
  id: string;
  category: ServiceId;
  /**
   * Static import, so Next generates width, height and a blur placeholder at build
   * time (CLAUDE.md §7.5).
   */
  image: StaticImageData;
  alt: LocalizedText;
  /** Service + area + one concrete detail (depth, pump type, room), per CLAUDE.md §6.3. */
  caption: LocalizedText;
}

/**
 * Gallery items, from the client's own photos in lib/images.
 *
 * TODO(client): §6.3 wants each caption to name the area and one concrete fact (depth,
 * pipe size, year). None of that is known for these three photos, and §0 forbids
 * inventing it, so the captions describe only what is visibly in the frame. Ask the
 * client for the area and depth of each job and extend the captions then.
 *
 * TODO(client): 1.jpg is 194x259, far below the ≤2400px long edge these are meant to
 * be. It will look soft wherever it is shown large. Ask for the original.
 *
 * Only boring photos exist so far; the gallery shows a filter chip per category that
 * actually has items, so no chip leads to an empty grid.
 *
 * Before adding more: written permission from the client for each photo (§3.8), EXIF
 * location stripped, long edge ≤ 2400px.
 */
export const workItems: readonly WorkItem[] = [
  {
    id: 'boring-crew-drill-string',
    category: 'boring',
    image: boringCrewDrillString,
    alt: {
      en: 'Four men working the drill string at a bore head mounted on a concrete base',
      ur: 'چار آدمی کنکریٹ کی بنیاد پر لگے بور ہیڈ پر ڈرل سٹرنگ کا کام کر رہے ہیں',
    },
    caption: {
      en: 'Water boring in progress: the crew turning the drill string at the bore head.',
      ur: 'پانی کی بورنگ جاری ہے: ہماری ٹیم بور ہیڈ پر ڈرل سٹرنگ گھما رہی ہے۔',
    },
  },
  {
    id: 'boring-rig-plot',
    category: 'boring',
    image: boringRigPlot,
    alt: {
      en: 'Boring rig with a diesel engine set up on an open plot, with the crew at the pipe',
      ur: 'کھلے پلاٹ پر ڈیزل انجن کے ساتھ لگی بورنگ مشین، ساتھ ٹیم پائپ پر موجود ہے',
    },
    caption: {
      en: 'New bore on an open plot: the rig and diesel engine set up over the bore.',
      ur: 'کھلے پلاٹ پر نئی بورنگ: بور کے اوپر مشین اور ڈیزل انجن لگا ہوا ہے۔',
    },
  },
  {
    id: 'boring-rig-street',
    category: 'boring',
    image: boringRigStreet,
    alt: {
      en: 'Tripod boring rig standing over a bore at a street-side site, with pipe laid out alongside',
      ur: 'سڑک کنارے بور کے اوپر کھڑی تپائی والی بورنگ مشین، ساتھ پائپ رکھا ہوا ہے',
    },
    caption: {
      en: 'Boring at a street-side site, with the bore pipe laid out ready to go in.',
      ur: 'سڑک کنارے بورنگ، ساتھ بورنگ کا پائپ ڈالنے کے لیے تیار رکھا ہے۔',
    },
  },
];

/** Items rendered before "Show more work" (CLAUDE.md §5.3). */
export const workPreviewCount = 6;
