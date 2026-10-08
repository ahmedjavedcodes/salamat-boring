import { Section } from '@/components/layout/Section';
import type { AboutCopy } from '@/lib/content/types';

/**
 * About (CLAUDE.md §5.3). The boring process is a real sequence, so it is the one place
 * numbered markers are allowed (§3.7); the numbers are brass and aria-hidden, since the
 * ordered list already conveys the order.
 *
 * There is no trust-facts block: years in business and project counts are TODO(client),
 * and §5.3 says omit rather than invent.
 */
export function AboutSection({ id, dict }: { id: string; dict: AboutCopy }) {
  return (
    <Section id={id} labelledBy="about-title" surface="mist">
      <h2 id="about-title" className="display-type text-aquifer text-2xl">
        {dict.heading}
      </h2>

      <div className="max-w-measure mt-6 flex flex-col gap-5 text-lg">
        {dict.story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <h3 className="display-type text-aquifer mt-16 text-xl">{dict.processHeading}</h3>

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
