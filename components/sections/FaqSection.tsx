import { Section } from '@/components/layout/Section';
import type { FaqCopy } from '@/lib/content/types';

/**
 * FAQ. CLAUDE.md §6.6 requires the questions to stay on the page for users, so they are
 * rendered here rather than only feeding rich results (which §6.6 says not to rely on).
 *
 * Native <details> keeps every answer in the DOM for crawlers and works with no
 * JavaScript, so no accordion state is needed.
 */
export function FaqSection({ id, dict }: { id: string; dict: FaqCopy }) {
  return (
    <Section id={id} labelledBy="faq-title" surface="mist">
      <h2 id="faq-title" className="display-type text-aquifer text-2xl">
        {dict.heading}
      </h2>

      <div className="border-galvanized/40 mt-10 border-t">
        {dict.items.map((item) => (
          <details key={item.q} className="group border-galvanized/40 border-b">
            <summary className="text-aquifer flex min-h-11 cursor-pointer items-center justify-between gap-4 py-5 text-base font-medium">
              <span className="max-w-measure">{item.q}</span>
              <span
                aria-hidden
                className="text-brass shrink-0 text-xl transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-measure pb-6 text-base">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
