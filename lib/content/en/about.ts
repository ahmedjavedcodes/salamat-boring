import { business } from '../business';
import type { AboutCopy } from '../types';

const street = business.address.street.en;
const city = business.address.city.en;

/**
 * TODO(client): the story below describes only what §1.1 of CLAUDE.md already states,
 * plus the confirmed years-active figure now in business.trust. Have the client read
 * and approve it, and have them add anything true that is missing.
 */
export const about = {
  heading: 'About Mian Salamat Boring & Motor Pump',
  story: [
    `We are a boring and sanitary house on ${street} in ${city}, with ${business.trust.yearsActive} years behind us in water boring, pump and motor sales, and sanitary work.`,
    'We drill water bores, sell and install water pumps and motors, and fit bathrooms, kitchens and water lines, including plumbing repairs for leaks and blockages.',
    'Most of our work comes from people who need water on a new plot, a bore that has stopped giving water, or a bathroom that has to be fitted before a house is handed over.',
  ],
  photoAlt: 'A boring rig and diesel engine set up over a new bore on an open plot',
  processHeading: 'How a water boring job runs',
  process: [
    {
      title: 'Site check',
      detail:
        'We look at the plot, ask about nearby bores, and decide the likely depth and the pipe size the ground needs.',
    },
    {
      title: 'Drilling',
      detail:
        'The rig is set up and drilling runs down through the soil layers until it reaches water-bearing ground.',
    },
    {
      title: 'Pipe and filter fitting',
      detail:
        'Casing pipe goes in with a filter section across the water-bearing layer, and the bore is flushed until it runs clean.',
    },
    {
      title: 'Pump installation',
      detail:
        'The pump or motor is lowered and connected, with the cable, delivery pipe and starter fitted.',
    },
    {
      title: 'Water test and handover',
      detail:
        'We run the pump, check the flow and the water itself, and hand the bore over with everything working.',
    },
  ],
} satisfies AboutCopy;
