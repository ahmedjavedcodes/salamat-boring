import Image from 'next/image';

import { Section } from '@/components/layout/Section';
import type { AboutCopy } from '@/lib/content/types';
import aboutPhoto from '@/lib/images/about.png';

/**
 * About (CLAUDE.md §5.3).
 *
 * The client's photo of a rig on an open plot sits beside the story. The borehole
 * cross-section illustration briefly lived here too, but reverted to its original home
 * in the hero (§3.1, §8 decision log), so this section is story, photo and process only.
 *
 * The boring process is a real sequence, so it is the one place numbered markers are
 * allowed (§3.7); the numbers are brass and aria-hidden, since the ordered list
 * already conveys the order.
 *
 * There is no "years in business" or project-count claim here: that social proof now
 * lives in the Work section (§8 decision log).
 */
export function AboutSection({ id, dict }: { id: string; dict: AboutCopy }) {
  return (
    <Section id={id} labelledBy="about-title" surface="mist">
      <h2 id="about-title" className="display-type text-aquifer text-2xl">
        {dict.heading}
      </h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="max-w-measure flex flex-col gap-5 text-lg lg:col-span-7">
          {dict.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="lg:col-span-5">
          <Image
            src={aboutPhoto}
            alt={dict.photoAlt}
            placeholder="blur"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="rounded-media h-auto w-full"
          />
        </div>
      </div>

      <h3 className="display-type text-aquifer mt-20 text-xl">{dict.processHeading}</h3>

      <ol className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {dict.process.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span aria-hidden className="display-type text-brass text-xl">
              {index + 1}
            </span>
            <div>
              <h4 className="text-aquifer text-base font-medium">{step.title}</h4>
              <p className="mt-2 text-base">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
