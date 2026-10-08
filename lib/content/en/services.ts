import { business } from '../business';
import type { ServiceItem } from '../types';

const city = business.address.city.en;
const intro = 'Assalam o alaikum. I found your website and I want to ask about';

export const services = {
  heading: 'Services',
  intro: 'What we do, and the jobs people usually call us for.',
  askLabel: 'Ask about this on WhatsApp',
  items: [
    {
      id: 'boring',
      name: 'Water boring',
      summary: 'New bores, deep boring and re-boring, including a complete water boring plant.',
      jobs: [
        'New bore for a house or an empty plot',
        'Deep boring where the water table has dropped',
        'Re-boring an old or failed bore',
        'Complete water boring plant installation',
        'Bore pipe and filter fitting',
      ],
      whatsappMessage: `${intro} water boring in ${city}.`,
      imageAlt: 'Boring rig drilling a new water bore',
    },
    {
      id: 'pumps',
      name: 'Pumps and motors',
      summary: 'We sell water pumps and motors, and we install them.',
      jobs: [
        'Submersible pump supply and installation',
        'Donkey (centrifugal) pump supply and fitting',
        'Pressure pump for homes with weak water pressure',
        'Solar water pump supply and setup',
        'Advice on the right pump size for your bore',
      ],
      whatsappMessage: `${intro} a water pump or motor.`,
      imageAlt: 'Submersible pump and pipe ready for installation',
    },
    {
      id: 'sanitary',
      name: 'Sanitary installation',
      summary: 'Bathroom and kitchen fittings, sanitary ware, water tanks and geysers.',
      jobs: [
        'Full bathroom fitting in new construction',
        'Sanitary ware supply and installation',
        'Water tank fitting on the roof or underground',
        'Geyser supply and fitting',
        'Kitchen sink and tap fitting',
      ],
      whatsappMessage: `${intro} sanitary fitting.`,
      imageAlt: 'Finished bathroom with newly fitted sanitary ware',
    },
    {
      id: 'plumbing',
      name: 'Plumbing repairs',
      summary: 'Leaks, new water lines, drainage and blockages.',
      jobs: [
        'Pipe leakage repair',
        'New water line for a house or an extension',
        'Drain and sewerage blockage clearing',
        'PPR pipe fitting and replacement',
        'Fixing low water pressure in the house',
      ],
      whatsappMessage: `${intro} a plumbing repair.`,
      imageAlt: 'Water line being fitted inside a wall',
    },
  ] satisfies ServiceItem[],
};
