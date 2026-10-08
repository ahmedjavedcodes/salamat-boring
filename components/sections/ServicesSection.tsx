import { WhatsAppIcon } from '@/components/illustrations/icons';
import { Section } from '@/components/layout/Section';
import { WhatsAppLink } from '@/components/whatsapp/WhatsAppLink';
import type { Dictionary } from '@/lib/content/types';

/**
 * A ruled list, not a card grid (CLAUDE.md §5.3, §3.7). Each row names the service,
 * says in one sentence what it is, lists the jobs people actually ask for, and offers a
 * WhatsApp action carrying that service's own prefilled message.
 */
export function ServicesSection({ id, dict }: { id: string; dict: Dictionary['services'] }) {
  return (
    <Section id={id} labelledBy="services-title">
      <h2 id="services-title" className="display-type text-aquifer text-2xl">
        {dict.heading}
      </h2>
      <p className="max-w-measure mt-5 text-lg">{dict.intro}</p>

      <ul className="border-galvanized/40 mt-14 border-t">
        {dict.items.map((item) => (
          <li
            key={item.id}
            className="border-galvanized/40 border-b py-10 lg:grid lg:grid-cols-12 lg:gap-8"
          >
            <h3 className="display-type text-aquifer text-xl lg:col-span-4">{item.name}</h3>

            <div className="lg:col-span-8">
              <p className="max-w-measure mt-4 text-base lg:mt-0">{item.summary}</p>

              <ul className="mt-6 flex flex-col gap-2">
                {item.jobs.map((job) => (
                  <li key={job} className="flex items-start gap-3 text-base">
                    <span aria-hidden className="bg-brass mt-3.5 h-px w-4 shrink-0" />
                    <span className="max-w-measure">{job}</span>
                  </li>
                ))}
              </ul>

              <WhatsAppLink
                appearance="inline"
                message={item.whatsappMessage}
                source={item.id}
                className="mt-6"
              >
                <WhatsAppIcon className="shrink-0" />
                <span>{dict.askLabel}</span>
              </WhatsAppLink>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
