import { Section } from '@/components/layout/Section';
import { TrustStats } from '@/components/sections/TrustStats';
import type { WorkCopy } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';

/**
 * Work (CLAUDE.md §5.3). Text/images removed per client instruction (§8 decision log) —
 * heading, intro and the social-proof stats only now.
 */
export function WorkSection({ id, dict }: { id: string; dict: WorkCopy; lang: Locale }) {
  return (
    <Section id={id} labelledBy="work-title">
      <h2 id="work-title" className="display-type text-aquifer text-2xl">
        {dict.heading}
      </h2>

      <p className="max-w-measure mt-5 text-lg">{dict.intro}</p>

      <TrustStats dict={dict.trust} />
    </Section>
  );
}
