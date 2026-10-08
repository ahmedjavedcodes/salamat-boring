import type { StaticImageData } from 'next/image';
import type { LocalizedText } from './business';
import type { ServiceId } from './types';

export interface WorkItem {
  id: string;
  category: ServiceId;
  /**
   * Static import, e.g. `import bore01 from './work-images/bore-01.jpg'`, so Next
   * generates width, height and a blur placeholder at build time (CLAUDE.md §7.5).
   */
  image: StaticImageData;
  alt: LocalizedText;
  /** Service + area + one concrete detail (depth, pump type, room) — CLAUDE.md §6.3. */
  caption: LocalizedText;
}

/**
 * Gallery items. Empty until the client supplies photos.
 *
 * Before adding any item:
 *  - written permission from the client for that photo (CLAUDE.md §3.8);
 *  - EXIF location data stripped;
 *  - long edge ≤ 2400 px;
 *  - caption naming the service, the area and one concrete fact.
 *
 * While this is empty, WorkSection renders its empty state with a WhatsApp action
 * instead of a blank grid (CLAUDE.md §7.4), and no filter chips are shown.
 */
export const workItems: readonly WorkItem[] = [];

/** Items rendered before "Show more work" (CLAUDE.md §5.3). */
export const workPreviewCount = 6;
