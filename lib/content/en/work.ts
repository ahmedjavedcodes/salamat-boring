import type { WorkCopy } from '../types';

export const work = {
  heading: 'Recent work',
  intro: 'Water boring, pump and motor sales, sanitary fitting and plumbing jobs we have finished.',
  trust: {
    heading: 'Our customers',
    lead: 'We have worked for many customers across the city, on new plots and in finished homes.',
    customersServed: '{count}+ customers',
    satisfactionPercent: '{count}% customer satisfaction',
    yearsActive: '{count} years of experience',
    projectsCompleted: '{count} successful projects',
  },
  filterLabel: 'Filter work by service',
  filters: [
    { id: 'all', label: 'All' },
    { id: 'boring', label: 'Water boring' },
    { id: 'pumps', label: 'Pumps and motors' },
    { id: 'sanitary', label: 'Sanitary' },
    { id: 'plumbing', label: 'Plumbing' },
  ],
  showMore: 'Show more work',
  empty: {
    title: 'Photos are being added',
    body: 'We are putting our project photos together. Until then, message us on WhatsApp and ask about the kind of job you need.',
    cta: 'Message us on WhatsApp',
    whatsappMessage:
      'Assalam o alaikum. I found your website and I want to ask about a job like the ones you do.',
  },
  lightbox: {
    label: 'Work photo',
    close: 'Close',
    previous: 'Previous photo',
    next: 'Next photo',
    counter: '{current} of {total}',
    open: 'Open photo',
  },
} satisfies WorkCopy;
