import { business } from '../business';
import type { CommonCopy } from '../types';

export const common = {
  skipToContent: 'Skip to main content',
  brand: {
    nameShort: 'Mian Salamat',
    homeLabel: `${business.name.en} — back to top`,
  },
  nav: {
    label: 'Sections',
    items: [
      { id: 'services', label: 'Services' },
      { id: 'about', label: 'About' },
      { id: 'work', label: 'Work' },
      { id: 'contact', label: 'Contact' },
    ],
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuHeading: 'Menu',
  },
  actions: {
    call: 'Call now',
    whatsapp: 'Message us on WhatsApp',
    email: 'Email us',
  },
  whatsapp: {
    label: 'Chat on WhatsApp',
    defaultMessage:
      'Assalam o alaikum. I found your website and I want to ask about boring and sanitary work.',
  },
  languageToggle: {
    label: 'Language',
  },
  languagePrompt: {
    titleEn: 'Choose your language',
    titleUr: 'اپنی زبان منتخب کریں',
    chooseEnglish: 'English',
    chooseUrdu: 'اردو',
    close: 'Close and continue in English',
  },
  footer: {
    addressHeading: 'Shop address',
    contactHeading: 'Contact',
    elsewhereHeading: 'Elsewhere',
    facebook: 'Facebook page',
    copyright: `© {year} ${business.name.en}`,
  },
  errorPage: {
    title: 'Something went wrong on this page',
    body: 'The page did not load properly. You can reload it, or reach us directly instead.',
    retry: 'Reload the page',
  },
  notFoundPage: {
    title: 'That page does not exist',
    body: 'The link may be old or mistyped. Everything we do is on the main page.',
    home: 'Go to the main page',
  },
} satisfies CommonCopy;
