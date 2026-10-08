import { AnimatedNumber } from '@/components/sections/AnimatedNumber';
import { business } from '@/lib/content/business';
import type { TrustCopy } from '@/lib/content/types';
import { fill } from '@/lib/utils/format';

/**
 * Social proof, shown in the Work section (CLAUDE.md §8 decision log).
 *
 * Every figure is read from business.trust, and a line is rendered only when its
 * number is actually set — currently `VERIFY` (client-supplied, not yet backed by
 * paperwork), not `TODO(client)` (unknown). If a figure is ever withdrawn, set it back
 * to null in business.ts and its line disappears on its own; nothing here needs to
 * change.
 *
 * This component itself stays a Server Component; only the counted digits
 * (`AnimatedNumber`) are a client island, per §7.1's "push use client to the smallest
 * leaf."
 */
export function TrustStats({ dict }: { dict: TrustCopy }) {
  const stats = [
    { key: 'customers', value: business.trust.customersServed, template: dict.customersServed },
    {
      key: 'satisfaction',
      value: business.trust.satisfactionPercent,
      template: dict.satisfactionPercent,
    },
    { key: 'years', value: business.trust.yearsActive, template: dict.yearsActive },
    {
      key: 'projects',
      value: business.trust.projectsCompleted,
      template: dict.projectsCompleted,
    },
  ].filter((stat): stat is typeof stat & { value: number } => stat.value !== null);

  return (
    <div className="border-galvanized/40 mt-10 border-t pt-10">
      <h3 className="text-ink/70 text-sm">{dict.heading}</h3>
      <p className="max-w-measure text-aquifer mt-3 text-lg">{dict.lead}</p>

      {stats.length > 0 ? (
        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const [value, ...rest] = fill(stat.template, { count: stat.value }).split(' ');
            const suffix = value?.replace(String(stat.value), '') ?? '';
            return (
              <div key={stat.key} className="flex flex-col gap-2">
                <dt className="display-type text-brass text-2xl">
                  <bdi dir="ltr">
                    <AnimatedNumber value={stat.value} suffix={suffix} />
                  </bdi>
                </dt>
                <dd className="text-base">{rest.join(' ')}</dd>
              </div>
            );
          })}
        </dl>
      ) : null}
    </div>
  );
}
