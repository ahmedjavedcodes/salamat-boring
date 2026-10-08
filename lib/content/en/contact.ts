import type { ContactCopy } from '../types';

export const contact = {
  heading: 'Contact',
  intro: 'Call us, or send a WhatsApp message with what you need.',
  callLabel: 'Call now',
  whatsappLabel: 'Message us on WhatsApp',
  whatsappMessage: 'Assalam o alaikum. I found your website and I want to ask about a job.',
  emailLabel: 'Email us',
  addressHeading: 'Shop address',
  hoursHeading: 'Hours',
  hoursAlwaysOpen: 'Open 24 hours, every day',
  mapsLabel: 'Open in Google Maps',
  form: {
    heading: 'Send us the details',
    helper: 'This opens WhatsApp with your message ready to send.',
    submit: 'Send on WhatsApp',
    errorSummary: 'Check the highlighted fields and try again.',
    fields: {
      name: {
        label: 'Your name',
        placeholder: '',
        required: 'Enter your name.',
      },
      area: {
        label: 'Your area',
        placeholder: '',
        required: 'Enter your area or address.',
        hint: 'The area helps us tell you what the job will need.',
      },
      phone: {
        label: 'Phone number',
        placeholder: '',
        hint: 'Optional. Add it if you would rather we call you back.',
        invalid: 'Enter a phone number with 11 digits, like 03001234567.',
      },
      service: {
        label: 'What do you need?',
        placeholder: 'Choose a service',
        required: 'Choose a service.',
        options: [
          { value: 'boring', label: 'Water boring' },
          { value: 'pumps', label: 'Pumps and motors' },
          { value: 'sanitary', label: 'Sanitary installation' },
          { value: 'plumbing', label: 'Plumbing repairs' },
          { value: 'other', label: 'Something else' },
        ],
      },
      details: {
        label: 'Details',
        placeholder: '',
        required: 'Tell us briefly what you need.',
      },
    },
    messageTemplate: [
      'New enquiry from your website',
      '',
      'Name: {name}',
      'Area: {area}',
      '{phoneLine}',
      'Service: {service}',
      'Details: {details}',
    ].join('\n'),
    phoneLineTemplate: 'Phone: {phone}',
  },
} satisfies ContactCopy;
