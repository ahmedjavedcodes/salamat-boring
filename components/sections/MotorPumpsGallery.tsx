import Image from 'next/image';

import { motorPumpItems } from '@/lib/content/motorPumps';
import type { Locale } from '@/lib/i18n/config';

/**
 * Motor Pumps subsection, nested under Services (CLAUDE.md §8 decision log).
 *
 * Each photo sits in a fixed-height box with `object-contain`, not `object-cover`: the
 * crucial requirement here is the full, original image showing with no cropping,
 * stretching or distortion, so the box letterboxes instead of filling edge-to-edge.
 * No interactivity needed, so this stays a Server Component.
 */
export function MotorPumpsGallery({ lang }: { lang: Locale }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
      {motorPumpItems.map((item) => (
        <li key={item.id} className="flex flex-col gap-3">
          <div className="rounded-media flex h-40 items-center justify-center overflow-hidden sm:h-48">
            <Image
              src={item.image}
              alt={item.alt[lang]}
              sizes="(min-width: 640px) 25vw, 50vw"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="text-start text-sm font-medium text-aquifer">
            <bdi dir="ltr">{item.label}</bdi>
          </p>
        </li>
      ))}
    </ul>
  );
}
