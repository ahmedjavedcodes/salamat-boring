import type { SectionId } from '@/lib/i18n/paths';

export type ServiceId = 'boring' | 'pumps' | 'sanitary' | 'plumbing';

export interface ServiceItem {
  id: ServiceId;
  name: string;
  summary: string; // one sentence, plain language
  jobs: string[]; // 3–5 typical jobs
  whatsappMessage: string; // prefilled, mentions the service
  imageAlt: string;
}

export interface PageMeta {
  title: string; // ≤ 60 chars
  description: string; // 140–160 chars
  ogTitle: string;
  ogDescription: string;
  ogImageAlt: string;
}

export interface NavItem {
  id: Exclude<SectionId, 'home'>;
  label: string;
}

export interface CommonCopy {
  skipToContent: string;
  brand: { nameShort: string; homeLabel: string };
  nav: {
    label: string;
    items: NavItem[];
    openMenu: string;
    closeMenu: string;
    menuHeading: string;
  };
  actions: { call: string; whatsapp: string; email: string };
  whatsapp: { label: string; defaultMessage: string };
  languageToggle: { label: string };
  languagePrompt: {
    titleEn: string;
    titleUr: string;
    chooseEnglish: string;
    chooseUrdu: string;
    close: string;
  };
  footer: {
    addressHeading: string;
    contactHeading: string;
    elsewhereHeading: string;
    facebook: string;
    /** `{year}` */
    copyright: string;
  };
  errorPage: { title: string; body: string; retry: string };
  notFoundPage: { title: string; body: string; home: string };
}

export interface HeroCopy {
  title: string;
  support: string;
  whatsappCta: string;
  whatsappMessage: string;
  callCta: string;
  /** Rendered only when business.serviceAreas is non-empty (CLAUDE.md §1.6). */
  areasLabel: string;
  illustration: {
    title: string;
    description: string;
    layers: { topsoil: string; clay: string; sand: string; water: string };
    pipe: string;
  };
}

export interface ProcessStep {
  title: string;
  detail: string;
}

export interface AboutCopy {
  heading: string;
  story: string[];
  processHeading: string;
  process: ProcessStep[];
}

export interface WorkCopy {
  heading: string;
  intro: string;
  filterLabel: string;
  filters: { id: 'all' | ServiceId; label: string }[];
  showMore: string;
  empty: { title: string; body: string; cta: string; whatsappMessage: string };
  lightbox: {
    label: string;
    close: string;
    previous: string;
    next: string;
    /** `{current}`, `{total}` */
    counter: string;
    open: string;
  };
}

export interface FieldCopy {
  label: string;
  placeholder: string;
  required?: string;
  invalid?: string;
  hint?: string;
}

export interface ContactFormCopy {
  heading: string;
  helper: string;
  submit: string;
  errorSummary: string;
  fields: {
    name: FieldCopy;
    area: FieldCopy;
    phone: FieldCopy;
    service: FieldCopy & { options: { value: ServiceId | 'other'; label: string }[] };
    details: FieldCopy;
  };
  /** `{name}`, `{area}`, `{phoneLine}`, `{service}`, `{details}` */
  messageTemplate: string;
  /** `{phone}` */
  phoneLineTemplate: string;
}

export interface ContactCopy {
  heading: string;
  intro: string;
  callLabel: string;
  whatsappLabel: string;
  whatsappMessage: string;
  emailLabel: string;
  addressHeading: string;
  hoursHeading: string;
  /** Rendered only when business.hours.alwaysOpen is true. */
  hoursAlwaysOpen: string;
  mapsLabel: string;
  form: ContactFormCopy;
}

export interface FaqCopy {
  heading: string;
  items: { q: string; a: string }[];
}

export interface Dictionary {
  meta: PageMeta;
  common: CommonCopy;
  hero: HeroCopy;
  services: {
    heading: string;
    intro: string;
    /** Per-row WhatsApp action, e.g. "Ask about this on WhatsApp" (§5.3). */
    askLabel: string;
    items: ServiceItem[];
  };
  about: AboutCopy;
  work: WorkCopy;
  contact: ContactCopy;
  faq: FaqCopy;
}
